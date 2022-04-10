import {
  Button,
  Flex,
  Heading,
  Box,
  Divider,
  Image,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UsersAppointmentManagement } from "../../components/element/users/appointment";
import { useEffect, useState } from "react";
import { UsersRegisterManagement } from "../../components/element/users/register";
import { UsersAppointment } from "../../components/element/users/my-appointment";
import { useAppStore } from "../../store";
import { signout } from "../../utils/helper";

const Dashboard = () => {
  const sideBarName = [
    { name: "Appointment Management", key: "Appointment" },
    { name: "Register Management", key: "Register" },
    { name: "My Appointment", key: "MyAppointment" },
  ];
  const { isAuthenticated } = useAppStore("isAuthenticated");
  const [selectedTab, setSelectedTab] = useState("Appointment");
  const selectedTabHandler = async (selected: string): Promise<void> => {
    console.log(selected);
    setSelectedTab(selected);
  };
  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   if (!isAuthenticated) {
  //     console.log("dd");
  //     router.push("/users/login");
  //   }
  // }, []);

  const router = useRouter();
  return (
    <Box>
      {!isAuthenticated ? (
        <Box></Box>
      ) : (
        <Flex>
          {/* left side */}
          <Box
            position={"fixed"}
            w="260px"
            h="100%"
            boxSizing="border-box"
            pt="1.5rem"
            pl="1.5rem"
            bgColor={"white"}
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            borderRight="rgba(149, 157, 165, 0.2) 1px solid"
          >
            <Flex alignItems={"center"}>
              <Box w={{ base: "10%", xl: "10%" }}>
                <Image
                  cursor="pointer"
                  onClick={() => {
                    router.push("/");
                  }}
                  w={["60%", "5rem", "5rem"]}
                  alt="Hearts"
                  src="/images/logo/hearts_logo.png"
                />
              </Box>
              <Box>TPT ADMIN</Box>
            </Flex>
            {sideBarName.map((sideBarElement) => {
              return (
                <Box key={sideBarElement.key} _hover={{ cursor: "pointer" }}>
                  <Box
                    py="1.5rem"
                    onClick={() => selectedTabHandler(sideBarElement.key)}
                  >
                    {sideBarElement.name}
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </Box>
          {/* right side */}
          <Box
            ml={"260px"}
            w="calc(100vw  - 260px)"
            boxSizing="border-box"
            float="right"
            overflow="auto"
            position="relative"
            max-height="100%"
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          >
            {selectedTab === "Appointment" ? (
              <UsersAppointmentManagement />
            ) : selectedTab === "Register" ? (
              <UsersRegisterManagement />
            ) : selectedTab === "MyAppointment" ? (
              <UsersAppointment />
            ) : (
              <Box></Box>
            )}
          </Box>
          <Link
            position={"absolute"}
            zIndex="5"
            right={10}
            top={3}
            onClick={() => {
              signout();
              router.push("/users/login");
            }}
          >
            Sign out
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default Dashboard;
