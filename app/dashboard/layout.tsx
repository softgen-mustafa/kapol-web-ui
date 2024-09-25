"use client";

import theme from "../theme";
import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import { images } from "../assets/images";
import { getAsync, getBaseUrl } from "../services/rest_services";
import { usePathname, useRouter } from "next/navigation";
import { fetchCurrentUser } from "../services/Local/helper";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathName = usePathname();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    loadAllImages();
  }, []);

  const userData = fetchCurrentUser();

  const loadAllImages = async () => {
    try {
      const url = `${getBaseUrl()}/imageservice/images/${
        userData.Guid
      }/profile`;
      const response = await getAsync(url);
      if (response) {
        setProfileImage(
          `${getBaseUrl()}/imageservice/image/${userData?.Guid}/profile/${
            response[0]
          }`
        );
      }
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {pathName !== "/dashboard/user" && (
        <Box
          p={2}
          bgcolor={"#F8F9F9"}
          sx={{ borderBottomWidth: 1, borderColor: "#222222" }}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box
              className="flex flex-row items-center gap-4 cursor-pointer"
              onClick={() => router.push("/dashboard/user")}
            >
              <Box
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={profileImage}
                  alt="loading"
                  width={55}
                  height={55}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography variant="h6" color="#232325">
                {`${userData?.FirstName} ${userData?.LastName}`}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
