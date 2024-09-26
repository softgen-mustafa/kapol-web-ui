"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import NewsCard from "@/app/components/news_card";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";

const Page = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const url = `${getBaseUrl()}/news/view_all`;

      const response = await getAsync(url);

      if (response && response?.Data) {
        setNewsList(response?.Data);
      }

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleReport = async (id: number) => {
    try {
      const url = `${getBaseUrl()}/news/report?id=${id}`;

      const response = await postAsync(url, "");

      if (response) {
        loadNews();
      }
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={22} fontWeight={"600"} color="#232325">
          News
        </Typography>
        <Button
          variant="text"
          sx={{ textTransform: "capitalize" }}
          onClick={() => router.push("/dashboard/socialwar/createnews")}
        >
          Create News
        </Button>
      </Stack>

      <Grid2 container spacing={2} mt={1}>
        {newsList?.map((data: any, index) => (
          <Grid2 key={index} size={{ md: 6, sm: 6, xs: 12 }}>
            <NewsCard
              data={data}
              onCardClick={() => {}}
              onReportClick={() => handleReport(data?.Guid)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Page;
