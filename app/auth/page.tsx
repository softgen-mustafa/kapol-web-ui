"use client";

import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "../assets/logo.jpg";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

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
        bgcolor={"#FFFFFF"}
        borderRadius={3}
        sx={{
          p: { xs: 2, sm: 3, md: 5 },
          width: { xs: 350, sm: 400, md: 500 }, // Adjust width for different screen sizes
          height: { xs: 500, sm: 550, md: 650 }, // Adjust height for different screen sizes
          maxWidth: "100%", // Ensures it doesn't exceed the screen width
          maxHeight: 650,
        }}
      >
        <Box
          sx={{
            width: { xs: 200, sm: 250, md: 300 },
            height: { xs: 200, sm: 250, md: 300 },
          }}
          my={2}
        >
          <Image
            src={Logo}
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "contain",
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
          <Typography variant="h5" fontWeight={"bold"} color="#232325">
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
              borderRadius: "8px",
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
              borderRadius: "8px",
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
