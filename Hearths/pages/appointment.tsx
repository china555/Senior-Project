import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import add from "date-fns/add";
import { flatMap, range } from "lodash";
import { HeartsLayouts } from "../layouts/layout";
import HeartsContainer from "../components/common/HeartsContainer";
import { useDisclosure } from "@chakra-ui/hooks";
import { HeartsModal } from "../components/common/HeartsModal";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../constant";
import Cookies from "js-cookie";

type Time = {
  start: string;
  end: string;
  isBooked: boolean;
};

const Appointment = () => {
  const router = useRouter();
  const [allTimeLength, setAllTimeLength] = useState<Time[]>(
    flatMap(
      range(8, 20)
        .filter((ele) => {
          return ele !== 12;
        })
        .map((val) => [`${val}:00`, `${val}:30`, `${val}:30`, `${val + 1}:00`])
        .map(([startA, endA, startB, endB]) => [
          { start: startA, end: endA, isBooked: false },
          { start: startB, end: endB, isBooked: false },
        ])
    )
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, onChange] = useState(new Date());
  const [selectedDate, SetSelectedDate] = useState<Date>(new Date());
  const [selectedTime, SetSelectedTime] = useState("");
  const [selectedspecialty, SetSelectedspecialty] = useState("");
  const [selectedtherapist, SetSelectedtherapist] = useState("");

  const handleSelectedDate = (value: Date) => {
    SetSelectedDate(value);
  };

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
            with ...............
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
              <Select bg="#F6F6F6" placeholder="Specialty">
                <option value="option1">Specialty1</option>
                <option value="option2">Specialty2</option>
                <option value="option3">Specialty3</option>
              </Select>
              <Text fontSize="24px" mt="5">
                2.Name
              </Text>
              <Select bg="#F6F6F6" placeholder="Physical Therapist Name">
                <option value="option1">Therapist1</option>
                <option value="option2">Therapist2</option>
                <option value="option3">Therapist3</option>
              </Select>
              <Heading size="sm" color="#FF0000" as="h1" mt="2">
                *Note: You can skip step 1 and 2, if you do not know.
              </Heading>
            </Box>
            <Box w={{ base: "100%", xl: "50%" }} mt={{ base: "5", xl: "0" }}>
              <Text fontSize="24px">3.Select Date</Text>
              <Box w={{ base: "100%", xl: "60%" }} mx="auto">
                <Calendar
                  onChange={onChange}
                  value={value}
                  maxDate={add(new Date(), { days: 30 })}
                  minDate={new Date()}
                  onClickDay={handleSelectedDate}
                />
                <Box maxH="200px" overflowY="scroll" className="scroll">
                  {allTimeLength.map((ele, index) => {
                    return (
                      <Flex
                        key={index}
                        onClick={(index) => {
                          if (!ele.isBooked) {
                            SetSelectedTime(`${ele.start}`);
                          }
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
                              selectedTime === `${ele.start}`
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
                            {ele.start} - {ele.end}
                          </Box>
                          <Box w="20%">{ele.isBooked ? "Booked" : "Free"}</Box>
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
