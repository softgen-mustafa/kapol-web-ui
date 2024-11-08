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
        maxWidth: '345px',
        mx: 'auto',
        borderRadius: '12px',
        boxShadow: 3,
        transition: 'box-shadow 0.3s',
        backgroundColor: theme.palette.customColors.parchment,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Image Section */}
      <CardMedia
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: 200,
          borderBottom: `2px solid ${theme.palette.highlight.main}`,
        }}
      >
        <Image
          src={coverImage}
          alt={`${title} cover`}
          width={isSmallScreen ? 250 : 190}
          height={200}
          className="overflow-hidden rounded-t-lg h-40 transition-transform duration-300"
          style={{
            border: `2px solid ${theme.palette.highlight.main}`,
            padding: "1px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            objectFit: "cover",
            objectPosition: "top center",
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
            backgroundColor: theme.palette.highlight.main,
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
