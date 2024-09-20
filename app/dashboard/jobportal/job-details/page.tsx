import React from "react";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import Image from "next/image";
import { images } from "@/app/assets/images";

const response = {
  jobId: "12345",
  title: "Software Engineer",
  company: {
    name: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    industry: "Information Technology",
  },
  description:
    "We are looking for a talented Software Engineer to join our fast-paced, innovative team at Tech Innovations Inc. As a key member of our engineering department, you will play a critical role in designing, developing, and maintaining our cutting-edge software solutions. You will work closely with other engineers, product managers, and designers to deliver high-quality software products that meet customer needs. This position offers the opportunity to work on exciting projects and grow professionally in a dynamic and flexible work environment.",
  fullDescription:
    "As a Software Engineer at Tech Innovations Inc., your primary responsibilities will involve the entire software development life cycle, including coding, designing, testing, and debugging software applications. You will collaborate with cross-functional teams to understand the requirements and translate them into functional applications. Additionally, you will contribute to architectural decisions and ensure code quality through best practices, automated testing, and code reviews.\n\nKey Responsibilities:\n- Develop high-quality software design and architecture\n- Write clean, scalable code using programming languages such as JavaScript, TypeScript, and React\n- Collaborate with team members on system architecture and design\n- Troubleshoot, debug, and upgrade existing software\n- Perform code reviews and ensure best coding practices\n- Ensure software meets all performance, security, and scalability requirements\n- Work closely with product managers to gather requirements and translate them into software solutions\n- Participate in agile ceremonies and provide estimations for task completion\n- Mentor junior engineers and provide guidance on technical challenges\n\nIn addition to technical expertise, we are looking for a team player who is passionate about technology and eager to learn new skills. The ideal candidate is self-motivated, detail-oriented, and able to handle multiple tasks effectively in a fast-paced environment.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "2+ years of experience in software development",
    "Proficiency in JavaScript, TypeScript, and React",
    "Experience with cloud services such as AWS or Azure",
    "Strong understanding of RESTful APIs and microservices architecture",
    "Familiarity with Agile development methodologies",
    "Experience with Git version control",
    "Excellent problem-solving skills and attention to detail",
    "Good communication and teamwork abilities",
  ],
  responsibilities: [
    "Develop and maintain web applications",
    "Collaborate with cross-functional teams",
    "Write clean, maintainable code",
    "Troubleshoot and debug software issues",
    "Perform code reviews",
    "Optimize application performance",
    "Stay up-to-date with emerging trends and technologies",
  ],
  salaryRange: {
    min: 80000,
    max: 120000,
    currency: "USD",
  },
  employmentType: "Full-time",
  postedDate: "2024-09-18",
  applicationDeadline: "2024-10-18",
  benefits: [
    "Health insurance",
    "401(k) matching",
    "Paid time off",
    "Flexible work hours",
    "Remote work options",
    "Professional development opportunities",
    "Gym membership reimbursement",
  ],
  contact: {
    email: "jobs@techinnovations.com",
    phone: "+1-800-123-4567",
  },
};

const page = () => {
  return (
    <Box p={2}>
      <Typography fontSize={22} fontWeight={"600"} color="#232325">
        Job Details
      </Typography>
      <Box p={3} mt={1} className="bg-white" sx={{ borderRadius: 3 }}>
        <Image
          src={images.companyLogo}
          style={{ height: 45, width: 45 }}
          alt="loading"
        />
        <Stack spacing={1} mt={0.5}>
          <Typography color="#232325" fontSize={22} fontWeight={"600"}>
            {response.title}
          </Typography>
          <Box className="flex flex-col items-start gap-1 mb-2">
            <Box className="flex flex-row items-center gap-1">
              <BusinessIcon sx={{ color: "#376fd0" }} />
              <Typography color="#376fd0" fontSize={18}>
                {response.company.name}
              </Typography>
            </Box>
            <Box className="flex flex-row item-center gap-1">
              <FmdGoodOutlinedIcon sx={{ color: "#666666" }} />
              <Typography color="#666666" fontSize={16}>
                {response.company.location}
              </Typography>
            </Box>
            <Box className="flex flex-row item-center gap-1">
              <CurrencyRupeeOutlinedIcon
                fontSize="small"
                sx={{ color: "#666666" }}
              />
              <Typography color="#666666" fontSize={16}>
                {`${response.salaryRange.min} - ${response.salaryRange.max}`}
              </Typography>
            </Box>
            <Box className="flex flex-row item-center gap-1">
              <Typography color="#666666" fontSize={16}>
                Job Type: {response.employmentType}
              </Typography>
            </Box>
            <Box className="flex flex-row item-center gap-1">
              <Typography color="#666666" fontSize={16}>
                Posted Date: {response.postedDate}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              height: 45,
              width: 150,
              textTransform: "capitalize",
              fontSize: 16,
              boxShadow: "none",
              borderRadius: 10,
            }}
          >
            Apply Now
          </Button>
        </Stack>
        <Divider sx={{ my: 2.5 }} />
        <Stack flexDirection={"column"} gap={2}>
          <Box className="flex flex-col gap-1">
            <Typography color="#232325" fontSize={18} fontWeight={"600"}>
              Job description
            </Typography>
            <Typography color="#666666" fontSize={16}>
              {response.description}
            </Typography>
          </Box>
          <Box className="flex flex-col gap-1">
            <Typography color="#232325" fontSize={18} fontWeight={"600"}>
              Job Responsibilities
            </Typography>
            <Box mx={2}>
              <ul>
                {response.responsibilities.map((item, index) => (
                  <li key={index}>
                    <Typography color="#666666">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box className="flex flex-col gap-1">
            <Typography color="#232325" fontSize={18} fontWeight={"600"}>
              Requirements
            </Typography>
            <Box mx={2}>
              <ul>
                {response.requirements.map((item, index) => (
                  <li key={index}>
                    <Typography color="#666666">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          <Box className="flex flex-col gap-1">
            <Typography color="#232325" fontSize={18} fontWeight={"600"}>
              Benefits
            </Typography>
            <Box>
              {response.benefits.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  sx={{ borderRadius: 2, mr: 1 }}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default page;
