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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import JobCard from "@/app/components/job_card";
import { useRouter } from "next/navigation";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import theme from "@/app/theme";

const Page = () => {
  const router = useRouter();
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const statusRef = useRef<string>("all");
  const userData = fetchCurrentUser();
  const [tabValue, setTabValue] = useState("all"); // State for selected tab

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

  // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   statusRef.current = event.target.value;
  //   loadDetails();
  // };

  const handleStatusChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    if (newValue) {
      statusRef.current = newValue; // Update the ref with the new value
      setTabValue(newValue); // Update the tab state value
      loadDetails(); // Reload job details with the new status
    }
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
    <Box
      p={2}
      sx={{
        bgcolor: "#FFF8F0",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Stack
        flexDirection="row" // Stack items vertically for mobile
        alignItems="center"
        justifyContent="center"
        sx={{
          mb: 3,
          p: { xs: 2, md: 0 },
          // backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }} // Add padding and background for better aesthetics
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="#6B4226"
          textAlign="center"
          sx={{
            fontSize: {
              xs: "1.2rem", // Larger font for better readability on mobile
              sm: "1.5rem",
              md: "1.75rem",
            },
            mb: 1, // Margin bottom for spacing
          }}
        >
          Job Portal - Kapol Samaj
        </Typography>

        <Button
          variant="contained" // Use contained variant for better visibility
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)",
            color: "white",
            padding: "12px 20px", // Increase padding for a better touch target
            borderRadius: "8px",
            boxShadow: 2,
            width: "100%", // Full width button for easier interaction
            maxWidth: "300px", // Limit the max width for larger screens
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
              transform: "translateY(-2px)",
              boxShadow: 4,
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: 2,
            },
          }}
          onClick={() => router.push("/dashboard/jobportal/createjob")}
        >
          Create New Jobs
        </Button>
      </Stack>

      {/* Status Filter Section */}
      <FormControl
        component="fieldset"
        sx={{
          mb: { xs: 3, md: 5 },
          p: { xs: 1, md: 2.1 },
          width: { xs: "100%", md: "100%" },
          mx: "auto",
          backgroundColor: "transparent",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleStatusChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="secondary"
          sx={{
            backgroundColor: "transparent",
            borderRadius: 10,
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            "& .MuiTabs-indicator": {
              display: "none",
            },
            width: { xs: "100%", md: 1200 },
            border: `2px solid ${theme.palette.customColors.goldenrod}`,
            display: "flex",
            flexWrap: "nowrap", // Prevents wrapping on smaller screens
          }}
          // className="-ml-16 md:ml-0"
        >
          <Tab
            label="View All"
            value="all"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              fontWeight: 600,
              color: theme.palette.primary.light,
              flex: 1,
              textTransform: "capitalize",
              borderRadius: 10,
              "&.Mui-selected": {
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.customColors.parchment,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              },
            }}
          />
          <Tab
            label="Applied"
            value="applied"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 600,
              color: theme.palette.primary.light,
              flex: 1,
              textTransform: "capitalize",
              borderRadius: 10,
              "&.Mui-selected": {
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.customColors.parchment,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              },
            }}
          />
          <Tab
            label="Accepted"
            value="accepted"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 600,
              color: theme.palette.primary.light,
              flex: 1,
              textTransform: "capitalize",
              borderRadius: 10,
              "&.Mui-selected": {
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.customColors.parchment,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              },
            }}
          />
          <Tab
            label="Rejected"
            value="rejected"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 600,
              color: theme.palette.primary.light,
              flex: 1,
              textTransform: "capitalize",
              borderRadius: 10,
              "&.Mui-selected": {
                backgroundColor: theme.palette.highlight.main,
                color: theme.palette.customColors.parchment,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: 10,
              },
            }}
          />
        </Tabs>
      </FormControl>

      {/* Job Cards Grid */}
      <Grid2 container spacing={2} mt={1}>
        {jobDetails?.map((data, index) => (
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
