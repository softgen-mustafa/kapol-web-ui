"use client";

import React, { useState } from "react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getBaseUrl, postAsync } from "@/app/services/rest_services";
import { TextInput } from "@/app/components/text_inputs";
import { fetchCurrentUser } from "@/app/services/Local/helper";

const Page = () => {
  const router = useRouter();
  const userData = fetchCurrentUser();

  const [formData, setFormData] = useState({
    CompanyName: "",
    Heading: "",
    Position: "",
    Description: "",
    CreatedBy: userData?.Guid,
    Location: "",
  });

  const [errors, setErrors] = useState({
    CompanyName: "",
    Heading: "",
    Position: "",
    Description: "",
    Location: "",
  });

  const validateForm = () => {
    let tempErrors: any = {};
    let valid = true;

    if (!formData.CompanyName) {
      tempErrors.CompanyName = "Company Name is required";
      valid = false;
    }
    if (!formData.Heading) {
      tempErrors.Heading = "Heading is required";
      valid = false;
    }
    if (!formData.Position) {
      tempErrors.Position = "Position is required";
      valid = false;
    }
    if (!formData.Description) {
      tempErrors.Description = "Description is required";
      valid = false;
    }
    if (!formData.Location) {
      tempErrors.Location = "Location is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const loadDetails = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let url = `${getBaseUrl()}/jobs/create`;
      let response = await postAsync(url, formData);
      if (response) {
        router.back();
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={22} fontWeight={"600"} color="#232325">
          Create Job
        </Typography>
        <Button
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => router.push("/dashboard/jobportal/createdjob")}
        >
          Jobs Created
        </Button>
      </Stack>

      <Box mt={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Company Name"
              mode="text"
              placeHolder="Company Name"
              errorMessage={errors.CompanyName}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  CompanyName: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Location"
              mode="text"
              placeHolder="Enter the Location"
              errorMessage={errors.Location}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Location: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Heading"
              mode="text"
              placeHolder="Enter the Heading"
              errorMessage={errors.Heading}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Heading: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Position"
              mode="text"
              placeHolder="Enter the Position"
              errorMessage={errors.Position}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Position: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Description"
              mode="text"
              placeHolder="Enter Job Description"
              errorMessage={errors.Description}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Description: value,
                }))
              }
            />
          </Grid2>
        </Grid2>
        <Box className="mt-4 flex flex-row items-center justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={loadDetails}
            sx={{
              width: 150,
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
            }}
          >
            Create Job
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
