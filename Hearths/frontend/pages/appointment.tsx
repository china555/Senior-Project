import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import add from "date-fns/add";
import { flatMap, range } from "lodash";

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
  const [selectedDate, SetSelectedDate] = useState();
  const [allTimeLength, setAllTimeLength] = useState<Time[]>(
    flatMap(
      range(8, 20)
        .map((val) => [`${val}:00`, `${val}:30`, `${val}:30`, `${val + 1}:00`])
        .map(([startA, endA, startB, endB]) => [
          { start: startA, end: endA, isBooked: false },
          { start: startB, end: endB, isBooked: false },
        ]).filter((ele)=>{
          return ele.start !== 12
        })
    )
  );
  return (
    <Box>
      <Box w="20%">
        <Calendar
          onChange={onChange}
          value={value}
          maxDate={add(new Date(), { days: 3 })}
          minDate={new Date()}
          onClickDay={handleSelectedDate}
        />
      </Box>
      <Box maxH="200px" overflowY="scroll" className="scroll">
        {allTimeLength.map((ele, index) => {
          return (
            <Flex
              key={index}
              w="20%"
              bg="#f6f6f6"
              borderBottom="1px solid"
              p="0.5rem"
              borderColor="#E8E8E8"
            >
              <Flex w="100%" _active={{ bg: "#DDDCDC" }}>
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
  );
};

export default Appointment;
