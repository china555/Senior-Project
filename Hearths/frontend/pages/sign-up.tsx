import { Button, Flex, Heading, Box, Image, Checkbox } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { HeartsSignUpFee } from "../components/element/HeartsSignUpFee";

type RegisterForm = {
  idCardNumber: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [stepRegister, setstepRegister] = useState(1);
  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;

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

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
    setstepRegister(stepRegister + 1);
  };
  return (
    <HeartsLayouts>
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
                    // required: true,
                    maxLength: 13,
                  })}
                />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput
                  {...register("email", {
                    // required: true,
                  })}
                  // type="email"
                  placeholder="Email"
                />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput
                  {...register("password", {
                    // required: true,
                  })}
                  placeholder="Password"
                  type="password"
                />
              </Box>
              <Box w="100%">
                {consentImg.map((img, idx) => {
                  return (
                    <Image
                      w="100%"
                      src={img}
                      key={idx}
                      alt="Consent Form"
                      pb="5px"
                    />
                  );
                })}
              </Box>
              <Heading as="h3" size="sm" fontWeight="medium" color="red">
                *Please read carefully. Click accept before click Sign Up
              </Heading>
              <Flex flexDirection="column" px="10px">
                <Checkbox colorScheme="#F6F6F6" iconColor="black">
                  Accept
                </Checkbox>
                <Checkbox colorScheme="#F6F6F6" iconColor="black">
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
        <HeartsSignUpFee />
      )}
    </HeartsLayouts>
  );
};

export default SignUp;
