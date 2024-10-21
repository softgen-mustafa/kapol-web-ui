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
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={32} fontWeight={"600"} color="#232325">
          Create News
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)", // Gradient from purple to blue
            color: "white", // White text color
            padding: "10px 20px", // Add padding for a better look
            borderRadius: "8px", // Rounded corners
            boxShadow: 2, // Apply a subtle shadow
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transition effects
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)", // Lighter gradient on hover
              transform: "translateY(-2px)", // Slight lift effect on hover
              boxShadow: 4, // Increased shadow on hover
            },
            "&:active": {
              transform: "translateY(0)", // Reset transform when active
              boxShadow: 2, // Reduce shadow when clicked
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
              mt: 2,
              px: { xs: 16, sm: 3.5 }, // Adjust padding for mobile and desktop
              py: { xs: 1.5, sm: 2 },
              fontSize: {
                xs: "1.1rem", // Font size for extra-small devices (phones)
                sm: "0.9rem", // Font size for small devices (tablets)
              },
              borderRadius: "12px",
              background: "linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)", // Sky Blue to Deep Blue gradient
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
              "&:hover": {
                background: "linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)",
                boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
              },
              textTransform: "capitalize",
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
