import {
  Heading,
  Box,
  useToast,
  Grid,
  Flex,
  GridItem,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { url } from "../constant";
import { HeartsLayouts } from "../layouts/layout";
import * as moment from "moment";
interface IMyAppointment {
  appoint_datetime: number;
  event_id: number;
  appointment_status: string;
  meeting_link: string | "https://mahidol.webex.com/meet/somboon.kon";
}
const MyAppointment: NextPage = () => {
  const [appointment, setAppointment] = useState<IMyAppointment[]>([]);
  const headerContent = ["Date", "Time", "Meeting Link", "Appointment Status"];
  const fetchAPI = async () => {
    const { data } = await axios.post<IMyAppointment[]>(
      `${url}/my-appointment`,
      { patient_id: Cookies.get("patient_id") }
    );
    console.log(data);
    setAppointment(data);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <HeartsLayouts>
      <Flex
        flexDirection="column"
        mt="2rem"
        gridRowGap="15px"
        w={{ base: "95%", xl: "80%" }}
        mx="auto"
      >
        <Heading color="#003B71" as="h1" textAlign="center">
          My Appointment
        </Heading>
        <Grid
          templateColumns="auto auto auto auto"
          color={"white"}
          fontSize={{ base: "14px", xl: "20px" }}
        >
          {headerContent.map((ele, index) => {
            return (
              <GridItem
                w="100%"
                h="100%"
                bg="PrimaryColor.900"
                m="auto"
                d="flex"
                justifyContent="center"
                key={`${index}`}
              >
                <Box my="auto">{ele}</Box>
              </GridItem>
            );
          })}
          {appointment.map((ele, index) => {
            return (
              <>
                <GridItem
                  py="2"
                  key={`${index}-${ele.appoint_datetime}-date`}
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"Black"}
                  d="flex"
                  justifyContent="center"
                  border="1px solid #E2E8F0"
                >
                  <Box my="auto">
                    {moment.unix(ele.appoint_datetime).format("DD/MM/YYYY")}
                  </Box>
                </GridItem>
                <GridItem
                  key={`${index}-${ele.appoint_datetime}-time`}
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"black"}
                  d="flex"
                  border="1px solid #E2E8F0"
                  justifyContent="center"
                >
                  <Box my="auto">
                    {new Date(ele.appoint_datetime * 1000).getUTCHours()}:00 -
                    {new Date(ele.appoint_datetime * 1000).getUTCHours() + 1}:00
                  </Box>
                </GridItem>
                <GridItem
                  key={`${index}-${ele.appointment_status}`}
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"black"}
                  d="flex"
                  border="1px solid #E2E8F0"
                  justifyContent="center"
                >
                  <Box my="auto" overflow={"hidden"} textOverflow={"ellipsis"}>
                    <Link
                      href={ele.meeting_link}
                      textDecoration={
                        ele.meeting_link !== null ? "underline" : "none"
                      }
                      color={ele.meeting_link !== null ? "blue" : "black"}
                    >
                      Link
                    </Link>
                  </Box>
                </GridItem>
                <GridItem
                  key={`${index}-${ele.meeting_link}`}
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  d="flex"
                  justifyContent="center"
                  border="1px solid #E2E8F0"
                  color={"black"}
                >
                  <Box my="auto">{ele.appointment_status}</Box>
                </GridItem>
              </>
            );
          })}
        </Grid>
      </Flex>
    </HeartsLayouts>
  );
};

export default MyAppointment;
