import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";
import {
  deleteAsync,
  getAsync,
  getBaseUrl,
  postAsync,
} from "../services/rest_services";
import { fetchCurrentUser } from "../services/Local/helper";

interface ProfileCardProps {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  religion: string;
  caste: string;
  education: string;
  occupation: string;
  bio: string;
  image: string;
  data: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  age,
  gender,
  location,
  religion,
  caste,
  education,
  occupation,
  bio,
  image,
  data,
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [profileImage, setProfileImage] = useState<any>("");
  const user = fetchCurrentUser();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (data?.UserDetail?.Guid) {
      loadAllImages(data?.UserDetail?.Guid).then((image) => {
        setProfileImage(image);
      });
    }
  }, [data?.UserDetail?.Guid]);

  const loadAllImages = async (guid: any) => {
    try {
      const url = `${getBaseUrl()}/imageservice/images/${guid}/profile`;
      const response = await getAsync(url);
      let image;
      if (response) {
        image = `${getBaseUrl()}/imageservice/image/${guid}/profile/${
          response[0]
        }`;
      }
      return image;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLike = async (guid: number) => {
    try {
      const url = `${getBaseUrl()}/matrimony/like/profile?user_guid=${
        user?.Guid
      }&profile_guid=${guid}`;

      const response = await postAsync(url, "");

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUnlike = async (guid: number) => {
    try {
      const url = `${getBaseUrl()}/matrimony/unlike/profile?user_guid=${
        user?.Guid
      }&profile_guid=${guid}`;

      const response = await deleteAsync(url);

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleIgnoredProfile = async (guid: number) => {
    try {
      const url = `${getBaseUrl()}/matrimony/ignore/profile?user_guid=${
        user?.Guid
      }&profile_guid=${guid}`;

      const response = await postAsync(url, "");

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        handleExpandClick();
      }}
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "auto",

        borderRadius: 2,
        boxShadow: 4,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 180,
          position: "relative",
          overflow: "hidden",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={profileImage}
          alt={name}
          width={500}
          height={500}
          style={{
            borderRadius: "50%",
            width: "55%",
            border: "2px solid #ccc",
            padding: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            height: "100%",
            objectFit: "fill",
          }}
        />
      </Box>

      {/* Profile Details */}
      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 1,
            color: "#333",
          }}
        >
          {`${data?.UserDetail?.FirstName} ${data?.UserDetail?.LastName}`}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#555",
            textAlign: "center",
            mb: 1,
          }}
        >
          {`${age} years old | ${location}`}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography variant="body2">
            <strong>Religion:</strong> {religion}
          </Typography>
          <Typography variant="body2">
            <strong>Caste:</strong> {caste}
          </Typography>
          <Typography variant="body2">
            <strong>Occupation:</strong> {occupation}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleLike(data?.UserDetail?.Guid);
            }}
            sx={{
              backgroundColor: "#ff4081",
              color: "white",
              "&:hover": {
                backgroundColor: "#ff007f",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleUnlike(data?.UserDetail?.Guid);
            }}
            sx={{
              backgroundColor: "#ffca28",
              color: "white",
              "&:hover": {
                backgroundColor: "#ffb300",
              },
            }}
          >
            <ThumbDownIcon />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleIgnoredProfile(data?.UserDetail?.Guid);
            }}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#e53935",
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>

        {/* Read More Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/matrimony/${data?.UserDetail?.Guid}`);
          }}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#03a9f4",
            color: "white",
            "&:hover": {
              backgroundColor: "#0288d1",
            },
            borderRadius: "8px",
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
