"use client";

import React from "react";
import { Box, Grid2, Typography } from "@mui/material";
import Card from "../components/card";
import { useRouter } from "next/navigation";
import familyTree from "@/app/assets/icons/familyTree.png";
import jobs from "@/app/assets/icons/jobs.png";
import magazines from "@/app/assets/icons/magazines.png";
import socialWar from "@/app/assets/icons/socialWar.png";
import matrimony from "@/app/assets/icons/matrimony.png";
import culture from "@/app/assets/icons/culture.png";

const Page = () => {
  const router = useRouter();

  return (
    <Box
      p={2}
      bgcolor="#FFF8F0"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowY: "scroll",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color="#6B4226"
        textAlign="center"
        mb={3}
      >
        Kapol Samaj Community
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            title="Matrimony"
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            imageSrc={matrimony}
            onClick={() => router.push("dashboard/matrimony")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            title="Jobs"
            imageSrc={jobs}
            onClick={() => router.push("dashboard/jobportal")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            title="Family Tree"
            imageSrc={familyTree}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            title="Magazines"
            imageSrc={magazines}
            onClick={() => router.push("/dashboard/magazine")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            title="News"
            imageSrc={socialWar}
            onClick={() => router.push("/dashboard/socialwar")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            title="Culture"
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            imageSrc={culture}
            onClick={() => router.push("/dashboard/socialwar")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            title="Schemes"
            imageSrc={socialWar}
            onClick={() => router.push("")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            title="About US"
            description="Finding true love in todays fast-paced world can be challenging. But sometimes, the most beautiful stories unfold in the most unexpected ways. My sisters journey to finding her soulmate is one such story, and it all began with Shaadi.com."
            imageSrc={culture}
            onClick={() => router.push("")}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Page;
