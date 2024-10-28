"use client";

import React, { useEffect, useState } from "react";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { TextInput } from "@/app/components/text_inputs";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "@/app/services/Local/helper";

interface NewsForm {
  Title: string;
  Description: string;
}

const Page = () => {
  const router = useRouter();
  const userData = fetchCurrentUser();

  const [formData, setFormData] = useState<NewsForm | null>(null);
  const [errors, setErrors] = useState({
    Title: "",
    Description: "",
  });

  useEffect(() => {
    loadNews();
  }, []);

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

  const loadNews = async () => {
    try {
      const url = `${getBaseUrl()}/news/view_by_id`;

      const response = await getAsync(url);

      if (response && response?.Data) {
        setFormData(response?.Data);
      }

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  console.log(formData);

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
      </Stack>

      <Box mt={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Title"
              mode="text"
              placeHolder="Enter Title"
              defaultValue={formData?.Title}
              errorMessage={errors.Title}
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Title: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
            <TextInput
              label="Description"
              mode="text"
              placeHolder="Enter Description"
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
            variant="text"
            sx={{
              textTransform: "capitalize",
              backgroundImage:
                "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: 2,
              transition:
                "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)", // Brighter on hover
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: 2,
              },
            }}
          >
            Edit News
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
