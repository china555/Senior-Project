import { Button, Flex, Heading, Box, Link, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartsLayouts } from "../../layouts/layout";
import { useRouter } from "next/router";
import HeartsContainer from "../../components/common/HeartsContainer";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

const PhysioTherapist: NextPage = () => {
  const { translations } = useTranslation("DepartMentName");
  const [selectedDepartMent, setselectedDepartMent] = useState("All");
  const onchangeHandler = (event: any) => {
    setselectedDepartMent(event.target.value);
  };

  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Box mt="5" w={{ base: "70%", xl: "50%" }} mx="auto">
          <Select
            placeholder="Select option"
            onChange={onchangeHandler}
            value={selectedDepartMent}
          >
            <option value={translations.DepartMentName.OccupationalTherapy}>
              {translations.DepartMentName.OccupationalTherapy}
            </option>
            <option value={translations.DepartMentName.MusculoSkeletalSystem}>
              {translations.DepartMentName.MusculoSkeletalSystem}
            </option>
            <option value={translations.DepartMentName.NeurologicalSystem}>
              {translations.DepartMentName.NeurologicalSystem}
            </option>
            <option value={translations.DepartMentName.Pediatric}>
              {translations.DepartMentName.Pediatric}
            </option>
            <option value={translations.DepartMentName.Scoliosis}>
              {translations.DepartMentName.Scoliosis}
            </option>
            <option value={translations.DepartMentName.WomenHealth}>
              {translations.DepartMentName.WomenHealth}
            </option>
            <option value={translations.DepartMentName.Community}>
              {translations.DepartMentName.Community}
            </option>
          </Select>
        </Box>
      </HeartsContainer>
    </HeartsLayouts>
  );
};
export default PhysioTherapist;
