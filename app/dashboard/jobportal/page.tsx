"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
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

  const handleUnapply = (jobGuid: string) => {
    setJobDetails((prevDetails) =>
      prevDetails.filter((job) => job.Guid !== jobGuid)
    );
  };

  const handleApply = (jobGuid: string) => {
    setJobDetails((prevDetails) =>
      prevDetails.map((job) =>
        job.Guid === jobGuid ? { ...job, Status: "applied" } : job
      )
    );
  };

  return (
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={32} fontWeight={"600"} color="#232325">
          Job Portal
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
            transition: "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transition effects
            '&:hover': {
              backgroundImage: "linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)", // Lighter gradient on hover
              transform: "translateY(-2px)", // Slight lift effect on hover
              boxShadow: 4, // Increased shadow on hover
            },
            '&:active': {
              transform: "translateY(0)", // Reset transform when active
              boxShadow: 2, // Reduce shadow when clicked
            },
          }}
        
        
          onClick={() => router.push("/dashboard/jobportal/createjob")}
        >
          Create New Jobs
        </Button>
      </Stack>

      <FormControl component="fieldset"
  sx={{
    mt: 3,
    backgroundColor: 'background.paper',
    p: { xs: 2, md: 3 }, // Padding responsive to screen size
    borderRadius: 2,
    boxShadow: 3,
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: 4, // Increase shadow on hover
    },
    width: { xs: '100%', md: '100%' }, // Adjust width for desktop
    mx: 'auto', // Center horizontally
  }}
>
  <RadioGroup
    row
    defaultValue="all"
    name="status-filter"
    onChange={handleStatusChange}
    sx={{
      justifyContent: { xs: 'space-between', md: 'flex-start' }, // Align items to left in desktop view
      alignItems: 'center',
      flexWrap: 'wrap', // Ensure no wrapping
    }}
  >
    <FormControlLabel
      value="all"
      control={<Radio
        sx={{
          transition: 'color 0.3s',
          '&:hover': {
            color: 'primary.main', // Change label color on hover
          },
        }}
      />}
      label="View All"
      className="text-lg"
      sx={{
        fontSize: { xs: '0.975rem', md: '1rem' }, // Font size responsive
        fontWeight: 500,
        color: 'text.primary',
        mx: 1, // Horizontal margin for spacing
      }}
    />
    <FormControlLabel
      value="applied"
      control={<Radio
        sx={{
          transition: 'color 0.3s',
          '&:hover': {
            color: 'primary.main', // Change label color on hover
          },
        }}
      />}
      label="Applied"
      className="text-lg"
      sx={{
        fontSize: { xs: '0.975rem', md: '1rem' }, // Font size responsive
        fontWeight: 500,
        color: 'text.primary',
        mx: 1, // Horizontal margin for spacing
      }}
    />
    <FormControlLabel
      value="accepted"
      control={<Radio
        sx={{
          transition: 'color 0.3s',
          '&:hover': {
            color: 'primary.main', // Change label color on hover
          },
        }}
      />}
      label="Accepted"
      className="text-lg"
      sx={{
        fontSize: { xs: '0.975rem', md: '1rem' }, // Font size responsive
        fontWeight: 500,
        color: 'text.primary',
        mx: 1, // Horizontal margin for spacing
      }}
    />
    <FormControlLabel
      value="rejected"
      control={<Radio
        sx={{
          transition: 'color 0.3s',
          '&:hover': {
            color: 'primary.main', // Change label color on hover
          },
        }}
      />}
      label="Rejected"
      className="text-lg"
      sx={{
        fontSize: { xs: '0.975rem', md: '1rem' }, // Font size responsive
        fontWeight: 500,
        color: 'text.primary',
        mx: 1, // Horizontal margin for spacing
      }}
    />
  </RadioGroup>
</FormControl>

      <Grid2 container spacing={2} mt={1}>
        {jobDetails.map((data, index) => (
          <Grid2 key={index} size={{ md: 6, sm: 6, xs: 12 }}>
            <JobCard
              data={data}
              status={statusRef.current}
              onUnapply={handleUnapply}
              onApply={handleApply}
              userGuid={userData?.Guid}
              onCardClick={() =>
                router.push(`/dashboard/jobportal/${data?.Guid}`)
              }
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Page;
