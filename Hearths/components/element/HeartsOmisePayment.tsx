import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import Script from "next/script";
import HeartsContainer from "../common/HeartsContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { headers, url } from "../../constant";
import Cookies from "js-cookie";

export const HeartsOmise = (props: any) => {
  let OmiseCard: any;
  const toast = useToast();
  const { translations } = useTranslation("payByCredit");
  const router = useRouter();
  const [charge, setCharge] = useState(undefined);
  const handlerLoadScript = () => {
    // @ts-ignore
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5r29aj0uv8n10iisgvt",
      currency: "thb",
      frameLabel: "Hearts",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with omise",
    });
  };

  const submitHandler = async (paymentId: number): Promise<string> => {
    const submitData = {
      appointmentDateTime: `${props.selectedDate.getFullYear()}-${
        props.selectedDate.getMonth() + 1
      }-${props.selectedDate.getDate()} ${props.selectedTime?.start}`,
      patientId: Number(Cookies.get("patient_id")),
      event_id: props.selectedTime?.event_id,
      payment_id: paymentId,
    };
    const { data } = await axios.post(
      url + "/create/appointment",
      submitData,
      headers
    );
    return data;
  };
  const appointmentApi = async () => {
    const paymentData = {
      patient_id: Number(Cookies.get("patient_id")),
      payFor: "appointment",
      payMethod: "Credit Card",
      imgPath: "public\\data\\uploads\\1649607022795-Payslip03.png",
    };
    const paymentInfo = await axios.post(url + "/payment", paymentData);
    const message: Promise<string> = submitHandler(
      paymentInfo.data.paymentInfo.payment_id
    );
  };
  const createCreditCardCharge = async (
    email: string,
    name: string,
    amount: number,
    token: string
  ) => {
    try {
      const { data } = await axios.post(`${url}/creditcard`, {
        description: name,
        email: email,
        token: token,
        amount: amount,
      });
      setCharge(data);
      appointmentApi();
      toast({
        status: "success",
        title: `The tranctions is ${data.status} Thank you for${
          data.amount / 100
        } baht`,
      });
      router.push("/");
    } catch (error) {
      toast({ status: "error", title: "Please Try again later" });
    }
  };
  const creditcardConfigure = () => {
    // @ts-ignore
    OmiseCard = window.OmiseCard;
    // @ts-ignore
    OmiseCard.open({
      amount: 50000,
      currency: "THB",
      defaultPaymentMethod: "credit_card",
      // @ts-ignore
      onCreateTokenSuccess: (token) => {
        createCreditCardCharge(
          "t@gamil.com",
          Cookies.get("name") as string,
          50000,
          token as string
        );
      },
    });
    OmiseCard.configureButton("#credit");
    OmiseCard.attach();
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    creditcardConfigure();
  };
  return (
    <>
      <Script
        type="text/javascript"
        src="https://cdn.omise.co/omise.js"
        onLoad={handlerLoadScript}
      ></Script>
      <Box w={{ base: "70%", xl: "50%" }}>
        <form>
          <Button w="100%" type="button" id="credit" onClick={handleClick}>
            {translations.payByCredit}
          </Button>
        </form>
      </Box>
    </>
  );
};
