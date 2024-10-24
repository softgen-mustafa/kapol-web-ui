import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
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
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        maxWidth: { xs: 300, sm: 200, md: 1000 },
        minHeight: { xs: 350, sm: 300, md: 250 },
        margin: "5px auto",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(145deg, #f8f9fa, #e9eff6)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        padding: { xs: "10px", sm: "15px" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "150px" },
          height: { xs: "100%", sm: "150px" },
          position: "relative",
          overflow: "hidden",
          borderRadius: "50%",
          justifyContent: "center",
          border: "2px solid #222222",
          margin: { xs: "0 auto 15px", sm: "0 15px 0 0" },
        }}
      >
        <Image
          src={profileImage}
          alt={name}
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <CardContent
        sx={{
          padding: "16px",
          backgroundColor: "red",
          borderRadius: { xs: "0 0 16px 16px", sm: "0 16px 16px 0" },
          width: { xs: "100%", sm: "calc(100% - 220px)" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
            textAlign: "center",
            sm: { textAlign: "left" },
          }}
        >
          {`${data?.UserDetail?.FirstName} ${data?.UserDetail?.LastName}`}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            className="text-gray-600"
            sx={{ mb: "5px" }}
          >
            <strong>Age:</strong> {age}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600"
            sx={{ mb: "5px" }}
          >
            <strong>Gender:</strong> {gender}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600"
            sx={{ mb: "5px" }}
          >
            <strong>Religion:</strong> {religion}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600"
            sx={{ mb: "5px" }}
          >
            <strong>Caste:</strong> {caste}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            onClick={() =>
              router.push(`/dashboard/matrimony/${data?.UserDetail?.Guid}`)
            }
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)",
              color: "white",
              padding: "8px 16px",
              "&:hover": {
                background: "linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)",
              },
            }}
          >
            Read More
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleLike(data?.UserDetail?.Guid);
            }}
            sx={{
              background: "linear-gradient(45deg, #FF7F7F 30%, #FF1493 90%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)",
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
              background: "linear-gradient(45deg, #FBC02D 30%, #FFA000 90%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #FFA000 30%, #FF8F00 90%)",
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
              background: "linear-gradient(45deg, #EF5350 30%, #D32F2F 90%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #D32F2F 30%, #C62828 90%)",
              },
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
