import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import Script from "next/script";
import HeartsContainer from "../common/HeartsContainer";
import { useEffect } from "react";

export const HeartsOmise = () => {
  const { translations } = useTranslation("Overview", "TopicOverview");
  const router = useRouter();
  useEffect(() => {
    const { OmiseCard } = window;
    if (OmiseCard) {
      OmiseCard.configure({
        publicKey: "pkey_test_5r29aj193h3y39fjss6",
      });

      OmiseCard.configureButton("#checkout-button", {
        amount: 3000,
        currency: "USD",
        buttonLabel: "Pay 30 USD",
      });

      OmiseCard.configureButton("#checkout-button-alt", {
        amount: 100000,
        currency: "THB",
        buttonLabel: "Pay 1000 THB",
      });
    }
  });
  const handler = () => {
    const button = document.querySelector("#checkoutButton");
    const form = document.querySelector("#checkoutForm");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      OmiseCard.open({
        amount: 12345,
        currency: "THB",
        defaultPaymentMethod: "credit_card",
        onCreateTokenSuccess: (nonce) => {
          if (nonce.startsWith("tokn_")) {
            form.omiseToken.value = nonce;
          } else {
            form.omiseSource.value = nonce;
          }
          form.submit();
        },
      });
    });
  };
  return (
    <>
      <Box bg="PrimaryColor.bg" mt="4rem" pb="5rem">
        <form id="checkoutForm" method="POST" action="/charge">
          <input type="hidden" name="omiseToken" />
          <input type="hidden" name="omiseSource" />
          <button
            type="submit"
            onClick={() => {
              handler();
            }}
            id="checkoutButton"
          >
            Checkout
          </button>
        </form>
      </Box>
      <Script type="text/javascript" src="https://cdn.omise.co/omise.js" />
    </>
  );
};
