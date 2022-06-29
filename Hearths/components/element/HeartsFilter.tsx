import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { LegacyRef } from "react";
import { AppointmentStatus } from "../../utils/type";
import { HeartInput } from "./HeartsInput";
interface IFilter {
  dateRef: LegacyRef<HTMLInputElement>;
  statusRef: LegacyRef<HTMLSelectElement>;
  patientNameRef: LegacyRef<HTMLInputElement>;
  physiotherapistsNameRef: LegacyRef<HTMLInputElement>;
}
export const HeartsFilter = (props: IFilter) => {
  const { dateRef, patientNameRef, physiotherapistsNameRef, statusRef } = props;
  return (
    <Box>
      <InputGroup justifyContent="space-between">
        <Flex>
          <InputLeftAddon>Date: </InputLeftAddon>
          <Input
            ref={dateRef}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            w="100"
            type="date"
            placeholder="phone number"
          />
        </Flex>
        <Flex>
          <InputLeftAddon>Status: </InputLeftAddon>
          <Select
            ref={statusRef}
            placeholder="Status"
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          >
            <option value={AppointmentStatus.CONFIRM}>CONFIRMED</option>
            <option value={AppointmentStatus.PENDING}>PENDING</option>
            <option value={AppointmentStatus.REJECTED}>REJECTED</option>
          </Select>
        </Flex>
        <Flex>
          <InputLeftAddon>Patient: </InputLeftAddon>
          <Input
            ref={patientNameRef}
            w="100"
            placeholder="Name"
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          />
        </Flex>
        <Flex>
          <InputLeftAddon>PHYSIOTHERAPISTS: </InputLeftAddon>
          <Input
            ref={physiotherapistsNameRef}
            w="100"
            placeholder="Name"
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          />
        </Flex>
      </InputGroup>
    </Box>
  );
};
