import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useToast,
  Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client_id, client_secret, headers, url } from "../../../constant";
import moment from "moment-timezone";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../utils";
import Cookies from "js-cookie";
import { HeartsFilter } from "../HeartsFilter";
import { showNameForPatient } from "../../../utils/helper";
import { HeartsPagination } from "../HeartsPagination";
import { AppointmentStatus } from "../../../utils/type";
import axios from "axios";
import HeartsLoading from "../../common/HeartsLoading";

interface IAppointmentPending {
  patient_id: string;
  appoint_datetime: Date;
  appointment_status: string;
  event_id: number;
  receipt_image_path: string;
  hn: string;
  patientPrefix: string | null;
  patientPrefix_Rang: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  patientPrefixEng: string | null;
  patientPrefix_RangEng: string | null;
  patientFirstNameEng: string | null;
  patientMiddleNameEng: string | null;
  patientLastNameEng: string | null;
  Username: string;
  userPrefix: string | null;
  userPrefix_Rang: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  userPrefixEng: string | null;
  userPrefix_RangEng: string | null;
  userFirstNameEng: string | null;
  userLastNameEng: string | null;
}

interface submitConfirmationAppointmentData {
  event_id: number;
  appointmentStatus: "CONFIRMED" | "REJECTED";
  meetingLink?: string;
  appoint_datetime: Date;
  userName: string;
}

export const UsersAppointmentManagement: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [webexCode, setWebexCode] = useState<string>("");
  const [appointment, setStateAppointment] = useState<IAppointmentPending[]>(
    []
  );
  const header = [
    "Date",
    "Time",
    "Physiotherapist Full Name",
    "Patient Full Name",
    "Receipt",
    "Status",
  ];
  const [inputStartDate, setInputStartDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").subtract(30, "days").format("YYYY-MM-DD")
  );
  const [inputEndDate, setInputEndDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").add(30, "days").format("YYYY-MM-DD")
  );
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [inputPatientName, setInputPatientName] = useState<string>("");
  const [inputPhysiotherapistsNameRef, setInputPhysiotherapistsNameRef] =
    useState<string>("");
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(10);
  const [paginationSize, setPaginationSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [waitForUpdateData, setWaitForUpdateData] = useState(false);
  let pageNumber = 1;
  async function handlerSubmitRenderResult(type?: string) {
    try {
      setLoading(false);
      if (type === "search") {
        pageNumber = 1;
        setPaginationPage(1);
      }
      const { data } = await axios.get(
        `${url}/appointment/status?start_date=${inputStartDate}&end_date=${inputEndDate}&status=${selectStatus}&patient_name=${inputPatientName}&physio_name=${inputPhysiotherapistsNameRef}&page=${pageNumber}&size=${paginationPageSize}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      setStateAppointment(data.sortAllappointmentStatusPending);
      setPaginationSize(data.size);
      setLoading(true);
    } catch (error) {
      toast({ status: "error", title: "Please try again later" });
    }
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setWebexCode(urlParams.get("code") as string);
    handlerSubmitRenderResult();
  }, []);

  useEffect(() => {
    const getCodeAccessTokenFromWebex = async () => {
      const config = {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      };
      const { data } = await axios.post(
        `https://webexapis.com/v1/access_token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=https://hearts.chinaapanda.com/users/dashboard&code=${webexCode}`,
        null,
        config
      );
      const {
        access_token,
        expires_in,
        refresh_token,
        refresh_token_expires_in,
      } = data;
      Cookies.set("webex_access_token", access_token);
      Cookies.set("webex_access_token_expires_in", expires_in);
      Cookies.set("webex_refresh_token", refresh_token);
      Cookies.set("webex_refresh_token_expires_in", refresh_token_expires_in);
    };
    if (webexCode && Cookies.get("webex_access_token") === undefined) {
      getCodeAccessTokenFromWebex();
    }
  }, [webexCode]);

  const confirmAppointment = async (
    submitData: submitConfirmationAppointmentData
  ) => {
    try {
      if (Cookies.get("webex_access_token") === undefined) {
        if (!webexCode) {
          router.push(
            `https://webexapis.com/v1/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://hearts.chinaapanda.com/users/dashboard&scope=meeting:schedules_read meeting:schedules_write meeting:recordings_read`
          );
        }
      } else {
        setWaitForUpdateData(true);
        if (submitData.appointmentStatus === "CONFIRMED") {
          const { appoint_datetime } = submitData;
          const config = {
            headers: {
              Authorization: `Bearer ${Cookies.get("webex_access_token")}`,
            },
          };
          const { data } = await axios.post(
            "https://webexapis.com/v1/meetings",
            {
              title: "Appointment Meeting",
              start: moment.tz(appoint_datetime, "Asia/Bangkok").format(),
              end: moment
                .tz(appoint_datetime, "Asia/Bangkok")
                .add(1, "hour")
                .format(),
              timezone: "Asia/Bangkok",
              enabledAutoRecordMeeting: true,
              enabledJoinBeforeHost: true,
              enableConnectAudioBeforeHost: true,
            },
            config
          );
          await axios.patch(
            url + "/confirmation/appointment",
            {
              event_id: submitData.event_id,
              appointmentStatus: "CONFIRMED",
              meetingLink: data.webLink,
              meetingId: data.id,
              userName: submitData.userName,
              approveByUserName: Cookies.get("username"),
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
          toast({
            status: "success",
            title: `Appointment ${submitData.appointmentStatus}`,
          });
        } else if (submitData.appointmentStatus === "REJECTED") {
          await axios.patch(
            url + "/confirmation/appointment",
            {
              event_id: submitData.event_id,
              appointmentStatus: "REJECTED",
              userName: submitData.userName,
              approveByUserName: Cookies.get("username"),
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
          toast({
            status: "success",
            title: `Appointment ${submitData.appointmentStatus}`,
          });
        }
        const tempPending = appointment.filter(
          (appoint) => appoint.event_id !== submitData.event_id
        );
        setStateAppointment(tempPending);
        setWaitForUpdateData(false);
      }
    } catch (error) {
      console.error("Confirmation Management", error);
      toast({ status: "error", title: "Appointment Confirmation failed" });
    }
  };
  return (
    <Box overflow={"auto"}>
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          Appointment Confirmation
        </Heading>
      </Flex>
      <HeartsFilter
        setStartDate={setInputStartDate}
        setEndDate={setInputEndDate}
        setPatientName={setInputPatientName}
        setStatus={setSelectStatus}
        setPhysiotherapistsName={setInputPhysiotherapistsNameRef}
        handler={() => {
          handlerSubmitRenderResult("search");
        }}
        defalutEndDate={inputEndDate}
        defalutStartDate={inputStartDate}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((ele, index) => (
              <Th key={`number-${index}`}>{ele}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {loading ? (
            <>
              {appointment.map((ele, index) => {
                return (
                  <Tr key={`${index}-key!`}>
                    <Td>
                      {getMomentDateMonthYearFormat(ele.appoint_datetime)}
                    </Td>
                    <Td>
                      {getMomentHourFormat(ele.appoint_datetime)}-
                      {getMomentNextHourFormat(ele.appoint_datetime)}
                    </Td>
                    <Td>
                      {localStorage.getItem("language") === "th" ? (
                        <Box>
                          {ele.userPrefix_Rang !== null
                            ? ele.userPrefix_Rang
                            : ele.userPrefix}
                          {`${ele.userFirstName} ${ele.userLastName}`}
                        </Box>
                      ) : (
                        <Box>
                          {ele.userPrefix_RangEng !== null
                            ? ele.userPrefix_RangEng
                            : ele.userPrefixEng}
                          {`${ele.userFirstNameEng} ${ele.userLastNameEng}`}
                        </Box>
                      )}
                    </Td>
                    <Td>{<Box>{showNameForPatient(ele)}</Box>}</Td>
                    <Td>
                      <a
                        href={`${url}/${ele.receipt_image_path}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link
                      </a>
                    </Td>
                    <Td>
                      <Flex justifyContent={"space-evenly"}>
                        {ele.appointment_status ===
                        AppointmentStatus.CONFIRM ? (
                          <Box
                            bg={"#38a169"}
                            px="5"
                            py="2"
                            borderRadius={"2em"}
                            color="white"
                          >
                            Confirm
                          </Box>
                        ) : ele.appointment_status ===
                          AppointmentStatus.REJECTED ? (
                          <Box
                            bg={"#e53e3e"}
                            px="5"
                            py="2"
                            borderRadius={"2em"}
                            color="white"
                          >
                            Reject
                          </Box>
                        ) : (
                          <>
                            <Button
                              colorScheme="green"
                              onClick={() => {
                                confirmAppointment({
                                  event_id: ele.event_id,
                                  appointmentStatus: "CONFIRMED",
                                  appoint_datetime: ele.appoint_datetime,
                                  userName: ele.Username,
                                });
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                confirmAppointment({
                                  event_id: ele.event_id,
                                  appointmentStatus: "REJECTED",
                                  appoint_datetime: ele.appoint_datetime,
                                  userName: ele.Username,
                                });
                              }}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </>
          ) : (
            <Box></Box>
          )}
        </Tbody>
      </Table>
      {loading ? <></> : <HeartsLoading />}
      {!waitForUpdateData ? (
        <></>
      ) : (
        <Box
          position={"fixed"}
          top="0"
          left={"0"}
          zIndex="100"
          bg={"#ffffff8c"}
          width="100vw"
          height={"100vh"}
        >
          <Box
            position={"absolute"}
            top="50%"
            left={"50%"}
            style={{ transform: "translate(-50%,-50%)" }}
          >
            <Box mb="5" fontSize={"2xl"}>
              Wait a second
            </Box>
            <HeartsLoading />
          </Box>
        </Box>
      )}
      <HeartsPagination
        className="pagination-bar"
        currentPage={paginationPage}
        totalCount={paginationSize}
        pageSize={paginationPageSize}
        onPageChange={(page) => {
          pageNumber = page;
          setPaginationPage(page);
          handlerSubmitRenderResult();
        }}
      />
    </Box>
  );
};
