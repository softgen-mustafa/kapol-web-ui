"use client";

import React from "react";
import { Box, Grid2, Typography } from "@mui/material";
import Card from "@/app/components/culturecard";
import { useRouter } from "next/navigation";
import festival from "@/app/assets/icons/festival.png";
import musicvideo from "@/app/assets/icons/music&video.png";
import books from "@/app/assets/icons/books.png";

const Page = () => {
  const router = useRouter();

  return (
    <Box
      p={2}
      bgcolor="#FFF8F0"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowY: "scroll",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        color="#6B4226"
        textAlign="center"
        mb={3}
      >
        Culture
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            title="Books"
            description="Discover and deepen your connection with our heritage through sacred texts and traditional Gujarati literature. Learn more about our culture, values, and spiritual legacy."
            imageSrc={books}
            onClick={() => router.push("culture/books")}
          />
        </Grid2>
        <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
          <Card
            description="Immerse yourself in the sounds and stories of our culture. Discover traditional Gujarati music and videos that celebrate our heritage and community spirit"
            title="Music & Videos"
            imageSrc={musicvideo}
            onClick={() => router.push("culture/")}
          />
        </Grid2>
        <Grid2 size={{ md: 12, sm: 12, xs: 12 }}>
          <Card
            description="Celebrate the vibrant festivals of our Gujarati heritage! Dive into the stories, rituals, and significance of each festival, from Navratri to Diwali. Learn how these traditions bring our community together, preserving our culture and values through joyous celebrations."
            title="Festivals"
            imageSrc={festival}
            onClick={() => router.push("culture/books")}
          />
        </Grid2>
        
      </Grid2>
    </Box>
  );
};

export default Page;
