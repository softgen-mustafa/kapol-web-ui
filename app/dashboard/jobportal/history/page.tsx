"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import JobCard from "@/app/components/job_card";
import { useRouter } from "next/navigation";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";

const Page = () => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const userData = fetchCurrentUser();

  // Function to fetch job details
  const loadDetails = async () => {
    try {
      let url = `${getBaseUrl()}/jobs/get-created?user_guid=${userData?.Guid}`;
      let response = await getAsync(url);
      setJobDetails(response.Data);
    } catch {
      console.log("Error fetching job details:");
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={22} fontWeight={"600"} color="#232325">
          Job Portal
        </Typography>
        <Button
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => router.push("/dashboard/jobportal/history")}
        >
          History
        </Button>
      </Stack>
      <Grid container spacing={2} mt={1}>
        {jobDetails.map((data, index) => (
          <Grid key={index} item md={6} sm={6} xs={12}>
            <JobCard data={data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
