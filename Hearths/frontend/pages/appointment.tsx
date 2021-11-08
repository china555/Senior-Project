import { Box, Flex, Heading, Text, Select, Button } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import add from "date-fns/add";
import { flatMap, range } from "lodash";
import { HeartsLayouts } from "../layouts/layout";
import HeartsContainer from "../components/common/HeartsContainer";

type Time = {
  start: string;
  end: string;
  isBooked: boolean;
};

const Appointment = () => {
  const handleSelectedDate = (value: Date) => {
    console.log(value);
  };

  const [value, onChange] = useState(new Date());
  const [selectedDate, SetSelectedDate] = useState("");
  const [selectedTime, SetSelectedTime] = useState("");
  const [allTimeLength, setAllTimeLength] = useState<Time[]>(
    flatMap(
      range(8, 20)
        .filter((ele) => {
          return ele !== 12;
        })
        .map((val) => [`${val}:00`, `${val}:30`, `${val}:30`, `${val + 1}:00`])
        .map(([startA, endA, startB, endB]) => [
          { start: startA, end: endA, isBooked: false },
          { start: startB, end: endB, isBooked: true },
        ])
    )
  );
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" mt="5">
          Make an Appointment
        </Heading>
        <Flex flexWrap="wrap" mt="5">
          <Box w={{ base: "100%", xl: "50%" }}>
            <Text fontSize="24px">1.Select Specialty</Text>
            <Select bg="#F6F6F6" placeholder="Specialty">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Text fontSize="24px" mt="5">
              2.Name
            </Text>
            <Select bg="#F6F6F6" placeholder="Physical Therapist Name">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
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
                      onClick={() => {
                        if (!ele.isBooked) {
                          SetSelectedTime(`${ele.start} - ${ele.end}`);
                        }
                      }}
                      bg="#f6f6f6"
                      borderBottom="1px solid"
                      p="0.5rem"
                      borderColor="#E8E8E8"
                    >
                      <Flex
                        w="100%"
                        _active={{ bg: "#DDDCDC" }}
                        _focus={{ bg: "red" }}
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
          >
            Confirm
          </Button>
        </Box>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Appointment;
