"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import Image from "next/image";
import { images } from "@/app/assets/images";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import theme from "@/app/theme";

interface JobDetails {
  ID: string;
  Guid: string;
  CompanyName: string;
  Heading: string;
  Location: string;
  Position: string;
  Description: string;
  CreatedBy: string;
  CreatedOn: string;
}

const JobPage = ({ params }: { params: any }) => {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const userData = fetchCurrentUser();

  const loadDetails = async () => {
    try {
      let url = `${getBaseUrl()}/jobs/get?job_guid=${params.jobdetails}`;
      let response = await getAsync(url);
      setJobDetails(response.Data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleApply = async () => {
    try {
      let applyUrl = `${getBaseUrl()}/jobs/apply?job_guid=${
        params.jobdetails
      }&applicant_guid=${userData?.Guid}`;
      let response = await postAsync(applyUrl, {});

      if (response) {
        alert("Application successful! Your application has been submitted.");
      } else {
        alert(`Failed to apply for the job. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if (!jobDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.customColors.parchment,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color="#6B4226"
        textAlign="center"
        mb={3}
      >
        Job Details
      </Typography>

      {/* <Typography fontSize={30} fontWeight={"600"} color="#232325">
        Job Details
      </Typography> */}
      <Box
        p={3}
        mt={1}
        sx={{
          borderRadius: 3,
          bgcolor: theme.palette.customColors.parchmentLight2,
          border: `2px solid ${theme.palette.customColors.goldenrod}`,
        }}
      >
        <Image
          src={images.companyLogo}
          alt="Company Logo"
          width={45}
          height={45}
          style={{
            border: `1.5px solid ${theme.palette.customColors.goldenrod}`,
          }}
          className=" rounded-xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
        />
        <Stack spacing={1} mt={0.5}>
          <Typography
            fontSize={22}
            fontWeight={"600"}
            sx={{ color: theme.palette.primary.light }}
          >
            {jobDetails.Position}
          </Typography>
          <Box className="flex flex-col items-start gap-1 mb-2">
            <Box className="flex flex-row items-center gap-1">
              <BusinessIcon
                sx={{ color: theme.palette.customColors.antiqueGold }}
              />
              <Typography
                fontSize={18}
                sx={{ color: theme.palette.customColors.goldenrod }}
              >
                {jobDetails.CompanyName}
              </Typography>
            </Box>
            <Box className="flex flex-row items-center gap-1">
              <FmdGoodOutlinedIcon sx={{ color: "#666666" }} />
              <Typography color="#666666" fontSize={16}>
                {jobDetails.Location || "Location not specified"}
              </Typography>
            </Box>
            <Box className="flex flex-row items-center gap-1">
              <CurrencyRupeeOutlinedIcon
                fontSize="small"
                sx={{ color: "#666666" }}
              />
              <Typography color="#666666" fontSize={16}>
                Salary: Not specified
              </Typography>
            </Box>
            <Box className="flex flex-row items-center gap-1">
              <Typography color="#666666" fontSize={16}>
                Posted Date:{" "}
                {new Date(jobDetails.CreatedOn).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              alignSelf: "flex-start",
              mt: 2,
              px: 3,
              py: 1,
              borderRadius: "12px",
              background: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)",
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
              "&:hover": {
                background: "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
                boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
              },
              textTransform: "capitalize",
            }}
            onClick={handleApply}
          >
            Apply Now
          </Button>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Stack flexDirection={"column"} gap={2}>
          <Box className="flex flex-col gap-1">
            <Typography
              fontSize={18}
              fontWeight={"600"}
              sx={{ color: theme.palette.primary.light }}
            >
              Job description
            </Typography>
            <Typography color="#666666" fontSize={16}>
              {jobDetails.Description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default JobPage;
