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
import theme from "../theme";
import bgImage from "@/app/assets/icons/bgImage.jpeg";

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

  const isSmallScreen = window.innerWidth < 600; // condition for phone screen

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
  console.log("bgImage path:", bgImage); // Check what this logs

  const calculateAge = (dobString: string): number => {
    // Parse the date string (format: "DD-MM-YYYY")
    const [day, month, year] = dobString
      .split("-")
      .map((num) => parseInt(num, 10));

    // Create date objects
    const dob = new Date(year, month - 1, day);
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust age if birthday hasn't occurred this year
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
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
        padding: 0, // Ensures no padding that might push the border
        border: `2px solid ${theme.palette.highlight.main}`,
        borderRadius: 6,
        boxShadow: 4,
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "170%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden", // Hides any overflow that might show outside the border
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 200, // Adjusts height dynamically
          maxHeight: 200, // Caps height to 200px if needed
          p: 2,
          position: "relative",
          overflow: "hidden",

          backgroundColor: bgImage ? "transparent" : "rgba(0, 0, 0, 0.1)", // Fallback color if image fails
          backgroundBlendMode: "overlay", // Blends overlay with image
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={profileImage}
          alt={name}
          width={200}
          height={100}
          style={{
            borderRadius: "50%",
            width: isSmallScreen ? "55%" : "70%", // Conditional width
            border: `2px solid ${theme.palette.highlight.main}`,
            padding: "1px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </Box>

      {/* Profile Details */}
      <CardContent
        sx={{
          padding: 2,
          backgroundColor: "transparent",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 1,
            color: theme.palette.primary.light,
          }}
        >
          {`${data?.UserDetail?.FirstName} ${data?.UserDetail?.LastName}`}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.customColors.subtleGold,
            textAlign: "center",
            mb: 1,
            fontWeight: "bold",
          }}
        >
          {`${calculateAge(data?.UserDetail?.DateOfBirthStr)} years old | ${
            data?.UserDetail?.MobileNumber
          } `}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ textAlign: "left", mb: 1 }}>
          <Typography variant="body2">
            {/* <strong style={{ color: theme.palette.customColors.antiqueGold }}>
              Religion:
            </strong>{" "} */}
            {religion}
          </Typography>
          <Typography variant="body2">
            {/* <strong style={{ color: theme.palette.customColors.antiqueGold }}>
              Caste:
            </strong>{" "} */}
            {caste}
          </Typography>
          <Typography variant="body2">
            {/* <strong style={{ color: theme.palette.customColors.antiqueGold }}>
              Occupation:
            </strong>{" "} */}
            {occupation}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
            gap: { xs: "25px", md: "25px" },
            mt: 2,
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleLike(data?.UserDetail?.Guid);
            }}
            sx={{
              background: "linear-gradient(135deg, #d6b092, #c69677, #af6c48)", // Light Cream to Warm Brown
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #c28262, #8b4f3d)", // Deep Bronze on hover
              },
            }}
          >
            <FavoriteIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleUnlike(data?.UserDetail?.Guid);
            }}
            sx={{
              background: "linear-gradient(135deg, #907567, #755b4e, #5b4036)", // Muted Brown to Deep Wood Brown
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #674a3b, #3e2b23)", // Darker Earthy Brown on hover
              },
            }}
          >
            <ThumbDownIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleIgnoredProfile(data?.UserDetail?.Guid);
            }}
            sx={{
              background: "linear-gradient(135deg, #dbc9b3, #bfa286, #8e6d4f)", // Creamy Beige to Burnt Umber
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #a48563, #5f4733)", // Tan to Dark Chestnut on hover
              },
            }}
          >
            <ClearIcon sx={{ fontSize: 20 }} />
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
            ml: { xs: 2.4, md: 0 },
            width: { xs: "80%", md: "100%" },
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron tones
            color: "white",
            padding: "8px 8px",
            borderRadius: { xs: "20px", md: "10px" },
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
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
