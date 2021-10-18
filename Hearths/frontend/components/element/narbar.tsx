import { Box, Image, Link, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import HeartsContainer from "../common/HeartsContainer";
import { useTranslation } from "next-i18next";
import { useSize } from "../../hooks/index";
import { DrawerHearths } from "./drawer";
import { useDisclosure } from "@chakra-ui/hooks";
export const HeartsNavbar = () => {
  const { t } = useTranslation();
  const { width } = useSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <DrawerHearths isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <HeartsContainer>
        <Box display="flex" w="100%">
          <Box w={{ base: "20%", xl: "40%" }}>
            <Image
              w={["60%", "5rem", "5rem"]}
              alt="sorry"
              src="/images/logo/hearts_logo.png"
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
              <Link>{t("Home")}</Link>
              <Link>{t("Service")}</Link>
              <Link>{t("About_us")}</Link>
              <Link>{t("Contact")}</Link>
              <Link>
                <Button borderRadius="20" color="white" bg="SecondaryColor">
                  {t("Appointment")}
                </Button>
              </Link>
            </Box>
          ) : (
            <Box w="80%" px="5" textAlign="right" onClick={onOpen}>
              <HamburgerIcon w={10} h={10} color="gray.500" cursor="pointer" />
            </Box>
          )}
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartsNavbar.displayName = "HeartsNavbar";
