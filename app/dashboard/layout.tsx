"use client";

import { Box, Stack, Typography } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
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
          bgcolor={"#FDF3E7"} // Soft cream background
          sx={{ borderBottomWidth: 1, borderColor: "#DAA520" }} // Golden accent border
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
                  border: "2px solid #DAA520", // Golden border around the image
                }}
              >
                <Image
                  src={profileImage}
                  alt="User Profile"
                  width={55}
                  height={55}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography variant="h6" color="#6B4226">
                {" "}
                {`Jai Shri Krishna, ${userData?.FirstName} ${userData?.LastName}`}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
