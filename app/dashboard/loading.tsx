import React from "react";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
