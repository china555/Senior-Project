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
  Link,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import add from "date-fns/add";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import { headers, url } from "../../../constant";
import {
  getMomentDateMonthYearFormat,
  getMomentHourFormat,
  getMomentNextHourFormat,
} from "../../../utils";
import Cookies from "js-cookie";
import { AppointmentStatus, IAppointment } from "../../../utils/type";
import { showNameForPatient } from "../../../utils/helper";
import Calendar from "react-calendar";
import { HeartsFilter } from "../HeartsFilter";
import moment from "moment";
import HeartsLoading from "../../common/HeartsLoading";
interface IUserAppointment {
  start: Date;
  stop: Date;
  event_id: number;
}
type Time = {
  start: string;
  stop: string;
  event_id: number;
};
type Tab = {
  setNameTab: Dispatch<SetStateAction<string>>;
};
type submit = {
  appointmentDateTime: string;
  event_id: number | undefined;
  user_id?: string;
  oldEventId: number | undefined;
};
export const UsersAppointment = (props: Tab) => {
  const { setNameTab } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IAppointment[]>([]);
  const header = [
    "Date",
    "Time",
    "Patient Full Name",
    "Meeting Link",
    "Change",
    "status",
    "home program",
  ];
  const changeTabNameHandler = () => {
    setNameTab("program");
  };
  const [enabledate, SetEnableDate] = useState<Date[]>([]);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [appointmentDataAPI, setAppointmentDataAPI] = useState<
    IUserAppointment[]
  >([]);
  const [selectedTime, SetSelectedTime] = useState<Time>();
  const [allTimeLength, setAllTimeLength] = useState<Time[]>();
  const [selectedDate, SetSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<number>();
  const [inputStartDate, setInputStartDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").subtract(30, "days").format("YYYY-MM-DD")
  );
  const [inputEndDate, setInputEndDate] = useState<string>(
    moment(new Date(), "YYYY-MM-DD").add(30, "days").format("YYYY-MM-DD")
  );
  const [selectStatus, setSelectStatus] = useState<string>("");
  const [inputPatientName, setInputPatientName] = useState<string>("");
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(10);
  const [paginationSize, setPaginationSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  let pageNumber = 1;
  const handlerSubmitRenderResult = () => {
    fetchMyAppointmentAPI();
  };
  const handleSelectedDate = (value: Date) => {
    SetSelectedDate(value);
    SetSelectedTime(undefined);
  };
  const onSubmit = () => {
    submitHandler();
    onClose();
  };

  const submitHandler = async (): Promise<string> => {
    const submitData: submit = {
      appointmentDateTime: `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()} ${selectedTime?.start}`,
      event_id: selectedTime?.event_id,
      oldEventId: selectedAppointment,
      user_id: Cookies.get("user_id"),
    };
    const { data } = await axios.post(
      url + "/user/change/appointment/date",
      submitData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(data);
    return "";
  };
  const fetchMyAppointmentAPI = async () => {
    const user_id = Cookies.get("user_id");
    try {
      setLoading(false);
      const { data } = await axios.get(
        `${url}/user/appointment?user_id=${user_id}&start_date=${inputStartDate}&end_date=${inputEndDate}&status=${selectStatus}&patient_name=${inputPatientName}&page=${pageNumber}&size=${paginationPageSize}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(data);
      setStatePending(data);
      setLoading(true);
    } catch (error) {
      toast({ status: "error", title: "Something Wrong" });
    }
  };

  useEffect(() => {
    const fetchGetAvailableDateOfUser = async () => {
      const user_id = Cookies.get("user_id");
      const { data } = await axios.get<IUserAppointment[]>(
        `${url}/user/available/date?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setAppointmentDataAPI(data);
      SetEnableDate(
        data.map(({ start }) => {
          return new Date(start);
        })
      );
    };
    fetchMyAppointmentAPI();
    fetchGetAvailableDateOfUser();
  }, []);
  useEffect(() => {
    const filterAppointment = (data: IUserAppointment) =>
      selectedDate.getDate() === new Date(data.start).getDate();

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
  }, [selectedDate]);

  return (
    <Box overflow={"auto"}>
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          My Appointment
        </Heading>
      </Flex>
      <HeartsFilter
        setStartDate={setInputStartDate}
        setEndDate={setInputEndDate}
        setPatientName={setInputPatientName}
        setStatus={setSelectStatus}
        handler={() => {
          handlerSubmitRenderResult();
        }}
        defalutEndDate={inputEndDate}
        defalutStartDate={inputStartDate}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((ele, index) => (
              <Th key={`number-${index}`}>{ele}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <>
              {pending.map((ele, index) => {
                return (
                  <Tr key={`${index}$-key`}>
                    <Td>
                      {getMomentDateMonthYearFormat(ele.appoint_datetime)}
                    </Td>
                    <Td>
                      {getMomentHourFormat(ele.appoint_datetime)}-
                      {getMomentNextHourFormat(ele.appoint_datetime)}
                    </Td>
                    <Td>{<Box>{showNameForPatient(ele)}</Box>}</Td>
                    <Td>
                      <Link
                        target="_blank"
                        href={ele.meeting_link}
                        textDecoration={
                          ele.meeting_link !== null ? "underline" : "none"
                        }
                        color={ele.meeting_link !== null ? "blue" : "black"}
                      >
                        Link
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        ref={btnRef as any}
                        colorScheme="orange"
                        onClick={() => {
                          setSelectedAppointment(ele.event_id);
                          onOpen();
                        }}
                      >
                        Change
                      </Button>
                    </Td>
                    <Td>
                      <Flex justifyContent={"center"}>
                        <Box w="100%" textAlign={"center"}>
                          {ele.appointment_status ===
                          AppointmentStatus.CONFIRM ? (
                            <Box
                              bg={"#38a169"}
                              px="5"
                              py="2"
                              borderRadius={"2em"}
                              color="white"
                            >
                              Confirm
                            </Box>
                          ) : ele.appointment_status ===
                            AppointmentStatus.REJECTED ? (
                            <Box
                              bg={"#e53e3e"}
                              px="5"
                              py="2"
                              borderRadius={"2em"}
                              color="white"
                            >
                              Reject
                            </Box>
                          ) : (
                            <Box
                              bg={"orange"}
                              px="5"
                              py="2"
                              borderRadius={"2em"}
                              color="white"
                            >
                              PENDING
                            </Box>
                          )}
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Button
                        disabled={
                          ele.appointment_status !== AppointmentStatus.CONFIRM
                        }
                        onClick={() => {
                          Cookies.set("Apmt", String(ele.event_id));
                          changeTabNameHandler();
                        }}
                        colorScheme="blue"
                        w="100%"
                      >
                        Assign
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </>
          ) : (
            <Box></Box>
          )}
        </Tbody>
      </Table>
      {loading ? <></> : <HeartsLoading />}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Change Appointment Date</DrawerHeader>

          <DrawerBody>
            <Calendar
              maxDate={add(new Date(), { days: 30 })}
              minDate={new Date()}
              onChange={setCalendarValue}
              value={calendarValue}
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
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
