import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
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
interface IMyAppointmentProgram {
  task_number: number;
  task_description: string;
  step_number: number;
  start_date: string | undefined;
}
const HomeProgram: NextPage = () => {
  const headerContent = ["Task", "Step", "Description", "Date", "Submission"];
  const [appointmentProgram, setAppointmentProgram] = useState<any[]>([]);
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
  };
  const fetchAPI = async () => {
    try {
      const { eventid } = router.query;
      const { data } = await axios.get(
        `${url}/home/program?event_id=${eventid}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setAppointmentProgram(data);
    } catch (error) {
      toast({ status: "error", title: "Please Try Again later" });
    }
  };

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
          <Box>Date : 20 March 2022</Box>
          <Box>Time: 09:00 - 10:00</Box>
          <Box> Physical Therapist : OT. China Panda</Box>
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
                key={`${index}`}
              >
                <Box my="auto">{ele}</Box>
              </GridItem>
            );
          })}
          {appointmentProgram.map((appointmentPrograms, index) => {
            return (
              <>
                <GridItem
                  py="2"
                  rowSpan={appointmentPrograms.length + 1}
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
                        <Box my="auto">{ele.start_date}</Box>
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
                          <Button
                            onClick={() =>
                              uploadHandler(ele.task_number, ele.step_number)
                            }
                          >
                            upload
                          </Button>
                        </Box>
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
