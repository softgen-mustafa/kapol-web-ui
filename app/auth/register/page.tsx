"use client";

import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/text_inputs";

const Page = () => {
  const router = useRouter();

  return (
    <div className="h-full p-2 bg-white rounded-md">
      <Stack
        p={2}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color="#232325">
          Register
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: 120,
            height: 45,
            boxShadow: "none",
            textTransform: "capitalize",
          }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Stack>
      <Box px={2} py={1}>
        <Typography>Personal Information</Typography>
        <Grid container spacing={2} mt={0.2}>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              mode="text"
              placeHolder="Enter First Name"
              onTextChange={(value) => console.log(value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              mode="text"
              placeHolder="Enter Last Name"
              onTextChange={(value) => console.log(value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              mode="text"
              placeHolder="Enter Father's Name"
              onTextChange={(value) => console.log(value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              mode="text"
              placeHolder="Enter Mother's Name"
              onTextChange={(value) => console.log(value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              mode="number"
              placeHolder="Enter Age"
              onTextChange={(value) => console.log(value)}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Page;
