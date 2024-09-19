"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Card from "../components/card";

const Page = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" fontWeight={600} color="#232325">
        Kapol App
      </Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Matrimony" onClick={() => console.log("Matrimony")} />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Jobs" />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Family Tree" />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Magazines" />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Card title="Social War" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
