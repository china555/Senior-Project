import {
  Box,
  Heading,
  Checkbox,
  Image,
  Flex,
  Button,
  Select,
  Icon,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import HeartsContainer from "../../components/common/HeartsContainer";
import { headers, url } from "../../constant";
import { useTranslation } from "../../hooks/useTranslation";
import { HeartsLayouts } from "../../layouts/layout";
import { CheckIcon } from "@chakra-ui/icons";

interface IMyAppointment {
  appoint_datetime: number;
  appointment_id: number;
  appointment_status: string;
  meeting_link: string | undefined;
}
const Document: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [appointment, setAppointment] = useState<IMyAppointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectMedical, setSelectMedical] = useState<boolean>(false);
  const [selectReferral, setSelectReferral] = useState<boolean>(false);
  const [selectHome, setSelectHome] = useState<boolean>(false);
  const onchangeHandler = (event: any) => {
    setSelectedDate(event.target.value);
  };
  const submitHandler = async () => {
    if (
      selectedDate !== "" &&
      selectedDate !== undefined &&
      (selectHome || selectMedical || selectReferral)
    ) {
      try {
        if (selectMedical) {
          await axios.post(
            `${url}/document/request`,
            {
              patientId: Cookies.get("patient_id"),
              appointmentId: selectedDate,
              req_doc_type_id: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
        }
        if (selectReferral) {
          await axios.post(
            `${url}/document/request`,
            {
              patientId: Cookies.get("patient_id"),
              appointmentId: selectedDate,
              req_doc_type_id: 2,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
        }
        if (selectHome) {
          await axios.post(
            `${url}/document/request`,
            {
              patientId: Cookies.get("patient_id"),
              appointmentId: selectedDate,
              req_doc_type_id: 3,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
        }
        toast({
          status: "success",
          title: "Request successful",
        });
        router.push("/");
      } catch (error) {
        toast({
          status: "error",
          title: "Please Do again later",
        });
      }
    } else {
      toast({
        status: "error",
        title: "Please select date or form before submit",
      });
    }
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.get<IMyAppointment[]>(
          `${url}/appointment/date?patient_id=${Cookies.get("patient_id")}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const newData = data.filter((ele) => {
          return new Date(ele.appoint_datetime * 1000) < new Date();
        });
        setAppointment(newData);
      } catch (error) {
        toast({
          status: "error",
          title: "Please Login before fo this process",
        });
      }
    };
    try {
      fetchAPI();
    } catch (error) {
      toast({ status: "error", title: "Please Check your network connection" });
    }
  }, []);

  const { translations } = useTranslation(
    "RequestDocument",
    "homepro",
    "medical",
    "refferral",
    "Confirm",
    "selectedDateTime"
  );
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" my="5">
          {translations.RequestDocument}
        </Heading>
        <Box w="20rem" mx="auto">
          <Select onChange={onchangeHandler} value={selectedDate}>
            <option value={""}>{translations.selectedDateTime}</option>
            {appointment.map((ele, index) => (
              <option value={ele.appointment_id} key={`${ele.appointment_id}`}>
                {`${moment.unix(ele.appoint_datetime).format("DD/MM/YYYY")} `}
                {new Date(ele.appoint_datetime * 1000).getUTCHours()}:00 -
                {new Date(ele.appoint_datetime * 1000).getUTCHours() + 1}:00
              </option>
            ))}
          </Select>
        </Box>
        <Flex flexWrap={"wrap"} w="100%" justifyContent={"center"} py="1rem">
          <Box w={{ base: "80%", sm: "70%", lg: "33.33%" }} my="1.5rem">
            <Box
              w={"80%"}
              mx="auto"
              shadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              cursor={"pointer"}
              borderRadius="15px"
              textAlign="center"
              padding={2}
              pb={8}
              border={"3px solid"}
              borderColor={selectMedical ? "#2260ff" : "white"}
              onClick={() => {
                setSelectMedical(!selectMedical);
              }}
            >
              {selectMedical ? (
                <Box position={"relative"} textAlign="left">
                  <Icon
                    as={CheckIcon}
                    boxSize={10}
                    backgroundColor={"#2260ff"}
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  />
                </Box>
              ) : (
                <Box position={"relative"} textAlign="left">
                  <Box
                    boxSize={10}
                    border="3px solid #b5bfd9"
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  >
                    {""}
                  </Box>
                </Box>
              )}

              <Box mb="2">{translations.medical}</Box>
              <Box w="6rem" ml="3rem" mx="auto">
                <Image
                  pointerEvents={"none"}
                  w="100%"
                  src="/images/icons/medical-certificate 1.png"
                  alt=""
                />
              </Box>
            </Box>
          </Box>
          {/* 2 */}
          <Box w={{ base: "80%", sm: "70%", lg: "33.33%" }} my="1.5rem">
            <Box
              w={"80%"}
              mx="auto"
              shadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              cursor={"pointer"}
              borderRadius="15px"
              textAlign="center"
              padding={2}
              pb={8}
              border={"3px solid"}
              borderColor={selectReferral ? "#2260ff" : "white"}
              onClick={() => {
                setSelectReferral(!selectReferral);
              }}
            >
              {selectReferral ? (
                <Box position={"relative"} textAlign="left">
                  <Icon
                    as={CheckIcon}
                    boxSize={10}
                    backgroundColor={"#2260ff"}
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  />
                </Box>
              ) : (
                <Box position={"relative"} textAlign="left">
                  <Box
                    boxSize={10}
                    border="3px solid #b5bfd9"
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  >
                    {""}
                  </Box>
                </Box>
              )}

              <Box mb="2">{translations.refferral}</Box>
              <Box w="6rem" ml="3rem" mx="auto">
                <Image
                  pointerEvents={"none"}
                  w="100%"
                  src="/images/icons/Referral.png"
                  alt=""
                />
              </Box>
            </Box>
          </Box>
          {/* 3 */}
          <Box w={{ base: "80%", sm: "70%", lg: "33.33%" }} my="1.5rem">
            <Box
              w={"80%"}
              mx="auto"
              shadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              cursor={"pointer"}
              borderRadius="15px"
              textAlign="center"
              padding={2}
              pb={8}
              border={"3px solid"}
              borderColor={selectHome ? "#2260ff" : "white"}
              onClick={() => {
                setSelectHome(!selectHome);
              }}
            >
              {selectHome ? (
                <Box position={"relative"} textAlign="left">
                  <Icon
                    as={CheckIcon}
                    boxSize={10}
                    backgroundColor={"#2260ff"}
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  />
                </Box>
              ) : (
                <Box position={"relative"} textAlign="left">
                  <Box
                    boxSize={10}
                    border="3px solid #b5bfd9"
                    color="white"
                    padding={"10px"}
                    borderRadius="50%"
                  >
                    {""}
                  </Box>
                </Box>
              )}

              <Box mb="2">{translations.homepro}</Box>
              <Box w="6rem" ml="3rem" mx="auto">
                <Image
                  pointerEvents={"none"}
                  w="100%"
                  src="/images/icons/Home_Program.png"
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        </Flex>
        <Box textAlign={"center"}>
          <Button
            my="1rem"
            bg="ButtonColor"
            borderRadius="35px"
            color="white"
            py="35px"
            px="40px"
            fontSize="1.4rem"
            onClick={() => {
              submitHandler();
            }}
          >
            {translations.Confirm}
          </Button>
        </Box>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Document;
