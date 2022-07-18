import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
} from "@chakra-ui/react";
import moment from "moment";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { HeartsLayouts } from "../../../layouts/layout";
interface IMyAppointmentProgram {
  task: number;
  taskDescription: string;
  time: number;
  Date: string | undefined;
}
const HomeProgram: NextPage = () => {
  const [appointmentProgram, setAppointmentProgram] = useState<
    IMyAppointmentProgram[]
  >([
    {
      task: 1,
      taskDescription: "Test01",
      time: 1,
      Date: "20/03/2022",
    },
    {
      task: 3,
      taskDescription: "Test01",
      time: 1,
      Date: "20/03/2022",
    },
    {
      task: 1,
      taskDescription: "Test01",
      time: 1,
      Date: "20/03/2022",
    },
  ]);
  const headerContent = [
    "No.",
    "Task",
    "Task Description",
    "Time",
    "Date",
    "Submission",
  ];
  useEffect(() => {}, []);
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
          Home Program
        </Heading>
        <Box>
          <b>Appointment Detail</b>
          <Box>Date : 20 March 2022</Box>
          <Box>Time: 09:00 - 10:00</Box>
          <Box> Physical Therapist : OT. China Panda</Box>
        </Box>
        <Grid
          templateColumns="5% 5% 50% 5% auto auto"
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
          {appointmentProgram.map((ele, index) => {
            return (
              <>
                <GridItem
                  py="2"
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"Black"}
                  d="flex"
                  justifyContent="center"
                  border="1px solid #E2E8F0"
                >
                  <Box my="auto">{index + 1}</Box>
                </GridItem>
                <GridItem
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"black"}
                  d="flex"
                  border="1px solid #E2E8F0"
                  justifyContent="center"
                >
                  <Box my="auto">{ele.task}</Box>
                </GridItem>
                <GridItem
                  w="100%"
                  h="100%"
                  bg="white"
                  m="auto"
                  color={"black"}
                  d="flex"
                  border="1px solid #E2E8F0"
                  justifyContent="center"
                >
                  <Box my="auto">{ele.taskDescription}</Box>
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
                  <Box my="auto">{ele.time}</Box>
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
                  <Box my="auto">{ele.Date}</Box>
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
                  <Box my="auto">
                    <Button>upload</Button>
                  </Box>
                </GridItem>
              </>
            );
          })}
        </Grid>
      </Flex>
    </HeartsLayouts>
  );
};

export default HomeProgram;
