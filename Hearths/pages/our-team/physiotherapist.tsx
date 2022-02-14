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
import { IPhysiotherapist } from "../../store/locale/@types";

const PhysioTherapist: NextPage = () => {
  const { translations } = useTranslation("Physiotherapist", "DepartMentName");
  const [selectedDepartMent, setselectedDepartMent] = useState("10");
  const onchangeHandler = (event: any) => {
    setselectedDepartMent(event.target.value);
  };
  type Department = {
    name: string;
    staff: IPhysiotherapist[];
  };
  const departmentofPhysiotherapist: Department[] = [
    {
      name: translations.DepartMentName.OccupationalTherapy,
      staff: translations.Physiotherapist.PhysiotherapistOT,
    },
    {
      name: translations.DepartMentName.MusculoSkeletalSystem,
      staff: translations.Physiotherapist.PhysiotherapistMS,
    },
    {
      name: translations.DepartMentName.NeurologicalSystem,
      staff: translations.Physiotherapist.PhysiotherapistNS,
    },
    {
      name: translations.DepartMentName.Pediatric,
      staff: translations.Physiotherapist.PhysiotherapistPediatric,
    },
    {
      name: translations.DepartMentName.Scoliosis,
      staff: translations.Physiotherapist.PhysiotherapistScoliosis,
    },
    {
      name: translations.DepartMentName.WomenHealth,
      staff: translations.Physiotherapist.PhysiotherapistWomen,
    },
    {
      name: translations.DepartMentName.Community,
      staff: translations.Physiotherapist.PhysiotherapistCommunity,
    },
  ];

  const [department, setDepartMent] = useState<Department[]>(
    Object.values(departmentofPhysiotherapist)
  );

  useEffect(() => {
    if (selectedDepartMent === "10") {
      setDepartMent(Object.values(departmentofPhysiotherapist));
    } else {
      setDepartMent([departmentofPhysiotherapist[Number(selectedDepartMent)]]);
    }
  }, [selectedDepartMent]);

  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Image
          mt="5"
          w="100%"
          src="/images/our-team/our-team.jpg"
          alt="our-team"
        />

        <Box mt="5" w={{ base: "70%", xl: "50%" }} mx="auto">
          <Heading color="#046483" as="h1" textAlign="center" mb="2">
            Our Team
          </Heading>
          <Select onChange={onchangeHandler} value={selectedDepartMent}>
            <option value={10}>All</option>
            <option value={0}>
              {translations.DepartMentName.OccupationalTherapy}
            </option>
            <option value={1}>
              {translations.DepartMentName.MusculoSkeletalSystem}
            </option>
            <option value={2}>
              {translations.DepartMentName.NeurologicalSystem}
            </option>
            <option value={3}>{translations.DepartMentName.Pediatric}</option>
            <option value={4}>{translations.DepartMentName.Scoliosis}</option>
            <option value={5}>{translations.DepartMentName.WomenHealth}</option>
            <option value={6}>{translations.DepartMentName.Community}</option>
          </Select>
        </Box>
        {department.map((d: Department) => (
          <Box id={d.name.split(" ")[0]} key={d.name}>
            <Box pt="100.61px">
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
                {d.staff.map((staffName: IPhysiotherapist) => (
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
                          <ListItem key={`${staffName.name}-${i}`}>
                            {sp}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </HeartsContainer>
    </HeartsLayouts>
  );
};
export default PhysioTherapist;
