import { Box, Button, Flex, Heading, Image, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { useTranslation } from "../hooks/useTranslation";
import { HeartsLayouts } from "../layouts/layout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { headers, url } from "../constant";
import { useRouter } from "next/router";
interface IPatient {
  username: string;
  hn: string;
}
const Profile: NextPage = () => {
  const router = useRouter();
  const { translations } = useTranslation(
    "Profile",
    "hn",
    "patientName",
    "email",
    "MyAppointment"
  );
  const toast = useToast();
  const [patientInfo, setPatientInfo] = useState<IPatient>();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.post(
          `${url}/users/profile`,
          {
            patient_id: Cookies.get("patient_id"),
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPatientInfo(data);
      } catch (error) {
        toast({ status: "error", title: "Please Try Again Later" });
      }
    };

    fetchAPI();
  }, []);
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center" my="5">
          {translations.Profile}
        </Heading>
        <Flex flexWrap={"wrap"} justifyContent={"center"}>
          <Box>
            <Box w={"15rem"}>
              <Image
                w={"100%"}
                borderRadius="50%"
                src="/images/profile/user-avatar.png"
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                alt=""
              />
            </Box>
          </Box>
          <Box pt="3rem" pl="2rem" fontSize={"20px"}>
            <Box>
              {translations.patientName}: {Cookies.get("name")}
            </Box>
            <Box mt="10px">
              {translations.hn}: {patientInfo?.hn}
            </Box>
            <Box mt="10px">
              {translations.email}: {patientInfo?.username}
            </Box>
            <Button
              my={"4"}
              size="lg"
              borderRadius="30px"
              bg="SecondaryColor"
              color="white"
              boxShadow="xl"
              onClick={() => {
                router.push("/my-appointment");
              }}
            >
              {translations.MyAppointment}
            </Button>
          </Box>
        </Flex>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Profile;
