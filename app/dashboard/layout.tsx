import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import { Suspense } from "react";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* <nav></nav> */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
