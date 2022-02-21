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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { url, webex_token } from "../../../constant";
import { HeartsModal } from "../../common/HeartsModal";
import moment from "moment-timezone";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../utils";
interface IAppointmentPending {
  patient_id: string;
  appoint_datetime: Date;
  event_id: number;
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
      if (submitData.appointmentStatus === "CONFIRMED") {
        const { appoint_datetime } = submitData;
        const config = {
          headers: {
            Authorization: `Bearer ${webex_token}`,
          },
        };
        const { data } = await axios.post(
          "https://webexapis.com/v1/meetings",
          {
            //"Appointment 20220214_1430_6-66-6666"
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
      } else if (submitData.appointmentStatus === "REJECTED") {
        await axios.patch(url + "/confirmation-appointment", {
          event_id: submitData.event_id,
          appointmentStatus: "REJECTED",
        });
      }
      const tempPending = pending.filter(
        (appoint) => appoint.event_id !== submitData.event_id
      );
      setStatePending(tempPending);
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
