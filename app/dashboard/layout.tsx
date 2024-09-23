import theme from "../theme";
import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";
import { images } from "../assets/images";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* <nav></nav> */}
      <Box p={2} bgcolor={"#F8F9F9"}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box className="flex flex-row items-center gap-4">
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
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Typography variant="h6" color="#232325">
              Name
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
