import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { headers, url } from "../../../constant";
interface IPatientInfo {
  username: string;
  hn: string;
  photo: string | null;
  patientPrefix: string | null;
  patientPrefix_Rang: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  patientPrefixEng: string | null;
  patientPrefix_RangEng: string | null;
  patientFirstNameEng: string | null;
  patientMiddleNameEng: string | null;
  patientLastNameEng: string | null;
}

export const UsersSearch: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [patientList, setStatePatientList] = useState<IPatientInfo[]>([]);
  const [tempPatientList, setStateTempPatientList] = useState<IPatientInfo[]>(
    []
  );
  const header = ["Name-Surname", "Hn", "username"];

  const [name, setName] = useState<string>("");
  const [hn, setHn] = useState<string>("");

  const getname = (patient: IPatientInfo) => {
    return `${patient.patientPrefixEng}${patient.patientFirstNameEng} ${patient.patientLastNameEng}`;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleHNChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHn(event.target.value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await axios.get(`${url}/search/patient`, headers);
      setStatePatientList(data);
      setStateTempPatientList(data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (name !== "") {
      const temp = patientList.filter((ele) => {
        return ele.patientFirstNameEng
          ?.toLowerCase()
          ?.includes(name.toLowerCase());
      });
      if (hn !== "") {
        const result = temp.filter((ele) => {
          return ele.hn === hn;
        });
        setStateTempPatientList(result);
      } else {
        setStateTempPatientList(temp);
      }
    } else {
      setStateTempPatientList(patientList);
    }
  }, [hn, name]);
  return (
    <Box overflow={"auto"}>
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          Search Patient
        </Heading>
      </Flex>
      <Flex>
        <Box w="25rem">
          <InputGroup ml="15px">
            <InputLeftAddon>Name:</InputLeftAddon>
            <Input onChange={handleNameChange} placeholder="Name" />
          </InputGroup>
        </Box>
        <Box w="25rem" ml="30px">
          <InputGroup>
            <InputLeftAddon>HN:</InputLeftAddon>
            <Input onChange={handleHNChange} placeholder="x-xx-xxxxx" />
          </InputGroup>
        </Box>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            {header.map((ele, index) => (
              <Th key={`number-${index}`}>{ele}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tempPatientList.map((ele, index) => {
            return (
              <Tr key={`${index}$-key`}>
                <Td w="40%">
                  <Flex alignItems={"center"}>
                    <Box w={"2rem"}>
                      <Image
                        w={"100%"}
                        borderRadius="50%"
                        src="/images/profile/user-avatar.png"
                        boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                        alt=""
                      />
                    </Box>
                    <Box ml="5">{getname(ele)}</Box>
                  </Flex>
                </Td>
                <Td>{ele.hn}</Td>
                <Td>{ele.username}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
