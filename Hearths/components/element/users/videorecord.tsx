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
  Link,
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
import { IAppointment } from "../../../utils/type";

export const UsersAppointment: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IAppointment[]>([]);
  const header = ["Date", "Time", "Patient Full Name", "Meeting Link"];

  useEffect(() => {
    const fetchAPI = async () => {
      const userName = Cookies.get("username");
      const { data } = await axios.get(
        `${url}/confirmation/appointment?Username=${userName}`
      );
      setStatePending(data);
    };

    fetchAPI();
  }, []);

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
              <Tr key={`${index}$-key`}>
                <Td>{getMomentDateMonthYearFormat(ele.appoint_datetime)}</Td>
                <Td>
                  {getMomentHourFormat(ele.appoint_datetime)}-
                  {getMomentNextHourFormat(ele.appoint_datetime)}
                </Td>
                <Td>{<Box>{showNameForPatient(ele)}</Box>}</Td>
                <Td>
                  <Link
                    target="_blank"
                    href={ele.meeting_link}
                    textDecoration={
                      ele.meeting_link !== null ? "underline" : "none"
                    }
                    color={ele.meeting_link !== null ? "blue" : "black"}
                  >
                    Link
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table> */}
    </Box>
  );
};
