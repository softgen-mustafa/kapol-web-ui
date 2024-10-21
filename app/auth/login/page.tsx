"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import Logo from "../../assets/logo.jpg";
import { TextInput } from "@/app/components/text_inputs";
import { getBaseUrl, postAsync } from "@/app/services/rest_services";
import { setUser } from "@/app/services/Local/helper";
import { useRouter } from "next/navigation";

interface Login {
  MobileNumber: string;
  EmailAddress: string;
  Password: string;
}

const Page = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<Login>({
    MobileNumber: "",
    EmailAddress: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const onApi = async () => {
    setLoading(true); // Set loading to true when API call starts
    try {
      const url = `${getBaseUrl()}/user/login`;
      let encoded = Buffer.from(loginData?.Password || "").toString("base64");
      let requestBody = {
        ...loginData,
        Password: encoded,
      };

      console.log("Sending request to:", url);
      console.log("Request body:", requestBody);

      const response = await postAsync(url, requestBody);

      console.log("API Response:", response); // Check if the API responds

      if (response && response?.Data) {
        setUser(response?.Data);
        // Await the router push
        console.log("Navigating to /dashboard"); // Check if we reach router.push
        await router.push("/dashboard");
      } else {
        console.log("Login failed, response invalid:", response);
      }
    } catch (error) {
      console.error("Error during API call or navigation:", error); // Log errors here
    } finally {
      setLoading(false); // Reset loading to false once done
    }
  };

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
          width: { xs: 350, sm: 400, md: 500 },
          height: { xs: 500, sm: 550, md: 650 },
          maxWidth: "100%",
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
            Login
          </Typography>
          <Stack mt={2} width={"80%"} gap={1.5}>
            <TextInput
              mode="text"
              placeHolder="Enter Email or Mobile Number"
              onTextChange={(value) =>
                setLoginData((prevState: any) => ({
                  ...prevState,
                  // Adjust to handle either MobileNumber or EmailAddress based on input format
                  MobileNumber: value.includes("@") ? "" : value,
                  EmailAddress: value.includes("@") ? value : "",
                }))
              }
            />
            <TextInput
              mode="password"
              placeHolder="Enter Password"
              onTextChange={(value) =>
                setLoginData((prevState: any) => ({
                  ...prevState,
                  Password: value,
                }))
              }
            />
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: 45,
                boxShadow: "none",
                textTransform: "capitalize",
                mt: 2,
              }}
              onClick={onApi}
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Page;
