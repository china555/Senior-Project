import {
  Box,
  Divider,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import HeartsContainer from "../common/HeartsContainer";
import { Link } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import { useAppStore } from "../../store";
import { signout } from "../../utils/helper";
import { useSize } from "../../hooks/index";
import router from "next/router";
import Cookies from "js-cookie";
export const HeartsTopMenu = () => {
  const { translations, changeLocale } = useTranslation(
    "test",
    "SignUp",
    "SignIn",
    "SignOut",
    "Profile"
  );
  const { isAuthenticated } = useAppStore("isAuthenticated");
  const { width } = useSize();

  return (
    <Box bg="PrimaryColor.900" color="white" fontWeight="medium">
      <HeartsContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          py="2"
          position={"relative"}
          zIndex="100"
        >
          <Box display="flex">
            <Box
              cursor="pointer"
              onClick={() => {
                changeLocale("en");
              }}
            >
              Eng
            </Box>
            <Box px="2">
              <Divider orientation="vertical" />
            </Box>
            <Box
              cursor="pointer"
              onClick={() => {
                changeLocale("th");
              }}
            >
              ไทย
            </Box>
          </Box>
          <Box display="flex">
            {!isAuthenticated && (
              <>
                <Link href="/sign-up">{translations.SignUp}</Link>
                <Box px="2">
                  <Divider orientation="vertical" />
                </Box>
                <Link href="/sign-in">{translations.SignIn}</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                {width > 1024 ? (
                  <Box position={"relative"}>
                    <Menu isLazy>
                      <MenuButton>{Cookies.get("name")}</MenuButton>
                      <MenuList color={"black"}>
                        <MenuItem
                          onClick={() => {
                            router.push("/profile");
                          }}
                        >
                          {translations.Profile}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            signout();
                            router.reload();
                          }}
                        >
                          {translations.SignOut}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </HeartsContainer>
    </Box>
  );
};

HeartsTopMenu.displayName = "HeartsTopMenu";
