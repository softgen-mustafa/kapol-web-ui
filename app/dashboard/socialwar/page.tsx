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
    <Box
      p={2}
      sx={{
        bgcolor: "#FFF8F0",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="#6B4226"
          textAlign="center"
          mb={3}
        >
          News
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: 2,
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
