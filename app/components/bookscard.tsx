import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import theme from "../theme";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  description: string;
  coverImage: any;
  filePath: any;
}

const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 600;

const BooksCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  genre,
  year,
  description,
  coverImage,
  filePath,
}) => {
  const openBook = () => {
    window.open(filePath, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
        maxWidth: '34 5px',
        mx: 'auto',
        borderRadius: '12px',
        boxShadow: 3,
        transition: 'box-shadow 0.3s',
        backgroundColor: "#FFF8F0",
        "&:hover": {
          background: "#FFD70020",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        border : "2px solid #DAA520",
        
      }}
    >
      {/* Image Section */}
<CardMedia
  className="flex justify-center items-center overflow-hidden h-[150px] border-b-2 border-highlight"
>
  <Image
    src={coverImage}
    alt={`${title} cover`}
    width={isSmallScreen ? 250 : 250}  // Maintain the width of 250px based on screen size
    height={200}  // Set height to maintain a consistent ratio
    className="object-cover object-center rounded-t-lg transition-transform duration-300 w-full h-full"
    style={{
      borderBottom: `2.5px solid ${theme.palette.highlight.main}`, // Bottom border only
    paddingBottom: '1px', // Optional padding if needed

      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}
  />
</CardMedia>

      {/* Content Section */}
      <CardContent sx={{ padding: 3, flexGrow: 1 }}>
        <Typography variant="h6" color={theme.palette.customColors.richInk} gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.customColors.sepia} gutterBottom>
          by {author}
        </Typography>
        <Typography variant="body2" color={theme.palette.customColors.warmGray}>
          <strong>Genre:</strong> {genre}
        </Typography>
        <Typography variant="body2" color={theme.palette.customColors.warmGray}>
          <strong>Published:</strong> {year}
        </Typography>
        <Typography variant="body2" color={theme.palette.customColors.warmGray}>
          <strong>Description:</strong> {description}
        </Typography>
      </CardContent>

      {/* Button Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "auto",
          paddingBottom: 2,
        }}
      >
        <Button
          onClick={openBook}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.customColors.parchment,
            "&:hover": {
              backgroundColor: theme.palette.highlight.main,
            },
          }}
        >
          Open Book
        </Button>
      </Box>
    </Card>
  );
};

export default BooksCard;
