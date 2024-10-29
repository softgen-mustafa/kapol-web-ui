"use client";

import React from "react";
import { Box, Grid2, Typography } from "@mui/material";
import AboutUsCard from "@/app/components/aboutuscard";
import CommunityMemberCard from "@/app/components/communitymembercard";
import theme from "@/app/theme";

const Page = () => {
  return (
    <Box
      p={2}
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowY: "scroll",
        bgcolor: theme.palette.customColors.parchmentLight2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color="#6B4226"
        textAlign="center"
        mb={3}
      >
        Kapol Samaj - About Us
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <CommunityMemberCard />
        </Grid2>
        <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
          <AboutUsCard title="Contact Details" type="contact" />
        </Grid2>
        <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
          <AboutUsCard title="Bank Details" type="bankDetails" />
        </Grid2>
        <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
          <AboutUsCard title="Address Details" type="address" />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Page;
