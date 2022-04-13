import { Box, Heading, Text, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import HeartsContainer from "../../components/common/HeartsContainer";
import { HeartsLayouts } from "../../layouts/layout";
import { Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";
interface IDepartment {
  name: string;
  img: string;
  alt: string;
  clickhandler: () => void;
}
const OurTeam: NextPage = () => {
  const router = useRouter();
  const { translations } = useTranslation("DepartMentName", "OurDepartment");
  const department: IDepartment[] = [
    {
      name: translations.DepartMentName.OccupationalTherapy,
      img: "/images/our-team/Logo/OT.jpg",
      alt: "Occupational Therapy",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=0");
      },
    },
    {
      name: translations.DepartMentName.MusculoSkeletalSystem,
      img: "/images/our-team/Logo/Musculo.jpg",
      alt: "Physical Therapy: Musculoskeletal system",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=1");
      },
    },
    {
      name: translations.DepartMentName.NeurologicalSystem,
      img: "/images/our-team/Logo/Neuro.jpg",
      alt: "Physical Therapy: Neurological system",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=2");
      },
    },
    {
      name: translations.DepartMentName.Pediatric,
      img: "/images/our-team/Logo/Pediatric.jpg",
      alt: "Physical Therapy: Pediatric",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=3");
      },
    },
    {
      name: translations.DepartMentName.Scoliosis,
      img: "/images/our-team/Logo/Scoliosis.jpg",
      alt: "Physical Therapy: Scoliosis",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=4");
      },
    },
    {
      name: translations.DepartMentName.WomenHealth,
      img: "/images/our-team/Logo/Women.jpg",
      alt: "Physical Therapy: Women health",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=5");
      },
    },
    {
      name: translations.DepartMentName.Community,
      img: "/images/our-team/Logo/Community.jpg",
      alt: "Physical Therapy: Community",
      clickhandler: () => {
        router.push("/our-team/physiotherapist?type=6");
      },
    },
  ];
  return (
    <HeartsLayouts>
      <Box bg="PrimaryColor.bg" mt="5" pt="5" pb="10">
        <Heading color="#046483" as="h1" textAlign="center">
          {translations.OurDepartment}
        </Heading>
        <Box
          mt="2rem"
          textAlign="center"
          mx="auto"
          w={{ base: "90%", xl: "640px" }}
          h={{ base: "360px", xl: "360px" }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/hrGl0VntS-4"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
      <HeartsContainer>
        <Grid
          my="2rem"
          templateColumns={{ base: "100%", xl: "50% 50%" }}
          gap="50px 30px"
          justifyContent="center"
        >
          {department.map((department) => {
            return (
              <Box
                w="80%"
                textAlign="center"
                mx="auto"
                p="20px"
                cursor={"pointer"}
                key={department.name}
                onClick={department.clickhandler}
              >
                <Heading as="h4" textAlign="center" size="lg">
                  {department.name}
                </Heading>
                <Box w="100%" mx="auto" mt="5">
                  <Image
                    w="100%"
                    alt={department.alt}
                    src={department.img}
                    borderRadius="20px"
                  />
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
