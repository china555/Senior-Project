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
interface IAppointmentConfirmation {
  patient_id: string;
  appoint_datetime: Date;
  event_id: number;
  meetingLink: string;
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

export const UsersAppointment: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IAppointmentConfirmation[]>([]);
  const header = [
    "Date",
    "Time",
    "Physiotherapist Full Name",
    "Patient Full Name",
    "Receipt",
    "Status",
  ];
  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get(`${url}/confirmation/appointment`);
      console.log(data);
      setStatePending(data);
    };

    fetchAPI();
  }, []);

  const getname = (patient: IAppointmentConfirmation) => {
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

  return (
    <Box overflow={"auto"}>
      {/* <Flex mt="1rem" ml="1rem">
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
                <Td></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table> */}
    </Box>
  );
};
