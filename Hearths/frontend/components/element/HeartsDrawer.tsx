import { UseDisclosureProps } from "@chakra-ui/hooks";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Link,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
export const HearthsDrawer = (props: UseDisclosureProps) => {
  const { isOpen, onClose } = props;
  const { translations } = useTranslation(
    "Home",
    "Service",
    "AboutUs",
    "Contact",
    "Appointment"
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
          <Box my="4" pb="2" borderBottom="1px solid #dadce0">
            <Link href="/appointment">{translations.Appointment}</Link>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
