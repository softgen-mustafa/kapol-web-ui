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

      console.log("Response of NEws:", JSON.stringify(response));
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
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)", // Gradient from purple to blue
            color: "white", // White text color
            padding: "10px 20px", // Add padding for a better look
            borderRadius: "8px", // Rounded corners
            boxShadow: 2, // Apply a subtle shadow
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transition effects
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)", // Lighter gradient on hover
              transform: "translateY(-2px)", // Slight lift effect on hover
              boxShadow: 4, // Increased shadow on hover
            },
            "&:active": {
              transform: "translateY(0)", // Reset transform when active
              boxShadow: 2, // Reduce shadow when clicked
            },
          }}
          onClick={() => router.push("/dashboard/socialwar/createnews")}
        >
          Create New News
        </Button>
      </Stack>

      <Grid2 container spacing={2} mt={1}>
        {newsList?.map((data: any, index) => (
          <Grid2 key={index} size={{ md: 6, sm: 6, xs: 12 }}>
            <NewsCard
              data={data}
              onCardClick={() => {}}
              onReportClick={() => handleReport(data?.Guid)}
              onDeleteClick={() => {
                handleReport(data?.Guid);
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Page;
