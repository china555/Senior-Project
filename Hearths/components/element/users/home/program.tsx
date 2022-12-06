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
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Select,
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
import { AddIcon } from "@chakra-ui/icons";

interface IMyAppointmentProgramDetailed {
  home_program_task_id: string;
  date: Date;
  video_url: null;
  task_number: number;
  task_description: string;
  step_number: number;
  home_program_id: string;
}
interface IMyAppointmentProgram {
  appointment_datetime: Date;
  homeprogram: IMyAppointmentProgramDetailed[][];
  user: {
    userFirstName: string;
    userFirstNameEng: string;
    userLastName: string;
    userLastNameEng: string;
    userNo: string;
    userPrefix: string;
    userPrefixEng: string;
    userPrefix_Rang: string;
    userPrefix_RangEng: string;
  };
}

interface ISubmitTaskData {
  taskDescription1: string;
  taskDescription2: string;
  taskDescription3: string;
}
export const UsersHomeProgram: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [appointmentProgram, setAppointmentProgram] =
    useState<IMyAppointmentProgram>();
  const [appointmentProgramFilter, setAppointmentProgramFilter] =
    useState<IMyAppointmentProgramDetailed[][]>();
  const [isClickCancel, setIsClickCancel] = useState(true);
  const [dateFilter, setDateFilter] = useState<Date[]>();
  const [submitTaskData, setSubmitTaskData] = useState<ISubmitTaskData[]>([]);
  const [duration, setDuration] = useState(30);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [date, setDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
  );
  const { translations } = useTranslation("DepartMentName");
  const header = ["Task", "Step", "Description", "Date", "Video link"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState<Number>(1);

  const handleTaskDescription1Change = (e: any, index: number) => {
    const tempSubmitTaskData = [...submitTaskData];
    tempSubmitTaskData[index].taskDescription1 = e.target.value;
    setSubmitTaskData(tempSubmitTaskData);
  };
  const handleTaskDescription2Change = (e: any, index: number) => {
    const tempSubmitTaskData = [...submitTaskData];
    tempSubmitTaskData[index].taskDescription2 = e.target.value;
    setSubmitTaskData(tempSubmitTaskData);
  };
  const handleTaskDescription3Change = (e: any, index: number) => {
    const tempSubmitTaskData = [...submitTaskData];
    tempSubmitTaskData[index].taskDescription3 = e.target.value;
    setSubmitTaskData(tempSubmitTaskData);
  };
  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };
  const handleDurationChange = (e: any) => {
    setDuration(e);
  };
  const clearInput = () => {
    setSubmitTaskData([]);
  };

  const onchangeHandler = (event: any) => {
    setSelectedDate(event.target.value);
  };
  const onClickAddTaskHandler = () => {
    setSubmitTaskData([
      ...submitTaskData,
      { taskDescription1: "", taskDescription2: "", taskDescription3: "" },
    ]);
  };

  const filterHandler = () => {
    if (selectedDate !== "") {
      const temp = appointmentProgram?.homeprogram.map((task) =>
        task.filter((step) => {
          return String(step.date) === selectedDate;
        })
      );
      console.log(temp);
      setAppointmentProgramFilter(temp);
    } else {
      setAppointmentProgramFilter(appointmentProgram?.homeprogram);
    }
  };

  const validateTaskIsNotEmpty = () => {
    const tasks = submitTaskData.map((task) => {
      const tempTaskArray = [];
      if (task.taskDescription1 !== "")
        tempTaskArray.push(task.taskDescription1);
      if (task.taskDescription2 !== "")
        tempTaskArray.push(task.taskDescription2);
      if (task.taskDescription3 !== "")
        tempTaskArray.push(task.taskDescription3);
      return tempTaskArray;
    });
    return tasks;
  };
  const handleSubmit = async () => {
    const tasks = validateTaskIsNotEmpty();
    const userName = Cookies.get("username");
    try {
      const submitData = {
        taskDescription: tasks,
        startDate: date,
        duration: duration,
        userName: userName,
        event_id: Cookies.get("Apmt"),
        task_number: task,
      };
      const { data } = await axios.post(`${url}/home/program`, submitData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      fetchAPI();
      onClose();
      clearInput();
      toast({ status: "success", title: data.msg });
    } catch (error) {
      toast({ status: "error", title: "Something Wrong" });
    }
  };
  useEffect(() => {
    filterHandler();
  }, [selectedDate, appointmentProgram]);
  const fetchAPI = async () => {
    try {
      const userName = Cookies.get("username");
      const event_id = Cookies.get("Apmt");
      const { data } = await axios.get(
        `${url}/home/program?username=${userName}&event_id=${event_id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      setDuration(data.duration);
      setDate(moment(data.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"));
      setTask(data?.homeprogram.length + 1);
      let tempDate = [] as any;
      data.homeprogram.map((ele: any) => {
        ele.map((ele2: any, index: any) => {
          if (
            moment(ele[0].date, "YYYY-MM-DD").format("YYYY-MM-DD") ===
            moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
          ) {
            setSelectedDate(String(ele2.date));
          }
          tempDate.push(ele2.date);
        });
      });

      const uniqueDate = tempDate.filter((item: string, pos: number) => {
        return tempDate.indexOf(item) == pos;
      });
      setDateFilter(uniqueDate);
      setAppointmentProgram(data);
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
            isDisabled={
              appointmentProgram && appointmentProgram?.homeprogram?.length > 0
            }
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
            isDisabled={
              appointmentProgram && appointmentProgram?.homeprogram?.length > 0
            }
          />
        </Box>
        <Button
          onClick={onOpen}
          isDisabled={
            appointmentProgram && appointmentProgram?.homeprogram?.length > 0
          }
        >
          Add Task
        </Button>
        <Box w="20rem" mx="auto" my={"4"}>
          <Select onChange={onchangeHandler} value={selectedDate}>
            {dateFilter?.map((ele, index) => (
              <option value={String(ele)} key={`${ele}-${index}`}>
                {`${getMomentDateMonthYearFormat(ele ?? new Date())} `}
              </option>
            ))}
            <option value={""}>all date</option>
          </Select>
        </Box>
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
          {appointmentProgramFilter?.map(
            (homeprograms: any, index1: number) => {
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
                          <Td>{getMomentDateMonthYearFormat(ele.date)}</Td>
                          <Td>
                            <Link
                              target="_blank"
                              href={`${url}/${ele.video_url}`}
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
            }
          )}
        </Tbody>
      </Table>
      <HeartsModal
        isOpen={isOpen}
        onClose={onClose}
        isButtonClose={isClickCancel}
      >
        <Box alignSelf={"stretch"}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            my="4"
          >
            <Box fontSize={"20px"} fontWeight={"bold"}>
              Add Task
            </Box>
            <Button onClick={onClickAddTaskHandler}>
              <AddIcon w={3} mr="1" />
              <Box fontSize={"md"}>Task</Box>
            </Button>
          </Box>

          <Accordion allowMultiple>
            {submitTaskData.map((task, index) => {
              return (
                <AccordionItem
                  key={`Task-List-${index}`}
                  border={"1px #E2E8F0 solid"}
                  borderRadius="5px"
                >
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Task {index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <FormControl>
                      <Box>
                        <FormLabel>Step1 Description</FormLabel>
                        <Input
                          placeholder="Task Description"
                          value={submitTaskData[index].taskDescription1}
                          onChange={(e) =>
                            handleTaskDescription1Change(e, index)
                          }
                        />
                      </Box>
                      <Box>
                        <FormLabel>Step2 Description</FormLabel>
                        <Input
                          placeholder="Task Description"
                          value={submitTaskData[index].taskDescription2}
                          onChange={(e) =>
                            handleTaskDescription2Change(e, index)
                          }
                        />
                      </Box>
                      <Box>
                        <FormLabel>Step3 Description</FormLabel>
                        <Input
                          placeholder="Task Description"
                          value={submitTaskData[index].taskDescription3}
                          onChange={(e) =>
                            handleTaskDescription3Change(e, index)
                          }
                        />
                      </Box>
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
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
