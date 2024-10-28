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
    <Box
      p={2}
      sx={{
        bgcolor: "#FFF8F0",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Header Section */}
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="#6B4226"
          textAlign="center"
          mb={3}
        >
          Create Job
        </Typography>

        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron gradient
            color: "white", // White text color
            padding: "10px 20px", // Padding for a clean look
            borderRadius: "8px", // Rounded corners
            boxShadow: 2, // Soft shadow
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transitions
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)", // Hover effect
              transform: "translateY(-2px)", // Lift effect
              boxShadow: 4, // Increased shadow on hover
            },
            "&:active": {
              transform: "translateY(0)", // Reset transform on click
              boxShadow: 2, // Reduced shadow on click
            },
          }}
          onClick={() => router.push("/dashboard/jobportal/createdjob")}
        >
          Jobs Created
        </Button>
      </Stack>

      {/* Form Section */}
      <Box mt={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
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

          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
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

          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
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

          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
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

          <Grid2 size={{ md: 14, sm: 6, xs: 12 }}>
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
              multiline
            />
          </Grid2>
        </Grid2>
        <Box
          className="mt-4 flex flex-row items-center justify-center"
          sx={{ justifyContent: { xs: "center", md: "flex-end" } }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={loadDetails}
            sx={{
              textTransform: "capitalize",
              backgroundImage:
                "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron gradient
              color: "white", // White text color
              padding: "10px 20px", // Padding for a clean look
              borderRadius: "8px", // Rounded corners
              boxShadow: 2, // Soft shadow
              transition:
                "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transitions
              "&:hover": {
                backgroundImage:
                  "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)", // Hover effect
                transform: "translateY(-2px)", // Lift effect
                boxShadow: 4, // Increased shadow on hover
              },
              "&:active": {
                transform: "translateY(0)", // Reset transform on click
                boxShadow: 2, // Reduced shadow on click
              },
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
