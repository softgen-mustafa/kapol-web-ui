"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
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
          Jobs Listing
        </Typography>
      </Stack>
      <Grid2 container spacing={2} mt={1}>
        {jobDetails?.map((data, index) => (
          <Grid2 key={index} size={{ md: 6, sm: 6, xs: 12 }}>
            <JobCard
              onCardClick={() =>
                router.push(`/dashboard/jobportal/createdjob/${data?.Guid}`)
              }
              data={data}
              status={""}
              onUnapply={function (jobGuid: string): void {
                throw new Error("Function not implemented.");
              }}
              onApply={function (jobGuid: string): void {
                throw new Error("Function not implemented.");
              }}
              userGuid={""}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Page;
