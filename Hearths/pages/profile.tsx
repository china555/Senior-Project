import { Box, Flex, Heading, Image, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { useTranslation } from "../hooks/useTranslation";
import { HeartsLayouts } from "../layouts/layout";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../constant";

interface IPatient {
  username: string;
  hn: string;
}
const Profile: NextPage = () => {
  const { translations } = useTranslation("Question");
  const toast = useToast();
  const [patientInfo, setPatientInfo] = useState<IPatient>();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data } = await axios.post(`${url}/users/profile`, {
          patient_id: Cookies.get("patient_id"),
        });
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
          Profile
        </Heading>
        <Flex justifyContent={"center"}>
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
          <Box>
            <Box>Name: {Cookies.get("name")}</Box>
            <Box mt="5px">HN: {patientInfo?.hn}</Box>
            <Box mt="5px">Email: {patientInfo?.username}</Box>
          </Box>
        </Flex>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default Profile;
