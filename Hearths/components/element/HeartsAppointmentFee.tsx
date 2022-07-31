import { Box, Flex, Heading, Image, Button, useToast } from "@chakra-ui/react";
import { HeartsDropzone } from "../common/HeartsDropZone";
import { HeartsModal } from "../common/HeartsModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { first, isEmpty, isNil } from "lodash";
import axios from "axios";
import { url } from "../../constant";
import Cookies from "js-cookie";
interface IReturnID {
  patient_id: number;
}

type submitHandler = {
  sumbithandler: () => Promise<string>;
};
export const HeartsAppointmentFee = (props: submitHandler) => {
  const toast = useToast();
  const router = useRouter();
  const [isClickCancel, setIsClickCancel] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasReceipFile = !isNil(receiptFile);

  const resetState = () => {
    setIsClickCancel(false);

    setReceiptFile(undefined);
  };

  const handleCloseModal = () => {
    onClose();
    resetState();
    if (hasReceipFile || isClickCancel) {
      router.push("/");
    }
  };

  const handleClickCancel = () => {
    setIsClickCancel(true);
    onOpen();
  };

  const onSubmitImageandDataHandler = async () => {
    try {
      if (!hasReceipFile && !isClickCancel) {
        onOpen();
      } else if (hasReceipFile) {
        const formData = new FormData();
        if (receiptFile) {
          formData.append("receipt", receiptFile);
        }
        const { data } = await axios.post(url + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const paymentData = {
          patient_id: Number(Cookies.get("patient_id")),
          payFor: "appointment",
          payMethod: "scan",
          imgPath: data.path,
        };
        await axios.post(url + "/payment", paymentData);
        const message: string = await props.sumbithandler();
        toast({ status: "success", title: "Appointment Successful" });
        onOpen();
      }
    } catch (error) {
      console.error("onSubmitImageandDataHandler", error);
      toast({ status: "error", title: "Submit failed" });
    }
  };

  const getModalIcon = () => {
    if (!hasReceipFile && !isClickCancel) return "/images/icons/warning.png";
    if (isClickCancel) return "/images/icons/remove.png";
    return "/images/icons/time-left.png";
  };

  const getModalText = () => {
    if (!hasReceipFile && !isClickCancel)
      return "Please upload payment recipte before click confirm button";

    if (isClickCancel)
      return "If you click confirm your process of appointment will be canceled";

    return "Please wait for payment confirmation";
  };

  const handleUploadFile = (files: File[]) => {
    if (isEmpty(files)) return;

    setReceiptFile(first(files));
  };

  return (
    <Box>
      <HeartsModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetState();
        }}
        isButtonClose={isClickCancel || !hasReceipFile}
      >
        <Box w="100%">
          <Box w="100px" mx="auto">
            <Image w="100%" alt="icon" src={getModalIcon()} />
          </Box>
          <Box mt="5">{getModalText()}</Box>
        </Box>
        <Button
          mt="20px"
          colorScheme="blue"
          onClick={handleCloseModal}
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
        w={{ base: "90%", lg: "80%", xl: "50%" }}
        mx="auto"
      >
        <Heading color="#003B71" as="h1" textAlign="center">
          Sign Up Fee
        </Heading>
        <Flex alignItems={"center"}>
          <Box w="50%">
            <Image mx="auto" alt="Hearts" src="/images/payment/QRcode.png" />
          </Box>
          <Box w="50%" lineHeight={"9"} fontSize={{ base: "17px", xl: "17px" }}>
            <Box>
              <b>ชื่อบัญชี:</b> HealthcaRe Tele-delivery Service
            </Box>
            <Box>
              ธนาคารไทยพาณิชย์ จำกัด (มหาชน) SIAM COMMERCIAL BANK PUBLIC COMPANY
              LIMITED 0333 สาขามหาวิทยาลัยมหิตล
            </Box>
            <Box>เลขที่บัญชี ACCOUNT NO. 333-294813-4</Box>
          </Box>
        </Flex>
        <HeartsDropzone
          onUploadFile={handleUploadFile}
          acceptType={"image/*"}
        />
        {!isNil(receiptFile) && (
          <li>
            {receiptFile.name} - {receiptFile.size} byte
          </li>
        )}
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
          onClick={onSubmitImageandDataHandler}
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
