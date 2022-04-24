import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import add from "date-fns/add";
import { HeartsLayouts } from "../layouts/layout";
import HeartsContainer from "../components/common/HeartsContainer";
import { useDisclosure } from "@chakra-ui/hooks";
import { HeartsModal } from "../components/common/HeartsModal";
import { useRouter } from "next/router";
import axios from "axios";
import { headers, url } from "../constant";
import Cookies from "js-cookie";
import { uniqBy } from "lodash";
import { useTranslation } from "../hooks/useTranslation";
import { HeartsDropzone } from "../components/common/HeartsDropZone";
import { first, isEmpty, isNil } from "lodash";
import { getMomentHourFormat, getMomentNextHourFormat } from "../utils";
import { HeartsOmise } from "../components/element/HeartsOmisePayment";
type submit = {
  appointmentDateTime: string;
  patientId: number;
  event_id: number | undefined;
  user_id?: number;
  payment_id?: number;
};

type Time = {
  start: string;
  stop: string;
  event_id: number;
};
type AppointmentAPI = {
  FirstName: string;
  LastName: string;
  PhysicalType_ID: number;
  Prefix_Rang: string;
  User_ID: number;
  start: Date;
  stop: Date;
  event_id: number;
};

type therapisType = {
  name: string;
  user_ID: number;
};
const Appointment = () => {
  const router = useRouter();
  const [allTimeLength, setAllTimeLength] = useState<Time[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState(new Date());
  const [selectedDate, SetSelectedDate] = useState<Date>(new Date());
  const [selectedTime, SetSelectedTime] = useState<Time>();
  const [step, setStep] = useState(1);
  const [therapist, Settherapist] = useState<therapisType[]>([]);
  const [enabledate, SetEnableDate] = useState<Date[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [appointmentDataAPI, setAppointmentDataAPI] = useState<
    AppointmentAPI[]
  >([]);
  const { translations, changeLocale } = useTranslation(
    "ErrorMessageSelectedTime",
    "Appointment",
    "DepartMentName",
    "selectspeacialty",
    "Name",
    "PTName",
    "selectedDate",
    "appointmentnote",
    "Confirm",
    "Close",
    "on",
    "yourAppoint",
    "Cancel",
    "paymentFee",
    "NoteFee",
    "NoteFee1",
    "NoteFee2",
    "Error",
    "successAppoint",
    "submitFail",
    "clickpleaseUploadPayment",
    "clickappointmentcanceled",
    "clickconfirm",
    "accountName",
    "accountNo",
    "selectspeacialty1",
    "selectPaymentMethod",
    "payByQR"
  );
  const physicalType = [
    { name: translations.DepartMentName.OccupationalTherapy, id: 1 },
    { name: translations.DepartMentName.NeurologicalSystem, id: 2 },
    { name: translations.DepartMentName.Pediatric, id: 3 },
    { name: translations.DepartMentName.Community, id: 5 },
    { name: translations.DepartMentName.Scoliosis, id: 12 },
  ];
  const toast = useToast();
  const handleSelectedDate = (value: Date) => {
    SetSelectedDate(value);
    SetSelectedTime(undefined);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.get<AppointmentAPI[]>(
          `${url}/patient/appointment`,
          headers
        );
        setAppointmentDataAPI(data);
        SetEnableDate(
          data.map(({ start }) => {
            return new Date(start);
          })
        );
        const therapistData = data.map(
          ({ Prefix_Rang, FirstName, LastName, User_ID }) => {
            return {
              name: `${Prefix_Rang}${FirstName} ${LastName}`,
              user_ID: User_ID,
            };
          }
        );
        Settherapist(uniqBy(therapistData, "user_ID"));
      } catch (error) {
        toast({
          status: "error",
          title: translations.Error,
        });
      }
    };
    fetchAPI();
  }, []);
  const filterAppointment = (data: AppointmentAPI) => {
    if (selectedSpecialty === "" && selectedTherapist === "") {
      return selectedDate.getDate() === new Date(data.start).getDate();
    } else if (selectedSpecialty !== "" && selectedTherapist === "") {
      return (
        selectedDate.getDate() === new Date(data.start).getDate() &&
        Number(selectedSpecialty) === data.PhysicalType_ID
      );
    } else if (selectedSpecialty === "" && selectedTherapist !== "") {
      return (
        selectedDate.getDate() === new Date(data.start).getDate() &&
        Number(selectedTherapist) === data.User_ID
      );
    } else {
      return (
        selectedDate.getDate() === new Date(data.start).getDate() &&
        Number(selectedTherapist) === data.User_ID &&
        Number(selectedSpecialty) === data.PhysicalType_ID
      );
    }
  };
  useEffect(() => {
    const temp = appointmentDataAPI
      .filter(filterAppointment)
      .map(({ start, stop, event_id }) => {
        return {
          start: getMomentHourFormat(start),
          stop: getMomentHourFormat(stop),
          event_id: event_id,
        };
      });
    setAllTimeLength(temp);
  }, [selectedDate, selectedSpecialty, selectedTherapist]);

  const handleSubmitSelectedDateAndTime = async () => {
    if (selectedTime !== undefined) {
      onOpen();
    } else {
      toast({
        status: "error",
        title: translations.ErrorMessageSelectedTime,
      });
    }
  };

  const specialtyHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
  };

  const therapistHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTherapist(e.target.value);
  };

  const submitHandler = async (paymentId: number): Promise<string> => {
    const submitData: submit = {
      appointmentDateTime: `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()} ${selectedTime?.start}`,
      patientId: Number(Cookies.get("patient_id")),
      event_id: selectedTime?.event_id,
      payment_id: paymentId,
    };
    const { data } = await axios.post(
      url + "/create/appointment",
      submitData,
      headers
    );
    return data;
  };
  const [isClickCancel, setIsClickCancel] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File>();

  const hasReceipFile = !isNil(receiptFile);

  const resetState = () => {
    setIsClickCancel(false);

    setReceiptFile(undefined);
  };

  const handleCloseModal = () => {
    onClose();
    resetState();
    if (hasReceipFile || isClickCancel) {
      router.push("/");
    }
  };

  const handleClickCancel = () => {
    setIsClickCancel(true);
    onOpen();
  };

  const onSubmitImageandDataHandler = async () => {
    try {
      if (!hasReceipFile && !isClickCancel) {
        onOpen();
      } else if (hasReceipFile) {
        const formData = new FormData();
        if (receiptFile) {
          formData.append("receipt", receiptFile);
        }
        const { data } = await axios.post(url + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const paymentData = {
          patient_id: Number(Cookies.get("patient_id")),
          payFor: "appointment",
          payMethod: "scan",
          imgPath: data.path,
        };
        const paymentInfo = await axios.post(url + "/payment", paymentData);
        const message: Promise<string> = submitHandler(
          paymentInfo.data.paymentInfo.payment_id
        );
        toast({ status: "success", title: translations.successAppoint });
        onOpen();
      }
    } catch (error) {
      console.error("onSubmitImageandDataHandler", error);
      toast({ status: "error", title: translations.submitFail });
    }
  };

  const getModalIcon = () => {
    if (!hasReceipFile && !isClickCancel) return "/images/icons/warning.png";
    if (isClickCancel) return "/images/icons/remove.png";
    return "/images/icons/time-left.png";
  };

  const getModalText = () => {
    if (!hasReceipFile && !isClickCancel)
      return translations.clickpleaseUploadPayment;

    if (isClickCancel) return translations.clickappointmentcanceled;

    return translations.clickconfirm;
  };

  const handleUploadFile = (files: File[]) => {
    if (isEmpty(files)) return;

    setReceiptFile(first(files));
  };
  return (
    <Box>
      <HeartsLayouts>
        <HeartsModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
          isButtonClose={true}
        >
          <Box w="100%">
            <Box w="100px" mx="auto">
              <Image
                w="100%"
                alt="NOt Found"
                src={"/images/icons/calendar2.png"}
              />
            </Box>
            <Box mt="5">
              {translations.yourAppoint} {selectedTime?.start}-
              {selectedTime?.stop} {translations.on}{" "}
              {`${selectedDate?.getDate()}-${
                selectedDate?.getMonth() + 1
              }-${selectedDate?.getFullYear()}`}
            </Box>
          </Box>
          <Button
            mt="20px"
            colorScheme="blue"
            w="200px"
            borderRadius="35px"
            bg="ButtonColor"
            onClick={() => {
              setStep(step + 1);
              onClose();
            }}
          >
            {translations.Confirm}
          </Button>
        </HeartsModal>
        {step === 1 ? (
          <HeartsContainer>
            <Heading color="#046483" as="h1" textAlign="center" mt="5">
              {translations.Appointment}
            </Heading>
            <Flex flexWrap="wrap" mt="5">
              <Box w={{ base: "100%", xl: "50%" }}>
                <Text fontSize="24px">1.{translations.selectspeacialty}</Text>
                <Select
                  bg="#F6F6F6"
                  placeholder={translations.selectspeacialty1}
                  onChange={specialtyHandleChange}
                >
                  {physicalType.map((ele, index) => (
                    <option value={ele.id} key={`${index}`}>
                      {ele.name}
                    </option>
                  ))}
                </Select>
                <Text fontSize="24px" mt="5">
                  2.{translations.Name}
                </Text>
                <Select
                  bg="#F6F6F6"
                  placeholder={translations.PTName}
                  onChange={therapistHandleChange}
                >
                  {therapist.map((ele, index) => (
                    <option value={ele.user_ID} key={`${index}`}>
                      {ele.name}
                    </option>
                  ))}
                </Select>
                <Heading size="sm" color="#FF0000" as="h1" mt="2">
                  {translations.appointmentnote}
                </Heading>
              </Box>
              <Box w={{ base: "100%", xl: "50%" }} mt={{ base: "5", xl: "0" }}>
                <Text fontSize="24px">3.{translations.selectedDate}</Text>
                <Box w={{ base: "100%", xl: "60%" }} mx="auto">
                  <Calendar
                    maxDate={add(new Date(), { days: 30 })}
                    minDate={new Date()}
                    onChange={onChange}
                    value={value}
                    onClickDay={handleSelectedDate}
                    tileDisabled={({ view, date }) => {
                      return (
                        view === "month" &&
                        !enabledate.some(
                          (disabledDate) =>
                            date.getFullYear() === disabledDate.getFullYear() &&
                            date.getMonth() === disabledDate.getMonth() &&
                            date.getDate() === disabledDate.getDate()
                        )
                      );
                    }}
                  />
                  <Box maxH="200px" overflowY="scroll" className="scroll">
                    {allTimeLength?.map((ele, index) => {
                      return (
                        <Flex
                          key={`number-${index}`}
                          onClick={() => {
                            SetSelectedTime({
                              start: ele.start,
                              stop: ele.stop,
                              event_id: ele.event_id,
                            });
                          }}
                          bg="#f6f6f6"
                          borderBottom="1px solid"
                          p="0.5rem"
                          borderColor="#E8E8E8"
                        >
                          <Flex
                            w="100%"
                            style={{
                              background:
                                selectedTime?.event_id === ele.event_id
                                  ? "#DDDCDC"
                                  : "#f6f6f6",
                            }}
                            cursor="pointer"
                          >
                            <Box w="20%" textAlign="center" alignSelf="center">
                              <Box
                                w="15px"
                                h="15px"
                                mx="auto"
                                borderRadius="100%"
                                bg="blue.300"
                              >
                                &nbsp;
                              </Box>
                            </Box>
                            <Box w="60%" fontWeight="800">
                              {ele.start} - {ele.stop}
                            </Box>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Flex>
            <Box textAlign="center">
              <Button
                my="1rem"
                bg="ButtonColor"
                borderRadius="35px"
                color="white"
                py="30px"
                fontSize="1.6rem"
                w={{ base: "60%", xl: "40%" }}
                onClick={handleSubmitSelectedDateAndTime}
              >
                {translations.Confirm}
              </Button>
            </Box>
          </HeartsContainer>
        ) : step === 2 ? (
          <Box>
            <Flex
              flexDirection="column"
              gridRowGap="15px"
              w={{ base: "90%", lg: "80%", xl: "50%" }}
              mx="auto"
            >
              <Heading color="#003B71" as="h1" textAlign="center">
                {translations.selectPaymentMethod}
              </Heading>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <HeartsOmise
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
                <Button
                  mt="2"
                  onClick={() => {
                    setStep(step + 1);
                  }}
                  w={{ base: "70%", xl: "50%" }}
                >
                  {translations.payByQR}
                </Button>
              </Flex>
            </Flex>
          </Box>
        ) : (
          <Box>
            <HeartsModal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                resetState();
              }}
              isButtonClose={isClickCancel || !hasReceipFile}
            >
              <Box w="100%">
                <Box w="100px" mx="auto">
                  <Image w="100%" alt="icon" src={getModalIcon()} />
                </Box>
                <Box mt="5">{getModalText()}</Box>
              </Box>
              <Button
                mt="20px"
                colorScheme="blue"
                onClick={handleCloseModal}
                w="200px"
                borderRadius="35px"
                bg="ButtonColor"
              >
                {isClickCancel ? translations.Confirm : translations.Close}
              </Button>
            </HeartsModal>

            <Flex
              flexDirection="column"
              gridRowGap="15px"
              w={{ base: "90%", lg: "80%", xl: "50%" }}
              mx="auto"
            >
              <Heading color="#003B71" as="h1" textAlign="center">
                {translations.paymentFee}
              </Heading>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Box w="50%">
                  <Image
                    mx="auto"
                    alt="Hearts"
                    src="/images/payment/QRcode.png"
                  />
                </Box>
                <Box
                  w="50%"
                  lineHeight={"9"}
                  fontSize={{ base: "17px", xl: "17px" }}
                >
                  <Box>
                    <b>{translations.accountName}:</b> HealthcaRe Tele-delivery
                    Service
                  </Box>
                  <Box>
                    ธนาคารไทยพาณิชย์ จำกัด (มหาชน) SIAM COMMERCIAL BANK PUBLIC
                    COMPANY LIMITED 0333 สาขามหาวิทยาลัยมหิตล
                  </Box>
                  <Box>{translations.accountNo} 333-294813-4</Box>
                </Box>
              </Flex>
              <HeartsDropzone onUploadFile={handleUploadFile} />
              {!isNil(receiptFile) && (
                <li>
                  {receiptFile.name} - {receiptFile.size} byte
                </li>
              )}
              <Heading as="h3" size="sm" fontWeight="medium" color="red">
                {translations.NoteFee} <br />- {translations.NoteFee1}
                <br />- {translations.NoteFee2}
              </Heading>
              <Button
                mt="1rem"
                bg="ButtonColor"
                borderRadius="35px"
                color="white"
                py="35px"
                fontSize="1.6rem"
                onClick={onSubmitImageandDataHandler}
              >
                {translations.Confirm}
              </Button>
              <Heading
                textAlign="center"
                as="h3"
                mb="3rem"
                size="md"
                fontWeight="medium"
                color="red"
                textDecoration="underline"
                cursor="pointer"
                onClick={handleClickCancel}
              >
                {translations.Cancel}
              </Heading>
            </Flex>
          </Box>
        )}
      </HeartsLayouts>
    </Box>
  );
};

export default Appointment;
