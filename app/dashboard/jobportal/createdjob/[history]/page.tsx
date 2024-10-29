"use client";

import { fetchCurrentUser } from "@/app/services/Local/helper";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { convertToDate } from "@/app/services/Local/helper";

const Page = ({ params }: { params: any }) => {
  const [jobDetails, setJobDetails] = useState<any[]>([]);
  const userData = fetchCurrentUser();

  // Function to fetch job details
  const loadDetails = async () => {
    try {
      let url = `${getBaseUrl()}/jobs/get/applicants?job_guid=${
        params.history
      }&created_by=${userData?.Guid}`;
      console.log(url);
      let response = await getAsync(url);
      setJobDetails(response.Data);
    } catch {
      console.log("Error fetching job details:");
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const updateStatus = async (
    jobGuid: string,
    applicantGuid: string,
    status: string
  ) => {
    try {
      let url = `${getBaseUrl()}/jobs/update/applicant?job_guid=${jobGuid}&applicant_guid=${applicantGuid}&status=${status}`;
      await postAsync(url, "");
      loadDetails();
    } catch (error) {
      console.log("Error updating job status:", error);
    }
  };

  // Function to map status code to status label
  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Accepted";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="#232325">
        Job Application History
      </Typography>

      <Stack spacing={2}>
        {jobDetails?.map((job, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 275,
              borderRadius: 2,
              backgroundColor: "#fff3e0",
              border: "1px solid #FFA726", // Light orange border
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s", // Smooth transition
              "&:hover": {
                backgroundColor: "#ffe0b2", // Lighter shade on hover
                transform: "scale(1.02)", // Slightly enlarge on hover
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="600" color="#BF360C">
                <span className="font-bold mr-2">Job GUID:</span> {job.JobGuid}
              </Typography>
              <Typography variant="body1">
                <span className="font-bold mr-2">Applicant GUID:</span>{" "}
                {job.ApplicantGuid}
              </Typography>
              <Typography variant="body1">
                <span className="font-bold mr-2">Applied On:</span>{" "}
                {convertToDate(job.AppliedOn)}
              </Typography>
              <Typography variant="body1">
                <span className="font-bold mr-2">Status:</span>{" "}
                {getStatusLabel(job.Status)}
              </Typography>

              {job.Status === 0 && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      updateStatus(job.JobGuid, job.ApplicantGuid, "accepted")
                    }
                    sx={{
                      mt: 2,
                      px: 3,
                      py: 1,
                      borderRadius: "12px",
                      background:
                        "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron gradient
                      boxShadow:
                        "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #FF7043 30%, #FFA726 90%)",
                        boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      updateStatus(job.JobGuid, job.ApplicantGuid, "rejected")
                    }
                    sx={{
                      mt: 2,
                      px: 3,
                      py: 1.2,
                      borderRadius: "12px",
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      boxShadow:
                        "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                        boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Page;
