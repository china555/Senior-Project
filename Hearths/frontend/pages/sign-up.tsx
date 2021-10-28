import { Button, Flex, Heading, Box, Image, Checkbox } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { HeartsDropzone } from "../components/common/HeartsDropZone";
import { HeartsMordal } from "../components/common/HeartsMordal";

type RegisterForm = {
  idCardNumber: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  let step = 2;

  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;

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
    console.log(data);
    step++;
    console.log(step);
  };
  return (
    <HeartsLayouts>
      <HeartsMordal />
      {step == 1 ? (
        <Flex
          flexDirection="column"
          gridRowGap="15px"
          w={{ base: "70%", lg: "40%", xl: "30%" }}
          mx="auto"
        >
          <Heading color="#003B71" as="h1" textAlign="center">
            Sign up
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
            my="2rem"
            bg="ButtonColor"
            borderRadius="35px"
            color="white"
            py="35px"
            fontSize="1.6rem"
            type="submit"
          >
            Confirm
          </Button>
        </Flex>
      )}
    </HeartsLayouts>
  );
};

export default SignUp;
