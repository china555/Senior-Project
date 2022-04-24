import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
  Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { headers, url } from "../../../constant";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../utils";
interface IRequestDocument {
  created_at: Date;
  doc_type_name: string;
  hn: string;
  appoint_datetime: Date;
  patientPrefix: string | null;
  patientPrefix_Rang: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  patientPrefixEng: string | null;
  patientPrefix_RangEng: string | null;
  patientFirstNameEng: string | null;
  patientMiddleNameEng: string | null;
  patientLastNameEng: string | null;
}

export const UsersRequestDocument: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IRequestDocument[]>([]);
  const header = [
    "Request Date",
    "Request Time",
    "Patient Full Name",
    "Document",
    "Service Date",
    "Service Time",
  ];

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get(
        `${url}/confirm/document/request`,
        headers
      );
      setStatePending(data);
    };

    fetchAPI();
  }, []);

  const getname = (patient: IRequestDocument) => {
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
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          Request Document
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
              <Tr key={`${index}$-key`}>
                <Td>{getMomentDateMonthYearFormat(ele.created_at)}</Td>
                <Td>{getMomentHourFormat(ele.created_at)}</Td>
                <Td>{getname(ele)}</Td>
                <Td>{ele.doc_type_name}</Td>
                <Td>{getMomentDateMonthYearFormat(ele.appoint_datetime)}</Td>
                <Td>
                  {getMomentHourFormat(ele.appoint_datetime)}-
                  {getMomentNextHourFormat(ele.appoint_datetime)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
