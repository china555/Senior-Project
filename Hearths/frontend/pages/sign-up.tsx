import { Button, Flex, Heading, Box, Image, Checkbox } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { HeartsDropzone } from "../components/common/HeartsDropZone";
import { HeartsMordal } from "../components/common/HeartsMordal";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import router from "next/router";

type RegisterForm = {
  idCardNumber: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const [stepRegister, setstepRegister] = useState(2);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCancel, setIsCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isUpload, setUpload] = useState(false);
  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      console.log("hello");
    });
  }, []);
  const closeHanlder = () => {
    router.push("/");
  };
  const consentImg = [
    "/images/consent/consent.png",
    "/images/consent/consent2.png",
    "/images/consent/consent3.png",
    "/images/consent/consent4.png",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: any) => {
    console.log(stepRegister);
    setstepRegister(stepRegister + 1);
  };
  return (
    <HeartsLayouts>
      {isCancel ? (
        <HeartsMordal isOpen={isOpen} onClose={onClose} isButtonClose={true}>
          <Box w="100%">
            <Box w="100px" mx="auto">
              <Image
                w="100%"
                alt="NOt Found"
                src="/images/icons/time-left.png"
              />
            </Box>
            <Box mt="5">
              Your appointment is on the payment confirmation process, you can
              check appointment status on My Appointment
            </Box>
          </Box>
          <Button
            mt="20px"
            colorScheme="blue"
            onClick={closeHanlder}
            w="200px"
            borderRadius="35px"
            bg="ButtonColor"
          >
            Close
          </Button>
        </HeartsMordal>
      ) : (
        <HeartsMordal isOpen={isOpen} onClose={onClose} isButtonClose={false}>
          <Box w="100%">
            <Box w="100px" mx="auto">
              <Image
                w="100%"
                alt="NOt Found"
                src="/images/icons/time-left.png"
              />
            </Box>
            <Box mt="5">
              Your appointment is on the payment confirmation process, you can
              check appointment status on My Appointment
            </Box>
          </Box>
          <Button
            mt="20px"
            colorScheme="blue"
            onClick={closeHanlder}
            w="200px"
            borderRadius="35px"
            bg="ButtonColor"
          >
            Close
          </Button>
        </HeartsMordal>
      )}

      {stepRegister == 1 ? (
        <Flex
          flexDirection="column"
          gridRowGap="15px"
          w={{ base: "70%", lg: "40%", xl: "30%" }}
          mx="auto"
        >
          <Heading color="#003B71" as="h1" textAlign="center">
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column" gridRowGap="15px">
              <Box>
                <HeartInput
                  placeholder="ID Card Number"
                  maxLength={13}
                  toolTipText={idCardToolTip}
                  {...register("idCardNumber", {
                    required: true,
                    maxLength: 13,
                  })}
                />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput type="email" placeholder="Email" />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput placeholder="Password" type="password" />
              </Box>
              <Box w="100%">
                {consentImg.map((img, idx) => {
                  return <Image w="100%" src={img} key={idx} alt="" pb="5px" />;
                })}
              </Box>
              <Heading as="h3" size="sm" fontWeight="medium" color="red">
                *Please read carefully. Click accept before click Sign Up
              </Heading>
              <Flex flexDirection="column" px="10px">
                <Checkbox
                  colorScheme="#F6F6F6"
                  iconColor="black"
                  defaultIsChecked
                >
                  Accept
                </Checkbox>
                <Checkbox
                  colorScheme="#F6F6F6"
                  iconColor="black"
                  defaultIsChecked
                >
                  I would like to receive your newsletter and other promotional
                  information.
                </Checkbox>
                <Button
                  my="2rem"
                  bg="ButtonColor"
                  borderRadius="35px"
                  color="white"
                  py="35px"
                  fontSize="1.6rem"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          gridRowGap="15px"
          w={{ base: "70%", lg: "40%", xl: "30%" }}
          mx="auto"
        >
          <Heading color="#003B71" as="h1" textAlign="center">
            Sign up Fee
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
            onClick={() => setIsCancel(true)}
          >
            Cancel
          </Heading>
        </Flex>
      )}
    </HeartsLayouts>
  );
};

export default SignUp;
