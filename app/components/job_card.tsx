"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { images } from "../assets/images";
import { convertToDate } from "../services/Local/helper";

const JobCard = ({ data }: any) => {
  const router = useRouter();

  return (
    <Box
      p={3}
      className="h-full bg-white shadow-md"
      sx={{ borderRadius: 3, cursor: "pointer" }}
      onClick={() => router.push(`/dashboard/jobportal/${data?.Guid}`)}
    >
      <Stack flexDirection={"column"} spacing={1}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography fontSize={20} fontWeight={"600"} color="#232325">
              {data?.Position}
            </Typography>
            <Typography color="#232325">{data?.CompanyName}</Typography>
          </Box>
          <Image
            src={images.companyLogo}
            alt="loading"
            style={{ 
              height: 45, 
              width: 45,
              
            }}
          />
        </Stack>
        <Typography color="#232325">
          <span className="font-bold mr-2  ">Location:</span> 
          {data.Location}
        </Typography>
        <Typography color="#232325">
        <span className="font-bold mr-2 ">Description:</span> 
          {data?.Description}
        </Typography>
        <Typography color="#232325">
        <span className="font-bold mr-2  ">Posted Date:</span> 
          {convertToDate(data?.CreatedOn)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default JobCard;
