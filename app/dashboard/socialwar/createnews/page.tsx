"use client";

import React, { useState } from "react";
import { TextInput } from "@/app/components/text_inputs";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import {
  Box,
  Button,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { getBaseUrl, postAsync } from "@/app/services/rest_services";

interface NewsForm {
  Title: string;
  Description: string;
  CreatedBy: string;
}

const Page = () => {
  const router = useRouter();
  const userData = fetchCurrentUser();

  const [formData, setFormData] = useState<NewsForm | null>(null);

  const [errors, setErrors] = useState({
    Title: "",
    Description: "",
  });

  const validationForm = () => {
    let tempErrors: any = {};
    let valid = true;

    if (!formData?.Title) {
      tempErrors.Title = "Title is required";
      valid = false;
    }
    if (!formData?.Description) {
      tempErrors.Description = "Description is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const onApi = async () => {
    if (!validationForm()) {
      return;
    }

    try {
      const url = `${getBaseUrl()}/news/create`;
      let requestBody = {
        ...formData,
        CreatedBy: userData?.Guid,
      };

      const response = await postAsync(url, requestBody);

      if (response) {
        router.back();
      }

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
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
          Create News
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
          onClick={() => router.push("/dashboard/socialwar/creatednews")}
        >
          News Created
        </Button>
      </Stack>

      <Box mt={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Title"
              mode="text"
              placeHolder="Enter Title"
              errorMessage={errors.Title}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Title: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 14, sm: 6, xs: 12 }}>
            <TextInput
              label="Description"
              mode="text"
              placeHolder="Enter News Description"
              errorMessage={errors.Description}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Description: value,
                }))
              }
              multiline // Set your desired height here
            />
          </Grid2>
        </Grid2>
        <Box className="mt-4 flex flex-row items-center justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={onApi}
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
            Create News
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
