import { Heading, Box, useToast, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { HeartsLayouts } from "../layouts/layout";
const MyAppointment: NextPage = () => {
  return (
    <HeartsLayouts>
      <Heading color="#003B71" as="h1" textAlign="center">
        My Appointment
      </Heading>
      <Grid></Grid>
    </HeartsLayouts>
  );
};

export default MyAppointment;
