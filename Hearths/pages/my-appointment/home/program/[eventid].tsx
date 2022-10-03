import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeartsDropzone } from "../../../../components/common/HeartsDropZone";
import { HeartsDropzoneVideo } from "../../../../components/common/HeartsDropZoneVideo";
import { HeartsModal } from "../../../../components/common/HeartsModal";
import { url } from "../../../../constant";
import { HeartsLayouts } from "../../../../layouts/layout";
import { CheckIcon } from "@chakra-ui/icons";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../../utils";
interface IMyAppointmentProgramDetailed {
  task_number: number;
  task_description: string;
  step_number: number;
  start_date: Date;
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
const HomeProgram: NextPage = () => {
  const headerContent = ["Task", "Step", "Description", "Date", "Submission"];
  const [appointmentProgram, setAppointmentProgram] =
    useState<IMyAppointmentProgram>();
  const [appointmentProgramFilter, setAppointmentProgramFilter] =
    useState<IMyAppointmentProgramDetailed[][]>();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [date, setDate] = useState<Date[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClickCancel, setIsClickCancel] = useState(true);
  const [videoPath, setvideoPath] = useState<string>("");
  const [uploadStatus, setuploadStatus] = useState<string>("");
  const [task, setTask] = useState<number>();
  const [step, setStep] = useState<number>();
  const router = useRouter();
  const toast = useToast();
  const uploadHandler = (task_number: number, step_number: number) => {
    onOpen();
    setTask(task_number);
    setStep(step_number);
  };
  const resetState = () => {
    setTask(undefined);
    setStep(undefined);
    setuploadStatus("");
    setvideoPath("");
    setSelectedDate(selectedDate);
  };
  const fetchAPI = async () => {
    try {
      const { eventid } = router.query;
      const { data } = await axios.get<IMyAppointmentProgram>(
        `${url}/home/program?event_id=${
          eventid ?? localStorage.getItem("home_program_event")
        }`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      let tempDate = [] as any;
      data.homeprogram.map((ele) => {
        if (
          moment(ele[0].start_date, "YYYY-MM-DD").format("YYYY-MM-DD") ===
          moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD")
        ) {
          setSelectedDate(String(ele[0].start_date));
        }
        tempDate.push(ele[0].start_date);
      });
      const uniqueDate = tempDate.filter((item: string, pos: number) => {
        return tempDate.indexOf(item) == pos;
      });
      setDate(uniqueDate);
      setAppointmentProgram(data);
      filterHandler();
    } catch (error) {
      toast({ status: "error", title: "Please Try Again later" });
    }
  };

  const onchangeHandler = (event: any) => {
    setSelectedDate(event.target.value);
  };
  const filterHandler = () => {
    if (selectedDate !== "") {
      const temp = appointmentProgram?.homeprogram.filter(
        (ele) =>
          ele.filter((ele) => {
            return String(ele.start_date) === selectedDate;
          }).length !== 0
      );
      setAppointmentProgramFilter(temp);
    } else {
      setAppointmentProgramFilter(appointmentProgram?.homeprogram);
    }
  };
  useEffect(() => {
    filterHandler();
  }, [selectedDate]);

  const updateVideoPath = async () => {
    try {
      const { eventid } = router.query;
      const sentData = {
        video_link: videoPath,
        event_id: eventid,
        task_number: task,
        step_number: step,
      };
      const { data } = await axios.patch(`${url}/update/video/link`, sentData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast({ status: "success", title: "Upload Successful" });
    } catch (error) {
      toast({ status: "error", title: "Please Try Again later" });
    }
  };
  useEffect(() => {
    fetchAPI();
    if (uploadStatus === "done") {
      updateVideoPath();
      resetState();
    }
  }, [uploadStatus]);

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
          <Box>
            Date:
            {getMomentDateMonthYearFormat(
              appointmentProgram?.appointment_datetime ?? new Date()
            )}
          </Box>
          <Box>
            Time:
            {getMomentHourFormat(
              appointmentProgram?.appointment_datetime ?? new Date()
            )}
            -
            {getMomentNextHourFormat(
              appointmentProgram?.appointment_datetime ?? new Date()
            )}
          </Box>
          <Box>
            {`${appointmentProgram?.user.userPrefix_RangEng} ${appointmentProgram?.user.userFirstNameEng} ${appointmentProgram?.user.userLastNameEng}`}
          </Box>
          <Box w="20rem" mx="auto">
            <Select onChange={onchangeHandler} value={selectedDate}>
              {date?.map((ele, index) => (
                <option value={String(ele)} key={`${ele}-${index}`}>
                  {`${getMomentDateMonthYearFormat(ele ?? new Date())} `}
                </option>
              ))}
              <option value={""}>all date</option>
            </Select>
          </Box>
        </Box>
        <Grid
          templateColumns="5% 5% 50% auto auto"
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
                key={`${ele}`}
              >
                <Box my="auto">{ele}</Box>
              </GridItem>
            );
          })}
          {appointmentProgramFilter?.map((appointmentPrograms, index) => {
            return (
              <>
                <GridItem
                  key={`${appointmentPrograms[0].start_date}`}
                  py="2"
                  rowSpan={appointmentPrograms.length}
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
                    <b>{appointmentPrograms[0].task_number}</b>
                  </Box>
                </GridItem>
                {appointmentPrograms.map((ele: any) => {
                  return (
                    <>
                      <GridItem
                        key={`${ele.task_description}`}
                        w="100%"
                        h="100%"
                        bg="white"
                        m="auto"
                        color={"black"}
                        d="flex"
                        border="1px solid #E2E8F0"
                        justifyContent="center"
                      >
                        <Box my="auto">{ele.step_number}</Box>
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
                        <Box my="auto">{ele.task_description}</Box>
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
                        <Box my="auto">
                          {getMomentDateMonthYearFormat(ele.start_date)}
                        </Box>
                      </GridItem>
                      <GridItem
                        w="100%"
                        h="100%"
                        bg="white"
                        m="auto"
                        d="flex"
                        justifyContent="space-evenly"
                        border="1px solid #E2E8F0"
                        color={"black"}
                      >
                        {ele.video_url ? (
                          <Box
                            cursor={"pointer"}
                            onClick={() =>
                              uploadHandler(ele.task_number, ele.step_number)
                            }
                          >
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 71 71"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M32.2864 10.6672H10.2859C8.61875 10.6672 7.01992 11.3294 5.84109 12.5083C4.66226 13.6871 4 15.2859 4 16.953V60.9541C4 62.6212 4.66226 64.2201 5.84109 65.3989C7.01992 66.5777 8.61875 67.24 10.2859 67.24H54.287C55.9541 67.24 57.5529 66.5777 58.7317 65.3989C59.9106 64.2201 60.5728 62.6212 60.5728 60.9541V38.9536"
                                stroke="black"
                                strokeWidth="6.28587"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M55.8584 5.95277C57.1088 4.70243 58.8046 4 60.5728 4C62.3411 4 64.0369 4.70243 65.2872 5.95277C66.5376 7.20311 67.24 8.89893 67.24 10.6672C67.24 12.4354 66.5376 14.1312 65.2872 15.3816L35.4293 45.2395L22.8576 48.3824L26.0005 35.8107L55.8584 5.95277Z"
                                stroke="black"
                                strokeWidth="6.28587"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                        ) : (
                          <Button
                            style={
                              ele.video_url
                                ? {
                                    backgroundColor: "#22c35e",
                                    color: "white",
                                  }
                                : {}
                            }
                            onClick={() =>
                              uploadHandler(ele.task_number, ele.step_number)
                            }
                          >
                            upload
                          </Button>
                        )}
                        {ele.video_url && (
                          <a
                            href={`${url}/${ele.video_url}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ alignSelf: "center" }}
                          >
                            <svg
                              width="20"
                              height="30"
                              viewBox="0 0 71 71"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M60.3468 4H10.8932C7.08617 4 4 7.08617 4 10.8932V60.3468C4 64.1538 7.08617 67.24 10.8932 67.24H60.3468C64.1538 67.24 67.24 64.1538 67.24 60.3468V10.8932C67.24 7.08617 64.1538 4 60.3468 4Z"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.81 4V67.24"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M51.43 4V67.24"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 35.62H67.24"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 19.81H19.81"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 51.43H19.81"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M51.43 51.43H67.24"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M51.43 19.81H67.24"
                                stroke="black"
                                strokeWidth="6.324"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        )}
                      </GridItem>
                    </>
                  );
                })}
              </>
            );
          })}
        </Grid>
      </Flex>
      <HeartsModal
        isOpen={isOpen}
        onClose={onClose}
        isButtonClose={isClickCancel}
      >
        <Box alignSelf={"stretch"}>
          <Box fontSize={"20px"} fontWeight={"bold"}>
            Upload Video
          </Box>
        </Box>
        <HeartsDropzoneVideo
          setvideoPath={setvideoPath}
          setuploadStatus={setuploadStatus}
        />
      </HeartsModal>
    </HeartsLayouts>
  );
};

export default HomeProgram;
