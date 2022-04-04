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
  useDisclosure,
  Image,
  useToast,
  Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { client_id, client_secret, url } from "../../../constant";
import { HeartsModal } from "../../common/HeartsModal";
import moment from "moment-timezone";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../utils";
import Cookies from "js-cookie";
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
}

export const UsersAppointmentManagement: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IAppointmentPending[]>([]);
  const [isClickCancel, setIsClickCancel] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const header = [
    "Date",
    "Time",
    "Physiotherapist Full Name",
    "Patient Full Name",
    "Receipt",
    "Status",
  ];

  const getname = (patient: IAppointmentPending) => {
    let name = "";
    if (
      patient.patientPrefix_Rang === null &&
      patient.patientPrefix_RangEng === null
    ) {
      if (patient.patientPrefix === null) {
        name = name + patient.patientPrefixEng;
      } else {
        name = name + patient.patientPrefix;
      }
    } else {
      if (patient.patientPrefix_Rang === null) {
        name = name + patient.patientPrefix_RangEng;
      } else {
        name = name + patient.patientPrefix_Rang;
      }
    }
    if (patient.patientFirstName === null) {
      name =
        name +
        `${patient.patientFirstNameEng} ${patient.patientMiddleNameEng} ${patient.patientLastNameEng}`;
    } else {
      name = name + `${patient.patientFirstName} ${patient.patientLastName}`;
    }
    return name;
  };

  const fetchAPI = async () => {
    const { data } = await axios.get(`${url}/get-all-pending`);
    console.log(data);
    setStatePending(data);
  };

  const confirmAppointment = async (
    submitData: submitConfirmationAppointmentData
  ) => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get("code");
      if (Cookies.get("webex_access_token") === undefined) {
        if (!code) {
          router.push(
            `https://webexapis.com/v1/authorize?client_id=${client_id}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fusers%2Fdashboard&scope=meeting%3Arecordings_read%20spark%3Akms%20meeting%3Acontrols_write%20meeting%3Aschedules_read%20meeting%3Apreferences_write%20meeting%3Arecordings_write%20meeting%3Apreferences_read%20meeting%3Aschedules_write`
          );
        } else {
          const config = {
            headers: {
              "Content-Type": `application/x-www-form-urlencoded`,
            },
          };
          console.log(`${code}`);
          const { data } = await axios.post(
            `https://webexapis.com/v1/access_token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000/users/dashboard&code=${code}`,
            null,
            config
          );
          console.log(data);
          const {
            access_token,
            expires_in,
            refresh_token,
            refresh_token_expires_in,
          } = data;
          Cookies.set("webex_access_token", access_token);
          Cookies.set("webex_access_token_expires_in", expires_in);
          Cookies.set("webex_refresh_token", refresh_token);
          Cookies.set(
            "webex_refresh_token_expires_in",
            refresh_token_expires_in
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
          await axios.patch(url + "/confirmation-appointment", {
            event_id: submitData.event_id,
            appointmentStatus: "CONFIRMED",
            meetingLink: data.webLink,
          });
          toast({
            status: "success",
            title: `Appointment ${submitData.appointmentStatus}`,
          });
        } else if (submitData.appointmentStatus === "REJECTED") {
          await axios.patch(url + "/confirmation-appointment", {
            event_id: submitData.event_id,
            appointmentStatus: "REJECTED",
          });
          toast({
            status: "error",
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
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <HeartsModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        isButtonClose={isClickCancel}
      >
        <Box w="100%">
          <Box w="100px" mx="auto">
            <Image w="100%" alt="icon" src={"/images/icons/warning.png"} />
          </Box>
          <Box mt="5">{"Comfirm again!"}</Box>
        </Box>
        <Button
          mt="20px"
          colorScheme="blue"
          onClick={() => {
            onClose();
          }}
          w="200px"
          borderRadius="35px"
          bg="ButtonColor"
        >
          {isClickCancel ? "Confirm" : "Close"}
        </Button>
      </HeartsModal>
      <Box overflow={"auto"}>
        <Flex mt="1rem" ml="1rem">
          <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
            Appointment Confirmation
          </Heading>
        </Flex>
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
                  <Td>{<Box>{getname(ele)}</Box>}</Td>
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
        </Table>
      </Box>
    </>
  );
};
