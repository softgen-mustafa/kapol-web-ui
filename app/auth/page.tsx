"use client";

import React from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Logo from "../assets/logo.jpg";
import { useRouter } from "next/navigation";
import theme from "../theme";

const Page = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="flex flex-col justify-center items-center h-full"
      style={{ backgroundColor: "#FDF3E7" }}
    >
      <Box
        className="shadow-lg"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bgcolor={"#f2e8c0"}
        borderRadius={8}
        sx={{
          p: { xs: 2, sm: 3, md: 5 },
          width: { xs: 350, sm: 400, md: 400 }, // Adjust width for different screen sizes
          height: { xs: 500, sm: 550, md: 570 }, // Adjust height for different screen sizes
          maxWidth: "100%", // Ensures it doesn't exceed the screen width
          maxHeight: 650,

          border: `2px solid ${theme.palette.highlight.main}`,
        }}
      >
        <Box
          sx={{
            width: { xs: 150, sm: 250, md: 200 },
            height: { xs: 150, sm: 250, md: 200 },
            marginTop: { xs: "29px", md: "0px" },
          }}
          mt={0}
        >
          <Image
            src={Logo}
            style={{
              borderRadius: "50%",
              width: "100%",
              border: `2px solid ${theme.palette.highlight.main}`,
              padding: "1px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
            alt="Kapol Logo"
            className="rounded-md"
          />
        </Box>
        <Stack
          flex={1}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color="#6B4226"
            sx={{
              marginTop: { xs: "24px", md: "46px" }, // Smaller margin on mobile, larger on desktop
              marginBottom: { xs: "12px", md: "16px" }, // Smaller margin on mobile, larger on desktop
            }}
          >
            Welcome to Kapol App
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "90%",
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
              backgroundImage:
                "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
              color: "white",
              padding: "10px 20px",
              borderRadius: "15px",
              marginTop: { xs: "16px", md: "30px" }, // Smaller margin on mobile, larger on desktop
              marginBottom: { xs: "8px", md: "10px" }, // Smaller margin on mobile, larger on desktop
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
            onClick={() => router.push("/auth/register")}
          >
            Register
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "90%",
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
              backgroundImage:
                "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
              color: "white",
              padding: "10px 20px",
              borderRadius: "15px",
              marginTop: { xs: "16px", md: "20px" }, // Smaller margin on mobile, larger on desktop
              marginBottom: { xs: "8px", md: "20px" }, // Smaller margin on mobile, larger on desktop
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
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Page;
