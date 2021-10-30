import { Box, Flex, Heading, Image, Button } from "@chakra-ui/react";
import { HeartsDropzone } from "../common/HeartsDropZone";
import { useForm, SubmitHandler } from "react-hook-form";
import { HeartsModal } from "../common/HeartsModal";
import { useDisclosure } from "@chakra-ui/hooks";
import router from "next/router";
import { useState } from "react";
import { first, isEmpty, isNil } from "lodash";

type PaymentForm = {
  url: string;
};

export const HeartsSignUpFee = () => {
  const [isClickCancel, setIsClickCancel] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasReceipFile = !isNil(receiptFile);

  const handleRedirectionToIndexPage = () => {
    onClose();

    if (hasReceipFile || isClickCancel) {
      router.push("/");
    }
  };

  const handleClickCancel = () => {
    setIsClickCancel(true);
    onOpen();
  };

  const getModalIcon = () => {
    if (isClickCancel) return "/images/icons/remove.png";
    if (!hasReceipFile) return "/images/icons/warning.png";
    return "/images/icons/time-left.png";
  };

  const getModalText = () => {
    if (isClickCancel)
      return "If you click confirm your process of appointment will be canceled";
    if (!hasReceipFile)
      return "Please upload payment recipte before click confirm button";
    return "Please wait for payment confirmation";
  };
  const handleUploadFile = (files: File[]) => {
    if (isEmpty(files)) return;

    setReceiptFile(first(files));
  };
  return (
    <Box>
      <HeartsModal isOpen={isOpen} onClose={onClose} isButtonClose={true}>
        <Box w="100%">
          <Box w="100px" mx="auto">
            <Image w="100%" alt="NOt Found" src={getModalIcon()} />
          </Box>
          <Box mt="5">{getModalText()}</Box>
        </Box>
        <Button
          mt="20px"
          colorScheme="blue"
          onClick={handleRedirectionToIndexPage}
          w="200px"
          borderRadius="35px"
          bg="ButtonColor"
        >
          {isClickCancel ? "Confirm" : "Close"}
        </Button>
      </HeartsModal>

      <Flex
        flexDirection="column"
        gridRowGap="15px"
        w={{ base: "70%", lg: "40%", xl: "30%" }}
        mx="auto"
      >
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign Up Fee
        </Heading>
        <Box w="100%">
          <Image mx="auto" alt="Not Found" src="/images/payment/QRcode.png" />
        </Box>
        <HeartsDropzone onUploadFile={handleUploadFile} />
        <Heading as="h3" size="sm" fontWeight="medium" color="red">
          *Note: <br />- You cannot skip this process. If you change or close
          this page, this process will be canceled.
          <br />- You must upload the receipt.
        </Heading>
        <Button
          mt="1rem"
          bg="ButtonColor"
          borderRadius="35px"
          color="white"
          py="35px"
          fontSize="1.6rem"
          onClick={onOpen}
        >
          Confirm
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
          Cancel
        </Heading>
      </Flex>
    </Box>
  );
};
