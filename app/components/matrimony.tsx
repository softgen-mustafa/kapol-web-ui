import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import { images } from "../assets/images";
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

export const Profiles = [
  {
    id: 1,
    name: "Rohit Sharma",
    age: 28,
    gender: "Male",
    religion: "Hindu",
    caste: "Brahmin",
    height: "5'9",
    location: "Delhi",
    education: "MBA",
    occupation: "Software Engineer",
    bio: "I am a fun-loving person who enjoys traveling and exploring new places.",
    image: images.rohit, // Replace with the actual image path
  },
  {
    id: 2,
    name: "Ankita Verma",
    age: 26,
    gender: "Female",
    religion: "Hindu",
    caste: "Kshatriya",
    height: "5'4",
    location: "Mumbai",
    education: "B.Tech",
    occupation: "Architect",
    bio: "I am passionate about design and architecture and love spending time with family.",
    image: images.rohit,
  },
  {
    id: 3,
    name: "Aquib Shaikh",
    age: 24,
    gender: "Male",
    religion: "Muslim",
    caste: "Sunni",
    height: "5'8",
    location: "Satara",
    education: "M.Sc",
    occupation: "Software engineering ",
    bio: "Experienced Software Engineer and Linux Enthusiast\nLoves trekking and cycling",
    image: images.rohit,
  },
  {
    id: 4,
    name: "Simran Kaur",
    age: 25,
    gender: "Female",
    religion: "Sikh",
    caste: "Jatt",
    height: "5'5",
    location: "Chandigarh",
    education: "MBA",
    occupation: "Business Analyst",
    bio: "An ambitious businesswoman who loves to work hard and play harder.",
    image: images.rohit,
  },
  {
    id: 5,
    name: "Rakesh Mehta",
    age: 32,
    gender: "Male",
    religion: "Hindu",
    caste: "Vaishya",
    height: "5'10",
    location: "Pune",
    education: "MCA",
    occupation: "IT Manager",
    bio: "A tech enthusiast who enjoys building systems and mentoring young developers.",
    image: images.rohit,
  },
  {
    id: 6,
    name: "Priya Nair",
    age: 27,
    gender: "Female",
    religion: "Hindu",
    caste: "Nair",
    height: "5'6",
    location: "Kochi",
    education: "BDS",
    occupation: "Dentist",
    bio: "A dedicated dentist who loves to help people smile confidently.",
    image: images.rohit,
  },
  {
    id: 7,
    name: "Ayesha Khan",
    age: 29,
    gender: "Female",
    religion: "Muslim",
    caste: "Sunni",
    height: "5'7",
    location: "Lucknow",
    education: "M.Com",
    occupation: "Finance Manager",
    bio: "I enjoy crunching numbers and ensuring financial health in the organizations I work with.",
    image: images.rohit,
  },
  {
    id: 8,
    name: "Amanpreet Singh",
    age: 31,
    gender: "Male",
    religion: "Sikh",
    caste: "Jatt",
    height: "6'2",
    location: "Amritsar",
    education: "BBA",
    occupation: "Entrepreneur",
    bio: "I run my own business and love to innovate and bring new ideas to the market.",
    image: images.rohit,
  },
  {
    id: 9,
    name: "Ritu Agarwal",
    age: 24,
    gender: "Female",
    religion: "Hindu",
    caste: "Agarwal",
    height: "5'3",
    location: "Jaipur",
    education: "BA",
    occupation: "Fashion Designer",
    bio: "I have a passion for fashion and designing unique styles for modern women.",
    image: images.rohit,
  },
];

type ProfileCardProps = {
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
  image?: any;
  data?: any;
};

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
        flexDirection: { xs: "column", sm: "row" }, // Vertical for phone, horizontal for desktop
        maxWidth: { xs: 700, sm: 800, md: 1000 }, // Adjust card width for different screen sizes
        minHeight: { xs: 400, sm: 250, md: 300 },
        margin: "10px auto", // Centered with margin
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        background: "linear-gradient(145deg, #f8f9fa, #e9eff6)", // Softer gradient
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)", // Slightly larger on hover
          boxShadow: "0px 12px 28px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: { xs: "100%", sm: "85%" },
          height: { xs: "auto", sm: "auto" },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" }, // Round top for phone, left side for desktop
          justifyContent:"center" 
        }}
      >
        <Image
          src={profileImage}
          alt={name}
          width={700}
          height={700}
          style={{
            borderRadius: "inherit",
            justifyContent:"center",
            objectFit: "cover",
            borderColor: "#222222",
            width: "100%",
            height:"60vh",
          }}
        />
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: { xs: "0 0 16px 16px", sm: "0 16px 16px 0" },
          width: { xs: "100%", sm: "95%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          className="font-bold text-gray-800 text-3xl mb-2"
        >
          {`${data?.UserDetail?.FirstName} ${data?.UserDetail?.LastName}`}
        </Typography>
        <Typography variant="body1" className="flex justify-between text-gray-600 text-lg mb-1">
          <span className="font-bold mr-1  ">Age:</span> {age}
        </Typography>
        <Typography variant="body1" className="flex justify-between text-gray-600 text-lg mb-1">
          <span className="font-bold mr-1 ">gender:</span>{" "}
          {data?.UserDetail?.Gender}
        </Typography>
        <Typography variant="body1" className="flex justify-between text-gray-600 text-lg mt-2">
          <span className="font-bold mr-1 ">location:</span>
          {location}
        </Typography>

        <Typography variant="body1" className="flex justify-between text-gray-600 text-lg">
          <span className="font-bold mr-2 ">religion:</span>
          {religion}
        </Typography>
        <Typography variant="body1" className="flex justify-between text-gray-600 text-lg">
          <span className="font-bold mr-2 ">caste:</span>
          {caste}
        </Typography>
        <Typography variant="body1" className="flex justify-between">
          <span className="font-bold mr-2  ">education:</span>
          {data?.UserDetail?.EducationDetails[0]?.CourseName}
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-lg flex justify-between">
          <span className="font-bold mr-2 ">occupation:</span>
          {data?.UserDetail?.JobDetails[0]?.JobTitle}
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-800 italic text-lg mt-2"
        >
          {bio}
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "9px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              // Handle like action
              handleLike(data?.UserDetail?.Guid);
            }}
            sx={{
              background: 'linear-gradient(45deg, #FF7F7F 30%, #FF1493 90%)', // Light Pink to Deep Pink gradient
              // color: "white",
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)', // Dark Pink to Light Pink gradient
              boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
              },          
              padding: "10px",
              borderRadius: "30px",
              color: "white",
             
            }}
          >
            <FavoriteIcon fontSize="medium" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              // Handle dislike action
              handleUnlike(data?.UserDetail?.Guid);
            }}
            sx={{
              background: 'linear-gradient(45deg, #FBC02D 30%, #FFA000 90%)', // Darker Yellow to Gold gradient
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              '&:hover': {
              background: 'linear-gradient(45deg, #FFA000 30%, #FF8F00 90%)', // Gold to Dark Orange gradient
              boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
              },                                                  
              padding: "10px",
              borderRadius: "30px",
              color: "white",
            }}
          >
            <ThumbDownIcon fontSize="medium" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              // Handle ignore action
              handleIgnoredProfile(data?.UserDetail?.Guid);
            }}
            sx={{
              background: 'linear-gradient(45deg, #EF5350 30%, #D32F2F 90%)', // Light Red to Dark Red gradient
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              '&:hover': {
              background: 'linear-gradient(45deg, #D32F2F 30%, #C62828 90%)', // Dark Red to Deeper Red gradient
              boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
              },
              padding: "10px",
              borderRadius: "30px",
              color: "white",
              
            }}
          >
            <ClearIcon fontSize="medium" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            onClick={() =>
              router.push(`/dashboard/matrimony/${data?.UserDetail?.Guid}`)
            }
            sx={{ 
                  mt: 2,
                  px: 3,
                  py: 1,
                      
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)', // Sky Blue to Deep Blue gradient
                  color:"white",
                  boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
                      '&:hover': {
                  background: 'linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)',
                    boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
                        
                  },
                textTransform: "capitalize", 
                }}
          >
            read more
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
