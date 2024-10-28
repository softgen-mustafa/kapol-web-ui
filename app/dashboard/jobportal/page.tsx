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
    <Box
      p={2}
      sx={{
        bgcolor: "#FFF8F0",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Header Section */}
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
          Job Portal - Kapol Samaj
        </Typography>

        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
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
          onClick={() => router.push("/dashboard/jobportal/createjob")}
        >
          Create New Jobs
        </Button>
      </Stack>

      {/* Status Filter Section */}
      <FormControl
        component="fieldset"
        sx={{
          mt: 3,
          backgroundColor: "background.paper",
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          boxShadow: 3,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 4,
          },
          width: { xs: "100%", md: "100%" },
          mx: "auto",
        }}
      >
        <RadioGroup
          row
          defaultValue="all"
          name="status-filter"
          onChange={handleStatusChange}
          sx={{
            justifyContent: { xs: "space-between", md: "flex-start" },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            value="all"
            control={
              <Radio
                sx={{
                  color: "#FF7043",
                  "&.Mui-checked": {
                    color: "#FFA726", // Saffron color for selected radio buttons
                  },
                }}
              />
            }
            label="View All"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" },
              fontWeight: 500,
              color: "text.primary",
              mx: 1,
            }}
          />
          <FormControlLabel
            value="applied"
            control={
              <Radio
                sx={{
                  color: "#FF7043",
                  "&.Mui-checked": {
                    color: "#FFA726",
                  },
                }}
              />
            }
            label="Applied"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" },
              fontWeight: 500,
              color: "text.primary",
              mx: 1,
            }}
          />
          <FormControlLabel
            value="accepted"
            control={
              <Radio
                sx={{
                  color: "#FF7043",
                  "&.Mui-checked": {
                    color: "#FFA726",
                  },
                }}
              />
            }
            label="Accepted"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" },
              fontWeight: 500,
              color: "text.primary",
              mx: 1,
            }}
          />
          <FormControlLabel
            value="rejected"
            control={
              <Radio
                sx={{
                  color: "#FF7043",
                  "&.Mui-checked": {
                    color: "#FFA726",
                  },
                }}
              />
            }
            label="Rejected"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" },
              fontWeight: 500,
              color: "text.primary",
              mx: 1,
            }}
          />
        </RadioGroup>
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
