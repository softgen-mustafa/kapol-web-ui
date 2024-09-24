"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import JobCard from "@/app/components/job_card";
import { useRouter } from "next/navigation";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";

const Page = () => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const statusRef = useRef<string>("all");
  const userData = fetchCurrentUser();

  // Function to fetch job details
  const loadDetails = async () => {
    try {
      let url = `${getBaseUrl()}/jobs/get/all?user_guid=${
        userData?.Guid
      }&status=${statusRef.current}`;
      let response = await getAsync(url);

      const extractedJobs = response.Data.map(
        (item: { JobDetail: any }) => item.JobDetail
      );

      setJobDetails(extractedJobs);
    } catch {
      console.log("Error fetching job details:");
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    statusRef.current = event.target.value;
    loadDetails();
  };

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
          Jobs Created
        </Button>
      </Stack>

      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <RadioGroup
          row
          defaultValue="all"
          name="status-filter"
          onChange={handleStatusChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="View All" />
          <FormControlLabel
            value="applied"
            control={<Radio />}
            label="Applied"
          />
          <FormControlLabel
            value="accepted"
            control={<Radio />}
            label="Accepted"
          />
          <FormControlLabel
            value="rejected"
            control={<Radio />}
            label="Rejected"
          />
        </RadioGroup>
      </FormControl>
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
