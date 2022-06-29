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
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { client_id, client_secret, headers, url } from "../../../constant";
import { HeartsModal } from "../../common/HeartsModal";
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
interface IAppointmentPending {
  patient_id: string;
  appoint_datetime: Date;
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
  userNo: string;
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
  user_id: string;
}

export const UsersAppointmentManagement: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [webexCode, setWebexCode] = useState<string>("");
  const [pending, setStatePending] = useState<IAppointmentPending[]>([]);
  const header = [
    "Date",
    "Time",
    "Physiotherapist Full Name",
    "Patient Full Name",
    "Receipt",
    "Status",
  ];
  const inputDateRef = useRef<HTMLInputElement>(null);
  const selectStatusRef = useRef<HTMLSelectElement>(null);
  const inputPatientNameRef = useRef<HTMLInputElement>(null);
  const inputPhysiotherapistsNameRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (inputDateRef.current !== null)
      console.log("value 👉️", inputDateRef.current.value);
    if (selectStatusRef.current !== null)
      console.log("value 👉️", selectStatusRef.current.value);
    if (inputPatientNameRef.current !== null)
      console.log("value 👉️", inputPatientNameRef.current.value);
    if (inputPhysiotherapistsNameRef.current !== null)
      console.log("value 👉️", inputPhysiotherapistsNameRef.current.value);
  }
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setWebexCode(urlParams.get("code") as string);

    const fetchAPI = async () => {
      try {
        const { data } = await axios.get(`${url}/appointment/status/pending`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setStatePending(data);
      } catch (error) {
        toast({ status: "error", title: "Please try again later" });
      }
    };

    fetchAPI();
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
              userId: submitData.user_id,
              approveByUser_id: Cookies.get("user_id"),
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
              userId: submitData.user_id,
              approveByUser_id: Cookies.get("user_id"),
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
        const tempPending = pending.filter(
          (appoint) => appoint.event_id !== submitData.event_id
        );
        setStatePending(tempPending);
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
        dateRef={inputDateRef}
        patientNameRef={inputPatientNameRef}
        physiotherapistsNameRef={inputPhysiotherapistsNameRef}
        statusRef={selectStatusRef}
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
          {pending.map((ele, index) => {
            return (
              <Tr key={ele.event_id}>
                <Td>{getMomentDateMonthYearFormat(ele.appoint_datetime)}</Td>
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
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        confirmAppointment({
                          event_id: ele.event_id,
                          appointmentStatus: "CONFIRMED",
                          appoint_datetime: ele.appoint_datetime,
                          user_id: ele.userNo,
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
                          user_id: ele.userNo,
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <HeartsPagination />
      </Table>
    </Box>
  );
};
