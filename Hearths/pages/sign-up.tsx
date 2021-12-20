import { Button, Flex, Heading, Box, Image, Checkbox } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { HeartsSignUpFee } from "../components/element/HeartsSignUpFee";
import axios from "axios";
import { url } from "../constant";
interface IReturnID {
  patient_id: number;
}

type RegisterForm = {
  idCardNumber: string;
  username: string;
  password: string;
  consentAgreement: boolean;
  newsReceivingAgreement: boolean;
};

const errorMessages = (fieldName: string, errors: FieldError) => {
  const errorRequire = errors?.type === "required" ? "* required" : "";
  const errorMaxLength =
    errors?.type === "maxLength" || errors?.type === "minLength"
      ? "* required 13 digits"
      : "";
  if (fieldName === "idcard") return [errorRequire, errorMaxLength];
  if (fieldName === "email" || fieldName === "password") return [errorRequire];
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [stepRegister, setstepRegister] = useState(1);
  const idCardToolTip = `It is used for your identification and is used only 
                         in this process. It will not be used for anything else`;
  const [consentFormAgreement, setConsentFormAgreement] = useState(false);
  const [newsReceivingAgreement, setnewsReceivingAgreement] = useState(false);
  const [submitData, setSubmitData] = useState<RegisterForm>();
  const closeHanlder = () => {
    router.push("/");
  };

  const consentFormAgreementOnChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setConsentFormAgreement(e.target.checked);
  };
  const newsReceivingAgreementOnChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setnewsReceivingAgreement(e.target.checked);
  };

  const submitHandler = async (): Promise<IReturnID> => {
    const { data } = await axios.post(url + "/register", submitData);
    return data;
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
    if (consentFormAgreement) {
      setSubmitData({
        ...data,
        consentAgreement: consentFormAgreement,
        newsReceivingAgreement,
      });
      setstepRegister(stepRegister + 1);
    }
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
                  isRequired={true}
                  {...register("idCardNumber", {
                    required: true,
                    maxLength: 13,
                    minLength: 13,
                  })}
                  isInvalid={errors.idCardNumber?.type === "required"}
                  errorMessages={errorMessages(
                    "idcard",
                    errors.idCardNumber as FieldError
                  )}
                />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput
                  {...register("username", {
                    required: true,
                  })}
                  type="email"
                  placeholder="Email"
                  isRequired={true}
                  isInvalid={errors.username?.type === "required"}
                  errorMessages={errorMessages(
                    "email",
                    errors.username as FieldError
                  )}
                />
              </Box>
              <Box pr={{ base: 0, xl: "50px" }}>
                <HeartInput
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="Password"
                  type="password"
                  isRequired={true}
                  isInvalid={errors.password?.type === "required"}
                  errorMessages={errorMessages(
                    "password",
                    errors.password as FieldError
                  )}
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
                <Checkbox
                  onChange={consentFormAgreementOnChangeHandler}
                  colorScheme="#F6F6F6"
                  iconColor="black"
                  isInvalid={!consentFormAgreement}
                >
                  Accept
                </Checkbox>
                <Checkbox
                  onChange={newsReceivingAgreementOnChangeHandler}
                  colorScheme="#F6F6F6"
                  iconColor="black"
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
        <HeartsSignUpFee sumbithandler={submitHandler} />
      )}
    </HeartsLayouts>
  );
};

export default SignUp;