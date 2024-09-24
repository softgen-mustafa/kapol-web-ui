"use client";

import React, { useState } from "react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
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
    Location: "",
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
        <Button
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => router.push("/dashboard/jobportal/createdjob")}
          // onClick={() => router.push("/dashboard/jobportal/createjob")}
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
              onTextChange={(value) =>
                setFormData((prevState: any) => ({
                  ...prevState,
                  Description: value,
                }))
              }
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 6, xs: 12 }}>
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
