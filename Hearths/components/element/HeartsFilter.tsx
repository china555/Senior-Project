import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AppointmentStatus } from "../../utils/type";
import { HeartInput } from "./HeartsInput";
interface IFilter {
  setStartDate: Dispatch<SetStateAction<any>>;
  setEndDate: Dispatch<SetStateAction<any>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setPatientName: Dispatch<SetStateAction<string>>;
  setPhysiotherapistsName?: Dispatch<SetStateAction<string>>;
  defalutStartDate: string;
  defalutEndDate: string;
  handler: () => void;
}
export const HeartsFilter = (props: IFilter) => {
  const {
    setStartDate,
    setEndDate,
    setPatientName,
    setPhysiotherapistsName,
    setStatus,
    handler,
    defalutEndDate,
    defalutStartDate,
  } = props;

  const onChangeHandlerEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  const onChangeHandlerStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const onChangeHandlerStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const onChangeHandlerPatientName = (e: ChangeEvent<HTMLInputElement>) => {
    setPatientName(e.target.value);
  };
  const onChangeHandlerPhysiotherapistsName = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (setPhysiotherapistsName) setPhysiotherapistsName(e.target.value);
  };

  return (
    <Box>
      <InputGroup>
        <Flex mr="2">
          <InputLeftAddon w={"6.8em"}>Start Date: </InputLeftAddon>
          <Input
            onChange={onChangeHandlerStartDate}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            minWidth="auto"
            type="date"
            value={defalutStartDate}
          />
        </Flex>

        <Flex mr="2">
          <InputLeftAddon>Patient: </InputLeftAddon>
          <Input
            w="100"
            placeholder="Name"
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            onChange={onChangeHandlerPatientName}
          />
        </Flex>
        {setPhysiotherapistsName ? (
          <Flex mr="2">
            <InputLeftAddon>PHYSIOTHERAPISTS: </InputLeftAddon>
            <Input
              w="100"
              placeholder="Name"
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              onChange={onChangeHandlerPhysiotherapistsName}
            />
          </Flex>
        ) : (
          <Flex></Flex>
        )}

        <Flex>
          <Button onClick={handler} colorScheme="blue" w="100%">
            Search
          </Button>
        </Flex>
      </InputGroup>
      <InputGroup mt="3">
        <Flex mr="2">
          <InputLeftAddon w={"6.8em"}>End Date: </InputLeftAddon>
          <Input
            onChange={onChangeHandlerEndDate}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            w="100"
            minWidth="auto"
            type="date"
            value={defalutEndDate}
          />
        </Flex>
        <Flex mr="2">
          <InputLeftAddon>Status: </InputLeftAddon>
          <Select
            placeholder="Status"
            minWidth="auto"
            w="max-content"
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            onChange={onChangeHandlerStatus}
          >
            <option value={AppointmentStatus.CONFIRM}>CONFIRMED</option>
            <option value={AppointmentStatus.PENDING}>PENDING</option>
            <option value={AppointmentStatus.REJECTED}>REJECTED</option>
          </Select>
        </Flex>
      </InputGroup>
    </Box>
  );
};
