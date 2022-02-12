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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../../../components/common/HeartsContainer";
import { HeartsLayouts } from "../../../layouts/layout";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../constant";
import { HeartsModal } from "../../../components/common/HeartsModal";
interface IAppointmentPending {
  patient_id: string;
  appoint_datetime: number;
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
}
const Users: NextPage = () => {
  const router = useRouter();
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
    setStatePending(data);
  };
  const confirmAppointment = async (
    data: submitConfirmationAppointmentData
  ) => {
    await axios.patch(url + "/confirmation-appointment", data);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <HeartsLayouts>
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
      <HeartsContainer>
        <Box overflow={"auto"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                {header.map((ele, index) => (
                  <Th key={index}>{ele}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {pending.map((ele, index) => {
                return (
                  <>
                    <Tr key={index}>
                      <Td>
                        {new Date(ele.appoint_datetime).getDate()}/
                        {new Date(ele.appoint_datetime).getMonth() + 1}/
                        {new Date(ele.appoint_datetime).getFullYear()}
                      </Td>
                      <Td>
                        {new Date(ele.appoint_datetime * 1000).getUTCHours()}:00
                        -
                        {new Date(ele.appoint_datetime * 1000).getUTCHours() +
                          1}
                        :00
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
                          <Button colorScheme="green">Confirm</Button>
                          <Button colorScheme="red">Reject</Button>
                        </Flex>
                      </Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Users;
