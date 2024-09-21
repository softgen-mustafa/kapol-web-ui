"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, Box, Button, IconButton } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Image from "next/image";
import { Profiles } from "@/app/components/matrimony";
import { useState } from "react";

const ProfileDetail = () => {
  const router = useRouter();
  const profileId = 3; // Use the ID for Rohit Sharma
  const profile = Profiles.find((p) => p.id === profileId);

  // State for tracking "like" and "pass" actions
  const [liked, setLiked] = useState(false);
  const [passed, setPassed] = useState(false);

  // Handlers for like and pass actions
  const handleLike = () => {
    setLiked(true);
    setPassed(false);
  };

  const handlePass = () => {
    setPassed(true);
    setLiked(false);
  };

  if (!profile) {
    return <Typography variant="h5">Profile not found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: { xs: "10px", sm: "20px" },
        bgcolor: "#f5f5f5", // Background color
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: { xs: "95%", sm: "80%", md: "1440px" }, // Explicit width for desktop view
          height: { md: "723px" }, // Explicit height for desktop view
          maxWidth: "1440px", // Prevent the card from exceeding the specified width
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          backgroundColor: "#fff", // Card background color
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack containers in phone view, side by side for desktop
        }}
      >
        {/* Left Container: Image */}
        <Box
          sx={{
            flex: { md: 1 }, // Take up 50% of the width in desktop view
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "20px", md: "10px" }, // Adjust padding for smaller and larger screens
            backgroundColor: "#f0f0f0", // Optional: background color for image container
            border: "3px solid #021473",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <Image
            src={profile.image}
            alt={profile.name}
            width={500} // Adjust as necessary
            height={500} // Adjust as necessary
            
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              objectFit: "cover",
              border: "4px solid #021473",
              borderRadius: "12px 12px 12px 12px",
             }} // Removed borderRadius
          />
        </Box>

        {/* Right Container: Profile Details */}
        <Box
          sx={{
            flex: { md: 1 }, // Take up 50% of the width in desktop view
            padding: { xs: "20px", md: "40px" }, // Adjust padding for smaller and larger screens
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", fontSize: { md: "2.5rem" } }}>
            {profile.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Age: {profile.age}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Gender: {profile.gender}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Location: {profile.location}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Religion: {profile.religion}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Caste: {profile.caste}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Education: {profile.education}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px", color: "#666", fontSize: { md: "1.25rem" } }}>
            Occupation: {profile.occupation}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "16px", fontStyle: "italic", color: "#555", fontSize: { md: "1.25rem" } }}>
            {profile.bio}
          </Typography>

          {/* Like and Pass buttons with icons */}
          {/* <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <IconButton
              color={liked ? "primary" : "default"}
              onClick={handleLike}
              sx={{ marginRight: "20px" }}
            >
              <ThumbUpAltIcon fontSize="large" />
            </IconButton>
            <IconButton
              color={passed ? "error" : "default"}
              onClick={handlePass}
            >
              <ThumbDownAltIcon fontSize="large" />
            </IconButton>
          </Box> */}

          {/* Go Back button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 20px" }}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileDetail;
