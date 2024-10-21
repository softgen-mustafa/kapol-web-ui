"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import {
  deleteAsync,
  getAsync,
  getBaseUrl,
} from "@/app/services/rest_services";
import NewsCard from "@/app/components/news_card";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import { useRouter } from "next/navigation";
import Loading from "../../loading";

const Page = () => {
  const router = useRouter();
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = fetchCurrentUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const url = `${getBaseUrl()}/news/view_by_user?created_by=${
        userData?.Guid
      }`;
      const response = await getAsync(url);

      if (response && response?.Data) {
        setNewsList(response?.Data);
      }

      setLoading(false);
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const url = `${getBaseUrl()}/news/delete?id=${id}`;
      const response = await deleteAsync(url);

      console.log("Response:", response);
      if (response) {
        loadData();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Box p={2}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={22} fontWeight={"600"} color="#232325">
          News Listing
        </Typography>
      </Stack>
      <Grid2 container spacing={2} mt={1}>
        {newsList?.map((data, index) => (
          <Grid2 key={data?.Guid || index} size={{ md: 6, sm: 6, xs: 12 }}>
            <NewsCard
              data={data}
              onCardClick={() => {}}
              onEditClick={() =>
                router.push(`/dashboard/socialwar/creatednews/${123}`)
              }
              onDeleteClick={() => handleDelete(data?.Guid)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Page;
