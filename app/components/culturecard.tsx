"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc: any;
  onClick?: () => void;
}

const Card = ({ title, imageSrc, onClick, description }: CardProps) => {
  return (
    <Box
      borderRadius={2}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#FFF8F0",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "#FFD70020",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        overflow: "hidden",
        border: "2px solid #DAA520",
      }}
      onClick={onClick}
    >
      {/* Image Box */}
      <Box
        sx={{
          width: "100px",
          height: "auto",
          paddingTop: { xs: "15px", md: "0px" },
          paddingLeft: { xs: "10px", md: "10px" },
          paddingBottom: { xs: "0px", md: "0px" },
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          layout="responsive"
          width={40}
          height={40}
          style={{
            objectFit: "cover",
            height: "30%",
          }}
        />
      </Box>

      {/* Stack for title and description */}
      <Stack
        flex={1}
        justifyContent="center"
        padding={2}
        sx={{
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Add line only for phone view */}
        {/*** Line for phone view ***/}

        <Typography fontSize={18} color="#6B4226" fontWeight={600}>
          {title}
        </Typography>
        <Box
          sx={{
            display: { xs: "block", md: "none" }, // Show only on phone view
            borderBottom: "1px solid #DAA520", // Style the line
            marginY: 1, // Vertical margin for spacing
          }}
        />
        <Typography fontSize={15} color="#6B4226" fontWeight={400}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Card;
