"use client";
import React from "react";
import { Box, Grid, Grid2, Typography } from "@mui/material";
import Card from "../components/card";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <Box p={2}>
      <Typography variant="h6" fontWeight={600} color="#232325">
        Kapol App
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item md={6} sm={6} xs={6}>
          <Card
            title="Matrimony"
            onClick={() => router.push("dashboard/matrimony")}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card
            title="Jobs"
            onClick={() => router.push("dashboard/jobportal")}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Family Tree" />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Magazines" />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card
            title="Social War"
            onClick={() => router.push("/dashboard/socialwar")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
