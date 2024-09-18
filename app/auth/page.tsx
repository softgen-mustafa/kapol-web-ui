import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "../assets/logo.jpg";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
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
              width: "100%",
              height: "100%",
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
            className="bg-red-500"
            variant="contained"
            sx={{
              width: "90%",
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
            }}
          >
            Register
          </Button>
          <Button
            className="bg-red-500"
            variant="contained"
            sx={{
              width: "90%",
              height: 45,
              boxShadow: "none",
              textTransform: "capitalize",
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default Page;
