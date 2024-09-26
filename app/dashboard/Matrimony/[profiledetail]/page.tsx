"use client";
import { useRouter } from "next/navigation";
import { Card, Box, Typography, IconButton, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const ProfileDetail = ({ params }: { params: any }) => {
  const router = useRouter();
  const guid = params.profiledetail;

  const [currIndex, setCurrIndex] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [ignored, setIgnored] = useState(false);

  const userGuid = fetchCurrentUser();

  useEffect(() => {
    loadAllImages();
  }, [profile]);

  const handleNext = () => {
    setCurrIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? imagesList.length - 1 : prevIndex - 1
    );
  };

  // Function to fetch the user profile based on GUID
  const loadProfile = async () => {
    try {
      const response = await getAsync(`${getBaseUrl()}/user/get?guid=${guid}`);
      if (response && response?.Data) {
        console.log(response?.Data);
        setProfile(response?.Data);
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  const loadAllImages = async () => {
    try {
      const url = `${getBaseUrl()}/imageservice/images/${
        profile?.Guid
      }/profile`;
      const response = await getAsync(url);
      if (response) {
        setImagesList(response);
        console.log("Response:", response);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [guid]);

  const handleGoBack = () => {
    router.back();
  };

  // Function to handle liking a profile
  const likeProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/like/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 201) {
        setLiked(true);
        setIgnored(false);
        console.log("Profile liked successfully!");
      }
    } catch (error) {
      console.log("Error liking profile:", error);
    }
  };

  // Function to handle unliking a profile
  const unlikeProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/unlike/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 200) {
        setLiked(false);
        console.log("Profile unliked successfully!");
      }
    } catch (error) {
      console.log("Error unliking profile:", error);
    }
  };
  // Function to handle ignoring a profile
  const ignoreProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/ignore/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 201) {
        setIgnored(true);
        console.log("Profile ignored successfully!");
      }
    } catch (error) {
      console.log("Error ignoring profile:", error);
    }
  };

  // Handlers for button actions
  const handleLike = () => {
    likeProfile();
  };

  const handleUnlike = () => {
    unlikeProfile();
  };

  const handleIgnore = () => {
    ignoreProfile();
  };

  // If the profile data is not yet loaded, return a loading indicator
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: { xs: "10px", sm: "20px" },
        bgcolor: "#f5f5f5",
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
        {/* Left Container: Profile Image */}
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
            {/* <Image
              src={"/default-avatar.jpg"}
              alt={profile?.FirstName}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            /> */}
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <IconButton onClick={handlePrev}>
                <ChevronLeft />
              </IconButton>
              <Box sx={{ flex: 1, height: 600 }}>
                <Image
                  src={`${getBaseUrl()}/imageservice/image/${
                    profile?.Guid
                  }/profile/${imagesList[currIndex]}`}
                  alt="loading"
                  width={800}
                  height={500}
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <IconButton onClick={handleNext}>
                <ChevronRight />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { md: 1 },
            padding: { xs: "19px", md: "40px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
              marginLeft: { xs: "300px", md: "700px" },
            }}
            onClick={handleGoBack}
          >
            <ClearIcon sx={{ fontSize: 35, color: "#170000" }} />
          </IconButton>

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
              marginBottom: "16px", // Added margin
            }}
          >
            {profile.FirstName} {profile.MiddleName} {profile.LastName}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              marginBottom: "12px", // Increased margin for spacing
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Age:{" "}
            <span style={{ fontWeight: 500 }}>
              {new Date().getFullYear() -
                new Date(profile.DateOfBirth).getFullYear()}{" "}
              years
            </span>
          </Typography>

          {/* Gender */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "12px", // Increased margin for spacing
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Gender: <span style={{ fontWeight: 500 }}>{profile.Gender}</span>
          </Typography>

          {/* Mobile Number */}
          <Typography
            variant="body1"
            sx={{
              marginBottom: "12px", // Increased margin for spacing
              color: "#777",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              letterSpacing: "0.2px",
              fontFamily: "'Roboto', sans-serif",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Mobile Number:{" "}
            <span style={{ fontWeight: 500 }}>{profile.MobileNumber}</span>
          </Typography>

          {/* Like, Dislike, Ignore Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: "15px", // Increased gap for spacing
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            <IconButton
              onClick={handleLike}
              sx={{
                backgroundColor: liked ? "#F26782" : "#ccc",
                "&:hover": { backgroundColor: "#F26782" },
                padding: "10px",
                borderRadius: "30px",
                color: "white",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <FavoriteIcon fontSize="medium" />
            </IconButton>
            <IconButton
              onClick={handleUnlike}
              sx={{
                backgroundColor: !liked && !ignored ? "#E6DF00" : "#ccc",
                "&:hover": { backgroundColor: "#E6DF00" },
                padding: "10px",
                borderRadius: "30px",
                color: "white",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <ThumbDownIcon fontSize="medium" />
            </IconButton>
            <IconButton
              onClick={handleIgnore}
              sx={{
                backgroundColor: ignored ? "#222" : "#ccc",
                "&:hover": { backgroundColor: "#222" },
                padding: "10px",
                borderRadius: "30px",
                color: "white",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              <ClearIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileDetail;
