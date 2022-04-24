import { UseDisclosureProps } from "@chakra-ui/hooks";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Box,
  Avatar,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppStore } from "../../store";
import { signout } from "../../utils/helper";
export const HearthsDrawer = (props: UseDisclosureProps) => {
  const router = useRouter();
  const { isOpen, onClose } = props;
  const { isAuthenticated } = useAppStore("isAuthenticated");
  const { translations } = useTranslation(
    "Home",
    "Service",
    "AboutUs",
    "Contact",
    "Appointment",
    "MyAppointment",
    "SignOut"
  );
  return (
    <Drawer
      isOpen={isOpen as boolean}
      placement="right"
      onClose={onClose as () => void}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>

        <DrawerBody fontSize="1.5rem">
          <Box my="4" pb="2" borderBottom="1px solid #dadce0">
            <Link href="/">{translations.Home}</Link>
          </Box>
          <Box my="4" pb="2" borderBottom="1px solid #dadce0">
            <Link href="/#services">{translations.Service}</Link>
          </Box>
          <Box my="4" pb="2" borderBottom="1px solid #dadce0">
            <Link href="/#aboutus">{translations.AboutUs}</Link>
          </Box>
          <Box my="4" pb="2" borderBottom="1px solid #dadce0">
            <Link href="/#contactus">{translations.Contact}</Link>
          </Box>
          {isAuthenticated && (
            <>
              <Box my="4" pb="2" borderBottom="1px solid #dadce0">
                <Link href="/appointment">{translations.Appointment}</Link>
              </Box>
              <Box my="4" pb="2" borderBottom="1px solid #dadce0">
                <Link href="/my-appointment">{translations.MyAppointment}</Link>
              </Box>
            </>
          )}
        </DrawerBody>
        {isAuthenticated && (
          <DrawerFooter d="flex" justifyContent={"space-between"} px="2">
            <Box
              w="50%"
              d="flex"
              alignItems={"center"}
              onClick={() => {
                router.push("/profile");
              }}
            >
              <Box pr="2">
                <Avatar
                  name="Dan Abrahmov"
                  src="/images/profile/user-avatar.png"
                />
              </Box>
              <Box fontSize={"1.2rem"}>{Cookies.get("name")}</Box>
            </Box>
            <Box
              w="50%"
              textAlign={"end"}
              onClick={() => {
                signout();
                router.reload();
              }}
            >
              {translations.SignOut}
            </Box>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
