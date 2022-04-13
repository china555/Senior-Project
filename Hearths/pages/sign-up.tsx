import {
  Button,
  Flex,
  Heading,
  Box,
  Image,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartInput } from "../components/element/HeartsInput";
import { HeartsLayouts } from "../layouts/layout";
import { useForm, FieldError } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { HeartsDropzone } from "../components/common/HeartsDropZone";
import { HeartsModal } from "../components/common/HeartsModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { first, isEmpty, isNil } from "lodash";
import axios from "axios";
import { url } from "../constant";
import { useTranslation } from "../hooks/useTranslation";

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
  const toast = useToast();
  const [isClickCancel, setIsClickCancel] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasReceipFile = !isNil(receiptFile);
  const { translations } = useTranslation(
    "SignUp",
    "email",
    "IDCard",
    "password",
    "newsletter",
    "forgetpass",
    "registerWarning",
    "accept",
    "NoteFee",
    "NoteFee1",
    "NoteFee2",
    "accountName",
    "accountNo",
    "Confirm",
    "Cancel",
    "paymentFee",
    "clickappointmentcanceled",
    "clickpleaseUploadPayment",
    "clickconfirm"
  );
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

  const submitHandler = async (): Promise<IReturnID> => {
    const { data } = await axios.post(url + "/register", submitData);
    return data;
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
        const id: IReturnID = await submitHandler(); //.patient_id
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
          patient_id: id.patient_id,
          payFor: "register",
          payMethod: "scan",
          imgPath: data.path,
        };
        axios.post(url + "/payment", paymentData);
        onOpen();
      }
    } catch (error) {
      console.error("onSubmitImageandDataHandler", error);
      setstepRegister(stepRegister - 1);
      setConsentFormAgreement(false);
      setReceiptFile(undefined);
      toast({
        status: "error",
        title: "Please Check your IDCARD OR Email before submit",
      });
    }
  };

  const getModalIcon = () => {
    if (!hasReceipFile && !isClickCancel) return "/images/icons/warning.png";
    if (isClickCancel) return "/images/icons/remove.png";
    return "/images/icons/time-left.png";
  };

  const getModalText = () => {
    if (!hasReceipFile && !isClickCancel)
      return translations.clickpleaseUploadPayment;

    if (isClickCancel) return translations.clickappointmentcanceled;

    return translations.clickconfirm;
  };

  const handleUploadFile = (files: File[]) => {
    if (isEmpty(files)) return;

    setReceiptFile(first(files));
  };
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
    } else {
      toast({
        status: "warning",
        title: "Please accept the consent form agreement before next page",
      });
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
            {translations.SignUp}
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column" gridRowGap="15px">
              <Box>
                <HeartInput
                  placeholder={translations.IDCard}
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
                  placeholder={translations.email}
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
                  placeholder={translations.password}
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
                {translations.registerWarning}
              </Heading>
              <Flex flexDirection="column" px="10px">
                <Checkbox
                  onChange={consentFormAgreementOnChangeHandler}
                  colorScheme="#F6F6F6"
                  iconColor="black"
                  isInvalid={!consentFormAgreement}
                >
                  {translations.accept}
                </Checkbox>
                <Checkbox
                  onChange={newsReceivingAgreementOnChangeHandler}
                  colorScheme="#F6F6F6"
                  iconColor="black"
                >
                  {translations.newsletter}
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
                  {translations.SignUp}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      ) : (
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
              {translations.paymentFee}
            </Heading>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box w="50%">
                <Image
                  mx="auto"
                  alt="Hearts"
                  src="/images/payment/QRcode.png"
                />
              </Box>
              <Box
                w="50%"
                lineHeight={"9"}
                fontSize={{ base: "17px", xl: "17px" }}
              >
                <Box>
                  <b>{translations.accountName}:</b> HealthcaRe Tele-delivery
                  Service
                </Box>
                <Box>
                  ธนาคารไทยพาณิชย์ จำกัด (มหาชน) SIAM COMMERCIAL BANK PUBLIC
                  COMPANY LIMITED 0333 สาขามหาวิทยาลัยมหิตล
                </Box>
                <Box>{translations.accountNo} 333-294813-4</Box>
              </Box>
            </Flex>
            <HeartsDropzone onUploadFile={handleUploadFile} />
            {!isNil(receiptFile) && (
              <li>
                {receiptFile.name} - {receiptFile.size} byte
              </li>
            )}
            <Heading as="h3" size="sm" fontWeight="medium" color="red">
              {translations.NoteFee} <br />- {translations.NoteFee1}
              <br />- {translations.NoteFee2}
            </Heading>
            <Button
              mt="1rem"
              bg="ButtonColor"
              borderRadius="35px"
              color="white"
              py="30px"
              fontSize="1.4rem"
              width={{ base: "80%", lg: "60%", xl: "50%" }}
              mx={"auto"}
              onClick={onSubmitImageandDataHandler}
            >
              {translations.Confirm}
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
              {translations.Cancel}
            </Heading>
          </Flex>
        </Box>
      )}
    </HeartsLayouts>
  );
};

export default SignUp;
