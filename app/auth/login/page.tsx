"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import Logo from "../../assets/logo.png";
import { TextInput } from "@/app/components/text_inputs";
import { getBaseUrl, postAsync } from "@/app/services/rest_services";
import { setUser } from "@/app/services/Local/helper";
import { useRouter } from "next/navigation";
import theme from "@/app/theme";

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
    <div
      className="flex flex-col justify-center items-center h-full "
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
          p: { xs: 2, sm: 3, md: 3 },
          width: { xs: 330, sm: 400, md: 400 }, // Adjust width for different screen sizes
          height: { xs: 550, sm: 580, md: 570 }, // Adjust height for different screen sizes
          maxWidth: "100%", // Ensures it doesn't exceed the screen width
          maxHeight: 750,

          border: `2px solid ${theme.palette.highlight.main}`,
        }}
      >
        <Box
          sx={{
            width: { xs: 150, sm: 200, md: 200 },
            height: { xs: 150, sm: 200, md: 200 },
            marginTop: { xs: "22px", sm: "2px", md: "0px" },
          }}
          mt={0}
        >
          <Image
            src={Logo}
            style={{
              // borderRadius: "50%",
              width: "100%",
              // border: `2px solid ${theme.palette.highlight.main}`,
              padding: "1px",
              // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
          mt={1}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color="#6B4226"
            sx={{
              fontSize: { xs: "1.88rem", md: "1.75rem" },
              marginTop: { xs: "10px", md: "8px" }, // Smaller margin on mobile, larger on desktop
              marginBottom: { xs: "10px", md: "10px" }, // Smaller margin on mobile, larger on desktop
            }}
          >
            Login
          </Typography>
          <Stack mt={2} width={"100%"} gap={1}>
            <TextInput
              mode="text"
              placeHolder="Enter Email / Mobile Number"
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

            <Typography
              variant="caption"
              color="primary"
              textAlign="right"
              sx={{ color: theme.palette.primary.light }}
            >
              Having trouble signing in?
            </Typography>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: 45,
                boxShadow: "none",
                textTransform: "capitalize",
                backgroundImage:
                  "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
                color: "white",
                padding: "10px 20px",
                borderRadius: "15px",
                marginTop: { xs: "16px", md: "5px" }, // Smaller margin on mobile, larger on desktop
                marginBottom: { xs: "8px", md: "-1px" }, // Smaller margin on mobile, larger on desktop
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
              onClick={onApi}
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {/* Signup Link */}
            <Typography
              variant="caption"
              textAlign="center"
              color="#6e6e6e"
              onClick={() => router.push("/auth/register")}
              sx={{
                mt: { xs: 0, md: 1 }, // Adjust top margin: 2 on mobile, 3 on desktop
                mb: { xs: 6, md: 0 }, // Adjust bottom margin: 2 on mobile, 4 on desktop
                cursor: "pointer", // Add a pointer cursor for interactivity
              }}
            >
              Don’t have an account
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Page;
