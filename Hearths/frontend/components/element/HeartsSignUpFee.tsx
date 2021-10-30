import { Box, Flex, Heading, Image, Button } from "@chakra-ui/react";
import { HeartsDropzone } from "../common/HeartsDropZone";
import { useForm, SubmitHandler } from "react-hook-form";
import { HeartsMordal } from "../common/HeartsMordal";
import { useDisclosure } from "@chakra-ui/hooks";
import router from "next/router";

interface IPayment {
  title: string;
  onSubmitHandler: () => void;
  onCancelHandler: () => void;
}

type PaymentForm = {
  url: string;
};

export const HeartsSignUpFee = (props: IPayment) => {
  const { onCancelHandler, onSubmitHandler, title } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentForm>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <HeartsMordal isOpen={isOpen} onClose={onClose} isButtonClose={true}>
        <Box w="100%">
          <Box w="100px" mx="auto">
            <Image w="100%" alt="NOt Found" src="/images/icons/time-left.png" />
          </Box>
          <Box mt="5">Please wait for payment confirmation</Box>
        </Box>
        <Button
          mt="20px"
          colorScheme="blue"
          onClick={() => {
            router.push("/");
          }}
          w="200px"
          borderRadius="35px"
          bg="ButtonColor"
        >
          Close
        </Button>
      </HeartsMordal>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Flex
          flexDirection="column"
          gridRowGap="15px"
          w={{ base: "70%", lg: "40%", xl: "30%" }}
          mx="auto"
        >
          <Heading color="#003B71" as="h1" textAlign="center">
            {title}
          </Heading>
          <Box w="100%">
            <Image mx="auto" alt="Not Found" src="/images/payment/QRcode.png" />
          </Box>
          <HeartsDropzone />
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
            type="submit"
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
            onClick={onCancelHandler}
          >
            Cancel
          </Heading>
        </Flex>
      </form>
    </Box>
  );
};
