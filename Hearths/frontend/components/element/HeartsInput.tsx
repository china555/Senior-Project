import {
  InputProps,
  Input as ChakraInput,
  FormHelperText,
  Tooltip,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { InfoOutlineIcon, WarningIcon } from "@chakra-ui/icons";
import React, { forwardRef } from "react";
import { ErrorMessages } from "../shared/ErrorMessages";
import { isNil } from "lodash";

export interface IInputProps extends InputProps {
  isInvalid?: boolean;
  labelText?: string;
  helperText?: string;
  errorMessages?: string[];
  labelWidth?: string;
  toolTipText?: string;
}

export const HeartInput = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      labelText,
      helperText,
      errorMessages = [],
      size = "lg",
      isInvalid = false,
      isRequired = false,
      placeholder = "",
      toolTipText,
      ...style
    },
    ref
  ) => {
    const hasErrorMessages = errorMessages.length > 0;

    return (
      <>
        {labelText && (
          <Text>
            {labelText} {isRequired && <span style={{ color: "red" }}>*</span>}
          </Text>
        )}
        <Box>
          <Flex alignItems="center">
            <ChakraInput
              size={size}
              errorBorderColor="red.500"
              focusBorderColor="gray.400"
              backgroundColor="#F6F6F6"
              placeholder={placeholder}
              {...style}
              isInvalid={isInvalid}
              ref={ref}
              borderColor="#E8E8E8"
            />
            {toolTipText && (
              <Tooltip
                label={toolTipText}
                aria-label={toolTipText}
                placement="right-end"
              >
                <InfoOutlineIcon
                  w={4}
                  h={4}
                  mx={4}
                  display={{ base: "none", xl: "block" }}
                  color="#C1B9B9"
                />
              </Tooltip>
            )}
          </Flex>

          {hasErrorMessages && (
            <ErrorMessages listErrorMessages={errorMessages} />
          )}
        </Box>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </>
    );
  }
);

HeartInput.displayName = "HeartInput";
