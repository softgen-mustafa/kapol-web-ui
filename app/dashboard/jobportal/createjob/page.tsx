"use client";

import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getBaseUrl, postAsync } from "@/app/services/rest_services";
import { TextInput } from "@/app/components/text_inputs";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    CompanyName: "",
    Heading: "",
    Position: "",
    Description: "",
    CreatedBy: "",
  });

  const loadDetails = async () => {
    try {
      let url = `${getBaseUrl()}/jobs/create`;
      let response = await postAsync(url, formData);
      return;
    } catch {
      return [];
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
      </Stack>

      <Box mt={2}>
        <Stack spacing={2}>
          <TextInput
            label="Company Name"
            mode="text"
            placeHolder="Company Name"
            onTextChange={(value) =>
              setFormData((prevState: any) => ({
                ...prevState,
                CompanyName: value,
              }))
            }
          />

          <TextInput
            label="Heading"
            mode="text"
            placeHolder="Enter the Heading"
            onTextChange={(value) =>
              setFormData((prevState: any) => ({
                ...prevState,
                Heading: value,
              }))
            }
          />
          <TextInput
            label="Position"
            mode="text"
            placeHolder="Enter the Position"
            onTextChange={(value) =>
              setFormData((prevState: any) => ({
                ...prevState,
                Position: value,
              }))
            }
          />
          <TextInput
            label="Description"
            mode="text"
            placeHolder="Enter Job Description"
            onTextChange={(value) =>
              setFormData((prevState: any) => ({
                ...prevState,
                Description: value,
              }))
            }
          />
          <TextInput
            label="Created By "
            mode="text"
            placeHolder="Enter Your Name"
            onTextChange={(value) =>
              setFormData((prevState: any) => ({
                ...prevState,
                CreatedBy: value,
              }))
            }
          />
          <Button variant="contained" color="primary" onClick={loadDetails}>
            Create Job
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Page;
