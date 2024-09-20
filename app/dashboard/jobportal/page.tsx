"use client";

import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import JobCard from "@/app/components/job_card";
import { useRouter } from "next/navigation";

const jobListings: any[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovators",
    location: "New York, NY",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for a talented frontend developer with experience in React and TypeScript.",
    requirements: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
    postedDate: new Date("2024-09-15"),
    applyLink: "https://techinnovators.com/careers/frontend-developer",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Code Solutions",
    location: "Remote",
    description:
      "Join our backend team to work on cutting-edge microservices using Node.js and AWS.",
    requirements: ["Node.js", "AWS", "Docker", "REST APIs"],
    postedDate: new Date("2024-09-18"),
    applyLink: "https://codesolutions.com/jobs/backend-engineer",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytics Hub",
    location: "San Francisco, CA",
    salary: "$120,000 - $140,000",
    description:
      "Seeking a data scientist with expertise in machine learning, Python, and data visualization.",
    requirements: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    postedDate: new Date("2024-09-20"),
    applyLink: "https://analyticshub.com/jobs/data-scientist",
  },
];

const Page = () => {
  const router = useRouter();

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
        {jobListings.map((data, index) => (
          <Grid key={index} item md={6} sm={6} xs={12}>
            <JobCard data={data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
