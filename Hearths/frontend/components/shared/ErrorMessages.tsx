import { Box, Text, BoxProps } from "@chakra-ui/react";
import { isEmpty, isNil } from "lodash";
import React from "react";
interface IListErrorMessagesProps extends BoxProps {
  listErrorMessages: string[];
}

export const ErrorMessages = ({
  listErrorMessages,
  ...boxStyle
}: IListErrorMessagesProps) => {
  if (isNil(listErrorMessages) || isEmpty(listErrorMessages)) return null;

  return (
    <Box {...boxStyle}>
      {listErrorMessages.map((message) => (
        <Text fontSize="xs" key={message} color="red.400" fontWeight="semibold">
          {message}
        </Text>
      ))}
    </Box>
  );
};
