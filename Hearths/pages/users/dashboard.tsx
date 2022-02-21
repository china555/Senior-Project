import { NextPage } from "next";
import {
  Button,
  Flex,
  Heading,
  Box,
  Link,
  useToast,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UsersAppointmentManagement } from "../../components/element/appointment/management";

const Dashboard: NextPage = () => {
  const router = useRouter();
  return (
    <Box>
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
          <Box my="1.5rem">Appointment</Box>
          <Divider />
          <Box my="1.5rem">Payment</Box>
          <Divider />
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
          <Flex mt="1rem" ml="1rem">
            <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
              Appointment Confirmation
            </Heading>
          </Flex>
          <UsersAppointmentManagement />
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
