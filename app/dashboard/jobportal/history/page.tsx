import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import JobCard from "@/app/components/job_card";

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
];

const Page = () => {
  return (
    <Box p={2}>
      <Typography fontSize={22} fontWeight={"600"} color="#232325">
        History
      </Typography>
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
