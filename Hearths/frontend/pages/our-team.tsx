import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../components/common/HeartsContainer";
import { HeartsLayouts } from "../layouts/layout";
import { Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";
interface IDepartment {
  name: string;
  img: string;
  alt: string;
  clickhandler: () => void;
}
const OurTeam: NextPage = () => {
  const router = useRouter();
  const { translations } = useTranslation("DepartMentName");
  const department: IDepartment[] = [
    {
      name: translations.DepartMentName.OccupationalTherapy,
      img: "/images/our-team/Logo/OT.jpg",
      alt: "Occupational Therapy",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.MusculoSkeletalSystem,
      img: "/images/our-team/Logo/OT.jpg",
      alt: "Physical Therapy: Musculoskeletal system",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.NeurologicalSystem,
      img: "/images/our-team/Logo/Neuro.jpg",
      alt: "Physical Therapy: Neurological system",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.Pediatric,
      img: "/images/our-team/Logo/Pediatric.jpg",
      alt: "Physical Therapy: Pediatric",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.Scoliosis,
      img: "/images/our-team/Logo/Scoliosis.jpg",
      alt: "Physical Therapy: Scoliosis",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.WomenHealth,
      img: "/images/our-team/Logo/Women.jpg",
      alt: "Physical Therapy: Women health",
      clickhandler: () => {
        router.push("/");
      },
    },
    {
      name: translations.DepartMentName.Community,
      img: "/images/our-team/Logo/Women.jpg",
      alt: "Physical Therapy: Community",
      clickhandler: () => {
        router.push("/");
      },
    },
  ];
  return (
    <HeartsLayouts>
      <HeartsContainer>
        <Heading color="#046483" as="h1" textAlign="center">
          Our Team
        </Heading>
        <Box
          mt="2rem"
          textAlign="center"
          mx="auto"
          w={{ base: "100%", xl: "50%" }}
          h={{ base: "320px", xl: "400px" }}
        >
          <iframe
            src="https://drive.google.com/file/d/1hWJ-3clKQ2NgZz0emJuyKF5vUdZN2HaN/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
          />
        </Box>
        <Grid
          my="2rem"
          templateColumns={{ base: "100%", xl: "50% 50%" }}
          gap="50px 30px"
          justifyContent="center"
        >
          {department.map((department) => {
            return (
              <Box
                w="70%"
                textAlign="center"
                mx="auto"
                bg="#F6F8F8"
                p="20px"
                key={department.name}
                onClick={department.clickhandler}
              >
                <Heading as="h4" textAlign="center" size="lg">
                  {department.name}
                </Heading>
                <Box w="70%" mx="auto" mt="5">
                  <Image w="100%" alt={department.alt} src={department.img} />
                </Box>
              </Box>
            );
          })}
        </Grid>
      </HeartsContainer>
    </HeartsLayouts>
  );
};

export default OurTeam;
