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
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  FormHelperText,
  FormErrorMessage,
  Grid,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { headers, url } from "../../../../constant";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../../utils";
import Cookies from "js-cookie";
import { HeartsModal } from "../../../common/HeartsModal";
import moment from "moment";

export const UsersHomeProgram: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<any[]>([]);
  const [isClickCancel, setIsClickCancel] = useState(true);
  const [taskDescription1, setTaskDescription1] = useState<string>("");
  const [taskDescription2, setTaskDescription2] = useState<string>("");
  const [taskDescription3, setTaskDescription3] = useState<string>("");
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
  );
  const isError = taskDescription1 === "";
  const { translations } = useTranslation("DepartMentName");
  const header = ["Task", "Step", "Description", "Date", "Video link"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState(1);

  const handleTaskDescription1Change = (e: any) => {
    setTaskDescription1(e.target.value);
  };
  const handleTaskDescription2Change = (e: any) => {
    setTaskDescription2(e.target.value);
  };
  const handleTaskDescription3Change = (e: any) => {
    setTaskDescription3(e.target.value);
  };
  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };
  const handleDurationChange = (e: any) => {
    setDuration(e.target.value);
  };
  const clearInput = () => {
    setTaskDescription1("");
    setTaskDescription2("");
    setTaskDescription3("");
  };
  const handleSubmit = async () => {
    const tasks = [];
    if (taskDescription1 !== "") tasks.push(taskDescription1);
    if (taskDescription2 !== "") tasks.push(taskDescription2);
    if (taskDescription3 !== "") tasks.push(taskDescription3);
    const user_id = Cookies.get("user_id");
    try {
      const submitData = {
        taskDescription: tasks,
        startDate: date,
        duration: duration,
        user_id: user_id,
        event_id: Cookies.get("Apmt"),
        task_number: task,
      };
      const { data } = await axios.post(`${url}/home/program`, submitData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      fetchAPI();
      onClose();
      clearInput();
      toast({ status: "success", title: data.msg });
    } catch (error) {
      toast({ status: "error", title: "Something Wrong" });
    }
  };
  const fetchAPI = async () => {
    try {
      const user_id = Cookies.get("user_id");
      const event_id = Cookies.get("Apmt");
      const { data } = await axios.get(
        `${url}/home/program?user_id=${user_id}&event_id=${event_id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      setData(data);
      setTask(data.length + 1);
    } catch (error) {
      toast({ status: "error", title: "Something Wrong" });
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Box overflow={"auto"}>
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          Home Program
        </Heading>
      </Flex>
      <FormControl display={"flex"} alignItems={"end"}>
        <Box>
          <FormLabel>Duration</FormLabel>
          <NumberInput
            max={30}
            min={1}
            value={duration}
            onChange={handleDurationChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <FormLabel>Start Date</FormLabel>
          <Input
            placeholder="Date"
            value={date}
            onChange={handleDateChange}
            type={"date"}
          />
        </Box>
        <Button onClick={onOpen}>Add Task</Button>
      </FormControl>

      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((ele, index) => (
              <Th key={`number-${index}`}>{ele}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((homeprograms, index1) => {
            return (
              <>
                <Tr key={`${index1}-table-home-program`}>
                  <Td
                    rowSpan={homeprograms.length + 1}
                    borderRight={"1px solid #edf2f7"}
                  >
                    <b>{homeprograms[0]?.task_number}</b>
                  </Td>
                </Tr>
                <>
                  {homeprograms.map((ele: any, index: any) => {
                    return (
                      <Tr key={`data-in-rows${index1}${index}`}>
                        <Td>{ele.step_number}</Td>
                        <Td>{ele.task_description}</Td>
                        <Td>{ele.start_date}</Td>
                        <Td>
                          <Link
                            target="_blank"
                            href={ele.video_url}
                            textDecoration={
                              ele.video_url !== null ? "underline" : "none"
                            }
                            color={ele.video_url !== null ? "blue" : "black"}
                          >
                            Video Link
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </>
              </>
            );
          })}
        </Tbody>
      </Table>
      <HeartsModal
        isOpen={isOpen}
        onClose={onClose}
        isButtonClose={isClickCancel}
      >
        <Box alignSelf={"stretch"}>
          <Box fontSize={"20px"} fontWeight={"bold"}>
            Add Task
          </Box>
          <FormControl>
            {/* isInvalid={isError} */}
            <Box>
              <FormLabel>Step1 Description</FormLabel>
              <Input
                placeholder="Task Description"
                value={taskDescription1}
                onChange={handleTaskDescription1Change}
              />
            </Box>
            <Box>
              <FormLabel>Step2 Description</FormLabel>
              <Input
                placeholder="Task Description"
                value={taskDescription2}
                onChange={handleTaskDescription2Change}
              />
            </Box>
            <Box>
              <FormLabel>Step3 Description</FormLabel>
              <Input
                placeholder="Task Description"
                value={taskDescription3}
                onChange={handleTaskDescription3Change}
              />
            </Box>
          </FormControl>
        </Box>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </HeartsModal>
    </Box>
  );
};
