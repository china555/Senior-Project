import { Box, Image, Link, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import HeartsContainer from "../common/HeartsContainer";
import { useSize } from "../../hooks/index";
import { HearthsDrawer } from "./HeartsDrawer";
import { useDisclosure } from "@chakra-ui/hooks";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "next/router";
import { useAppStore } from "../../store";

export const HeartsNavbar = () => {
  const { translations } = useTranslation(
    "Home",
    "Service",
    "AboutUs",
    "Contact",
    "Appointment"
  );
  const { isAuthenticated } = useAppStore("isAuthenticated");
  const { width } = useSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <Box position="sticky" top="0" bg="white" zIndex="10" mb="5">
      <HearthsDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <HeartsContainer>
        <Box display="flex" w="100%">
          <Box w={{ base: "20%", xl: "40%" }}>
            <Image
              cursor="pointer"
              onClick={() => {
                router.push("/");
              }}
              w={["60%", "5rem", "5rem"]}
              alt="Hearts"
              src="/images/logo/logo tpt.png"
            />
          </Box>
          {width > 1024 ? (
            <Box
              w="60%"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              fontWeight="bold"
            >
              <Link
                onClick={() => {
                  router.push("/");
                }}
              >
                {translations.Home}
              </Link>
              <Link
                onClick={() => {
                  router.push("/#services");
                }}
              >
                {translations.Service}
              </Link>
              <Link
                onClick={() => {
                  router.push("/#aboutus");
                }}
              >
                {translations.AboutUs}
              </Link>
              <Link
                onClick={() => {
                  router.push("/#contactus");
                }}
              >
                {translations.Contact}
              </Link>
              <Link href={isAuthenticated ? "/appointment" : "/sign-in"}>
                <Button borderRadius="20" color="white" bg="SecondaryColor">
                  {translations.Appointment}
                </Button>
              </Link>
            </Box>
          ) : (
            <Box
              alignSelf="center"
              w="80%"
              px="5"
              textAlign="right"
              onClick={onOpen}
            >
              <HamburgerIcon w={10} h={10} color="gray.500" cursor="pointer" />
            </Box>
          )}
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartsNavbar.displayName = "HeartsNavbar";
