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
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={22} fontWeight={"600"} color="#232325">
          Create Job
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
            variant="contained"
            color="primary"
            // onClick={onApi}
            sx={{
              width: 150,
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
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
