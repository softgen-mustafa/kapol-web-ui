"use client";
import { useRouter } from "next/navigation";
import { Card, Box, Typography, IconButton, Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CancelIcon from "@mui/icons-material/Cancel";  // Icon for "Ignore"
import Image from "next/image";
import { Profiles } from "@/app/components/matrimony";
import { useState } from "react";

const ProfileDetail = () => {
  const router = useRouter();
  const profileId = 3; // Example: Use the ID for a specific profile
  const profile = Profiles.find((p) => p.id === profileId);

  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  // State for tracking "like," "unlike," and "ignore" actions
  const [liked, setLiked] = useState(false);
  const [ignored, setIgnored] = useState(false);

  // Handlers for button actions
  const handleLike = () => {
    setLiked(true);
    setIgnored(false); // Reset ignore
  };

  const handleUnlike = () => {
    setLiked(false);
    setIgnored(false); // Reset ignore
  };

  const handleIgnore = () => {
    setIgnored(true);
    setLiked(false); // Reset like
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
          width: { xs: "95%", sm: "80%", md: "1440px" },
          height: { xs: "auto", md: "723px" },
          maxWidth: "1440px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left Container: Image */}
        <Box
          sx={{
            flex: { md: 1 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: { xs: "10px", md: "40px" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "90%" },
              height: { xs: "300px", md: "100%" },
              position: "relative",
            }}
          >
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Box>

        {/* Right Container: Profile Details */}
        <Box
          sx={{
            flex: { md: 1 },
            padding: { xs: "19px", md: "40px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Profile Name */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#333",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
              letterSpacing: "0.5px",
              textTransform: "capitalize",
              fontFamily: "'Poppins', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {profile.name}
          </Typography>

          {/* Age */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Age: <span style={{ fontWeight: 500 }}>{profile.age}</span>
          </Typography>

          {/* Gender */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Gender: <span style={{ fontWeight: 500 }}>{profile.gender}</span>
          </Typography>

          {/* Location */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Location: <span style={{ fontWeight: 500 }}>{profile.location}</span>
          </Typography>

          {/* Religion */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Religion: <span style={{ fontWeight: 500 }}>{profile.religion}</span>
          </Typography>

          {/* Caste */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Caste: <span style={{ fontWeight: 500 }}>{profile.caste}</span>
          </Typography>

          {/* Education */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Education: <span style={{ fontWeight: 500 }}>{profile.education}</span>
          </Typography>

          {/* Occupation */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "8px",
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Occupation: <span style={{ fontWeight: 500 }}>{profile.occupation}</span>
          </Typography>

          {/* Bio */}
          <Typography
            variant="body1"
            sx={{
              marginTop: "16px",
              fontStyle: "italic",
              color: "#555",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              fontFamily: "'Merriweather', serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            "{profile.bio}"
          </Typography>

          {/* Like, Unlike, Ignore Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: { xs: "20px", md: "30px" } }}>
            <IconButton
              color={liked ? "primary" : "default"}
              onClick={handleLike}
              disabled={ignored}
              sx={{ marginRight: "20px" }}
            >
              <ThumbUpAltIcon fontSize="large" />
            </IconButton>
            <IconButton
              color={liked ? "default" : "error"}
              onClick={handleUnlike}
              disabled={ignored}
              sx={{ marginRight: "20px" }}
            >
              <ThumbDownAltIcon fontSize="large" />
            </IconButton>
            <IconButton
              color={ignored ? "default" : "error"}
              onClick={handleIgnore}
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button variant="contained" onClick={handleGoBack} sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            Go Back
          </Button>
        </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileDetail;
