import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../constant";
interface IRegisterPending {
  hn: string;
  receipt_image_path: string;
  pay_method: string;
  patientPrefix: string;
  patientPrefix_Rang: string;
  patientFirstName: string;
  patientLastName: string;
  patientPrefixEng: string;
  patientPrefix_RangEng: string;
  patientFirstNameEng: string;
  patientMiddleNameEng: string;
  patientLastNameEng: string;
}

interface submitConfirmationRegisterData {
  hn: string;
  registerStatus: "CONFIRMED" | "REJECTED";
}

export const UsersRegisterManagement = () => {
  const toast = useToast();
  const { translations } = useTranslation("DepartMentName");
  const [pending, setStatePending] = useState<IRegisterPending[]>([]);
  const header = [
    "HN",
    "Patient Full Name",
    "Payment Method",
    "Receipt",
    "Status",
  ];

  const getname = (patient: IRegisterPending) => {
    let name = "";
    if (
      patient.patientPrefix_Rang === null &&
      patient.patientPrefix_RangEng === null
    ) {
      if (patient.patientPrefix === null) {
        name = name + patient.patientPrefixEng;
      } else {
        name = name + patient.patientPrefix;
      }
    } else {
      if (patient.patientPrefix_Rang === null) {
        name = name + patient.patientPrefix_RangEng;
      } else {
        name = name + patient.patientPrefix_Rang;
      }
    }
    if (patient.patientFirstName === null) {
      name =
        name +
        `${patient.patientFirstNameEng} ${patient.patientMiddleNameEng} ${patient.patientLastNameEng}`;
    } else {
      name = name + `${patient.patientFirstName} ${patient.patientLastName}`;
    }
    return name;
  };

  const fetchAPI = async () => {
    const { data } = await axios.get(`${url}/users/confirmation/patient`);
    console.log(data);
    setStatePending(data);
  };

  const onClickHandler = async (submitData: submitConfirmationRegisterData) => {
    try {
      const { data } = await axios.post(
        `${url}/users/confirmation/patient`,
        submitData
      );
      const tempPending = pending.filter(
        (appoint) => appoint.hn !== submitData.hn
      );
      toast({ status: "success", title: data.msg });
      setStatePending(tempPending);
    } catch (error) {
      console.error("Confirmation Management", error);
      toast({ status: "error", title: "Registration Confirmation failed" });
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <Box overflow={"auto"}>
      <Flex mt="1rem" ml="1rem">
        <Heading size={"md"} as="h3" textAlign="center" mb="2rem">
          Registration Confirmation
        </Heading>
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
          {pending.map((ele, index) => {
            return (
              <Tr key={ele.hn}>
                <Td>{ele.hn}</Td>
                <Td>{<Box>{getname(ele)}</Box>}</Td>
                <Td>{ele.pay_method}</Td>
                <Td>
                  <a
                    href={`${url}/${ele.receipt_image_path}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </Td>
                <Td>
                  <Flex justifyContent={"space-evenly"}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        onClickHandler({
                          hn: ele.hn,
                          registerStatus: "CONFIRMED",
                        });
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onClickHandler({
                          hn: ele.hn,
                          registerStatus: "REJECTED",
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
