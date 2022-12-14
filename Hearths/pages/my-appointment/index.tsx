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
import { headers, url } from "../../constant";
import { HeartsLayouts } from "../../layouts/layout";
import * as moment from "moment";
import { useTranslation } from "../../hooks/useTranslation";
import { AppointmentStatus } from "../../utils/type";
import { useRouter } from "next/router";
interface IMyAppointment {
  appoint_datetime: number;
  event_id: number;
  appointment_status: string;
  meeting_link: string | undefined;
  count: number;
}
const MyAppointment: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const { translations } = useTranslation(
    "MyAppointment",
    "Date",
    "Time",
    "meetingLink",
    "statusmeeting",
    "CONFIRMED",
    "REJECT",
    "PENDING",
    "LINK"
  );
  interface IApporve {
    CONFIRMED: string;
    PENDING: string;
    REJECTED: string;
  }
  const temp: IApporve = {
    CONFIRMED: translations.CONFIRMED,
    PENDING: translations.PENDING,
    REJECTED: translations.REJECT,
  };
  const [appointment, setAppointment] = useState<IMyAppointment[]>([]);
  const headerContent = [
    translations.Date,
    translations.Time,
    translations.meetingLink,
    translations.statusmeeting,
    "Home Program",
  ];
  const fetchAPI = async () => {
    try {
      const { data } = await axios.post<IMyAppointment[]>(
        `${url}/patient/appointment`,
        { patient_id: Cookies.get("patient_id") },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setAppointment(data);
    } catch (error) {
      toast({ status: "error", title: "Please Try Again later" });
    }
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
          {translations.MyAppointment}
        </Heading>
        <Grid
          templateColumns="auto auto auto auto auto"
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
                  <Box my="auto">
                    <Link
                      target="_blank"
                      href={ele.meeting_link}
                      textDecoration={
                        ele.meeting_link !== null ? "underline" : "none"
                      }
                      color={ele.meeting_link !== null ? "blue" : "black"}
                    >
                      {translations.LINK}
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
                  <Box my="auto">
                    {ele.appointment_status === AppointmentStatus.CONFIRM ? (
                      <Box
                        bg={"#38a169"}
                        px="5"
                        borderRadius={"2em"}
                        color="white"
                      >
                        {temp[ele.appointment_status as keyof IApporve]}
                      </Box>
                    ) : ele.appointment_status ===
                      AppointmentStatus.REJECTED ? (
                      <Box
                        bg={"#e53e3e"}
                        px="5"
                        borderRadius={"2em"}
                        color="white"
                      >
                        {temp[ele.appointment_status as keyof IApporve]}
                      </Box>
                    ) : (
                      <Box
                        bg={"orange"}
                        px="5"
                        borderRadius={"2em"}
                        color="white"
                      >
                        {temp[ele.appointment_status as keyof IApporve]}
                      </Box>
                    )}
                  </Box>
                </GridItem>

                <GridItem
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  d="flex"
                  justifyContent="center"
                  border="1px solid #E2E8F0"
                  color={"black"}
                >
                  {ele.event_id &&
                    ele.appointment_status === temp.CONFIRMED &&
                    ele.count > 0 && (
                      <Box
                        my="auto"
                        textDecoration={"underline"}
                        color="blue"
                        cursor="pointer"
                        onClick={() => {
                          router.push(
                            `/my-appointment/home/program/${ele.event_id}`
                          );
                          localStorage.setItem(
                            "home_program_event",
                            `${ele.event_id}`
                          );
                        }}
                      >
                        View task list
                      </Box>
                    )}
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
