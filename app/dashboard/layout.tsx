"use client";

import theme from "../theme";
import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import { images } from "../assets/images";
import { getAsync, getBaseUrl } from "../services/rest_services";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let url = `${getBaseUrl()}/user/get?guid=3baf1078-8e71-42a2-a44d-25048a4a1193`;
      let response = await getAsync(url);
      if (response) {
        setUserData(response.Data);
      }
      console.log("Response", response);
    } catch {
      console.log("Error");
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
                  src={images.rohit}
                  alt="loading"
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
