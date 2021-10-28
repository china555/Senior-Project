import { Button, Flex, Heading, Box, Image, Checkbox } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterForm = {
  idCardNumber: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;
  let step = 1;
  const consentImg = [
    "/images/consent/consent.jpg",
    "/images/consent/consent2.jpg",
    "/images/consent/consent3.jpg",
    "/images/consent/consent4.jpg",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const onSubmit = (data: any) => console.log(data);
  return (
    <HeartsLayouts>
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
              {consentImg.map((img) => {
                return <Image w="100%" src={img} key="" alt="" pb="5px" />;
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
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </HeartsLayouts>
  );
};

export default SignUp;
