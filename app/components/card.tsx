import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { images } from "../assets/images";

interface CardProps {
  title: string;
  onClick?: () => void;
}

const Card = ({ title, onClick }: CardProps) => {
  return (
    <Box
      borderRadius={3}
      p={3}
      sx={{
        bgcolor: "#376fd020",
        cursor: "pointer",
        transition: "all 0.3s ease", // Smooth transition for the hover effect
        "&:hover": {
          bgcolor: "#376fd040", // Change background color on hover
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        },
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Image
          src={images.job}
          alt="job"
          style={{
            width: 80,
            height: 80,
            marginRight: 10,
          }}
        />
        <Typography fontSize={18} color="#376fd0">
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Card;
