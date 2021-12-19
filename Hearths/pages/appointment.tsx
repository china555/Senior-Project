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
import { ChangeEventHandler, useEffect, useState } from "react";
import Calendar from "react-calendar";
import add from "date-fns/add";
import { HeartsLayouts } from "../layouts/layout";
import HeartsContainer from "../components/common/HeartsContainer";
import { useDisclosure } from "@chakra-ui/hooks";
import { HeartsModal } from "../components/common/HeartsModal";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../constant";
import Cookies from "js-cookie";
import { uniq, uniqBy } from "lodash";

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
const physicalType = [
  { name: "ORTHO", id: 1 },
  { name: "NEURO", id: 2 },
  { name: "PED", id: 3 },
  { name: "COMMUNITY", id: 5 },
  { name: "PED", id: 7 },
  { name: "SCOLIOSIS", id: 12 },
];
const Appointment = () => {
  const router = useRouter();
  const [allTimeLength, setAllTimeLength] = useState<Time[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState(new Date());
  const [selectedDate, SetSelectedDate] = useState<Date>(new Date());
  const [selectedTime, SetSelectedTime] = useState("");
  const [specialty, Setspecialty] = useState<number[]>([]);
  const [therapist, Settherapist] = useState<therapisType[]>([]);
  const [enabledate, SetEnableDate] = useState<Date[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [appointmentDataAPI, setAppointmentDataAPI] = useState<
    AppointmentAPI[]
  >([]);

  const toast = useToast();
  const handleSelectedDate = (value: Date) => {
    SetSelectedDate(value);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.get<AppointmentAPI[]>(
          `${url}/appointment`
        );
        console.log(data);
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
          title: "Cannot connect to server Please Try again Later",
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
          start: `${new Date(start).getHours()}:00`,
          stop: `${new Date(stop).getHours()}:00`,
          event_id: event_id,
        };
      });
    setAllTimeLength(temp);
  }, [selectedDate, selectedSpecialty, selectedTherapist]);

  const handleSubmitSelectedDateAndTime = async () => {
    if (selectedTime !== "") {
      const data = {
        appointmentDateTime: `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDay()} ${selectedTime}:00`,
        patientId: Number(Cookies.get("patient_id")),
      };
      await axios.post(url + "/appointments", data);
      onOpen();
    } else {
      alert("please select Time for Appointment");
    }
  };

  const specialtyHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedSpecialty(e.target.value);
  };

  const therapistHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedTherapist(e.target.value);
  };
  return (
    <Box>
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
            Your appointment is {selectedTime} on{" "}
            {`${selectedDate?.getDate()}-${selectedDate?.getMonth()}-${selectedDate?.getFullYear()}`}
          </Box>
        </Box>
        <Button
          mt="20px"
          colorScheme="blue"
          w="200px"
          borderRadius="35px"
          bg="ButtonColor"
          onClick={() => {
            router.push("/");
          }}
        >
          Confirm
        </Button>
      </HeartsModal>
      <HeartsLayouts>
        <HeartsContainer>
          <Heading color="#046483" as="h1" textAlign="center" mt="5">
            Make an Appointment
          </Heading>
          <Flex flexWrap="wrap" mt="5">
            <Box w={{ base: "100%", xl: "50%" }}>
              <Text fontSize="24px">1.Select Specialty</Text>
              <Select
                bg="#F6F6F6"
                placeholder="Physical Therapist Name"
                onChange={therapistHandleChange}
              >
                {physicalType.map((ele, index) => (
                  <option value={ele.id} key={`${index}`}>
                    {ele.name}
                  </option>
                ))}
              </Select>
              <Text fontSize="24px" mt="5">
                2.Name
              </Text>
              <Select
                bg="#F6F6F6"
                placeholder="Specialty"
                onChange={specialtyHandleChange}
              >
                {therapist.map((ele, index) => (
                  <option value={ele.user_ID} key={`${index}`}>
                    {ele.name}
                  </option>
                ))}
              </Select>
              <Heading size="sm" color="#FF0000" as="h1" mt="2">
                *Note: You can skip step 1 and 2, if you do not know.
              </Heading>
            </Box>
            <Box w={{ base: "100%", xl: "50%" }} mt={{ base: "5", xl: "0" }}>
              <Text fontSize="24px">3.Select Date</Text>
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
                        key={index}
                        onClick={(index) => {
                          SetSelectedTime(`${ele.event_id}`);
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
                              selectedTime === `${ele.event_id}`
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
              Confirm
            </Button>
          </Box>
        </HeartsContainer>
      </HeartsLayouts>
    </Box>
  );
};

export default Appointment;
