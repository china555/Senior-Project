import {
  Box,
  Select,
  Divider,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartsLayouts } from "../../layouts/layout";
import HeartsContainer from "../../components/common/HeartsContainer";
import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";

const PhysioTherapist: NextPage = () => {
  const { translations } = useTranslation("Physiotherapist", "DepartMentName");
  const [selectedDepartMent, setselectedDepartMent] = useState("All");
  const onchangeHandler = (event: any) => {
    setselectedDepartMent(event.target.value);
  };

  const departmentofPhysiotherapist = {
    OT: {
      name: translations.DepartMentName.OccupationalTherapy,
      staff: translations.Physiotherapist.PhysiotherapistOT,
    },
    MS: {
      name: translations.DepartMentName.MusculoSkeletalSystem,
      staff: translations.Physiotherapist.PhysiotherapistMS,
    },
    NS: {
      name: translations.DepartMentName.NeurologicalSystem,
      staff: translations.Physiotherapist.PhysiotherapistNS,
    },
    P: {
      name: translations.DepartMentName.Pediatric,
      staff: translations.Physiotherapist.PhysiotherapistPediatric,
    },
    S: {
      name: translations.DepartMentName.Scoliosis,
      staff: translations.Physiotherapist.PhysiotherapistScoliosis,
    },
    WH: {
      name: translations.DepartMentName.WomenHealth,
      staff: translations.Physiotherapist.PhysiotherapistWomen,
    },
    C: {
      name: translations.DepartMentName.Community,
      staff: translations.Physiotherapist.PhysiotherapistCommunity,
    },
  };

  const [department, setDepartMent] = useState<any>(
    Object.values(departmentofPhysiotherapist)
  );

  useEffect(() => {
    if (selectedDepartMent === "All") {
      setDepartMent(Object.values(departmentofPhysiotherapist));
    } else {
      setDepartMent([departmentofPhysiotherapist[selectedDepartMent]]);
    }

    // setDepartMent(temp);
    // console.log(department);
  }, [selectedDepartMent]);

  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Box mt="5" w={{ base: "70%", xl: "50%" }} mx="auto">
          <Heading color="#046483" as="h1" textAlign="center" mb="2">
            Our Team
          </Heading>
          <Select onChange={onchangeHandler} value={selectedDepartMent}>
            <option value="All">All</option>
            <option value="OT">
              {translations.DepartMentName.OccupationalTherapy}
            </option>
            <option value="MS">
              {translations.DepartMentName.MusculoSkeletalSystem}
            </option>
            <option value="NS">
              {translations.DepartMentName.NeurologicalSystem}
            </option>
            <option value="P">{translations.DepartMentName.Pediatric}</option>
            <option value="S">{translations.DepartMentName.Scoliosis}</option>
            <option value="WH">
              {translations.DepartMentName.WomenHealth}
            </option>
            <option value="C">{translations.DepartMentName.Community}</option>
          </Select>
        </Box>
        {department.map((d: any) => (
          <Box mt="4" key={d.name}>
            <Box
              fontSize={{ base: "26px", lg: "30px", xl: "30px" }}
              fontWeight="800"
            >
              {d.name}
              <Divider />
            </Box>
            <Box
              mt="4"
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {d.staff.map((staffName: any) => (
                <Box
                  key={staffName.name}
                  w={{ base: "100%", xl: "45%" }}
                  display="flex"
                  bg="#edf2f7"
                  borderRadius="20px"
                  p="3"
                  mb="5"
                >
                  <Box
                    w={{ base: "80px", lg: "100px", xl: "120px" }}
                    h={{ base: "80px", lg: "100px", xl: "120px" }}
                  >
                    <Image
                      borderRadius="100%"
                      w="100%"
                      h="100%"
                      objectPosition="80% 40%"
                      objectFit="cover"
                      src={staffName.img}
                      alt={staffName.name}
                    />
                  </Box>
                  <Box ml="4" w="80%" wordBreak="break-word">
                    <Text fontSize="20" fontWeight="bold">
                      {staffName.name}
                    </Text>
                    <UnorderedList>
                      {staffName.specialty.map((sp: any, i: number) => (
                        <ListItem key={`${staffName.name}-${i}`}>{sp}</ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </HeartsContainer>
    </HeartsLayouts>
  );
};
export default PhysioTherapist;
