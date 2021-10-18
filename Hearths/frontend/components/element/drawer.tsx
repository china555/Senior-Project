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
import { useTranslation } from "next-i18next";
import { useRef } from "react";
export const DrawerHearths = (props: UseDisclosureProps) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
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

        <DrawerBody>
          <Box>
            <Link>{t("Home")}</Link>
          </Box>
          <Box>
            <Link>{t("Service")}</Link>
          </Box>
          <Box>
            <Link>{t("About_us")}</Link>
          </Box>
          <Box>
            <Link>{t("Contact")}</Link>
          </Box>
          <Box>
            <Link>{t("Appointment")}</Link>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
