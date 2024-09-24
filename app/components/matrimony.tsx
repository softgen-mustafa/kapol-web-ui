import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Collapse, Box, IconButton } from "@mui/material";
import { images } from "../assets/images";
import Image from "next/image";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation";



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
    image: images.rohit,  // Replace with the actual image path
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
  image: string;
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
}) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      transform: "scale(1.05)", // Slightly larger on hover
      boxShadow: "0px 12px 28px rgba(0,0,0,0.15)",
    },
  }}
>
  {/* Image */}
  <Box
    sx={{
      width: { xs: "100%", sm: "80%" },
      height: { xs: "auto", sm: "100%" },
      position: "relative",
      overflow: "hidden",
      borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" }, // Round top for phone, left side for desktop
    }}
  >
    <Image
      src={image}
      alt={name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "inherit",
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
      variant="h5"
      component="div"
       className="font-bold text-gray-800 text-2xl mb-2"
      
    >
      {name}
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-lg mb-1"
      
    >
        <span className="font-bold mr-1 " >Age:</span> {age}
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-lg mb-1"
      
    >
        <span className="font-bold mr-1">gender:</span> {gender}
    </Typography>
    <Typography
      variant="body1"
      className="text-gray-600 text-lg mt-2"
      
    >
        <span className="font-bold mr-1">location:</span>{location}
    </Typography>

    
      <Typography
        variant="body1"
        className="text-gray-600 text-lg"
        
      >
          <span className="font-bold mr-2">religion:</span>{religion}
      </Typography>
      <Typography
        variant="body1"
        className="text-gray-600 text-lg"
        
      >
          <span className="font-bold mr-2">caste:</span>{caste}
      </Typography>
      <Typography
        variant="body1"
        
      >
          <span className="font-bold mr-2">education:</span>{education}
      </Typography>
      <Typography
        variant="body1"
        className="text-gray-600 text-lg"
        
      >
          <span className="font-bold mr-2">occupation:</span>{occupation}
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
        }}
        sx={{
          backgroundColor: "#F26782",
          "&:hover": { backgroundColor: "#2b6cb0" },
          padding: "10px",
          borderRadius: "30px",
          color: "white",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <FavoriteIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          // Handle dislike action
        }}
        sx={{
          backgroundColor: "#E6DF00",
          "&:hover": { backgroundColor: "#2b6cb0" },
          padding: "10px",
          borderRadius: "30px",
          color: "white",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <ThumbDownIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          // Handle ignore action
        }}
        sx={{
          backgroundColor: "#AD0000",
          "&:hover": { backgroundColor: "#2b6cb0" },
          padding: "10px",
          borderRadius: "30px",
          color: "white",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <ClearIcon fontSize="medium" />
      </IconButton>
    </Box>

    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
      <Button
        onClick={() => router.push("/dashboard/matrimony/profiledetail")}
        sx={{
          backgroundColor: expanded ? "#2d3748" : "#3182ce",
          "&:hover": { backgroundColor: expanded ? "#1a202c" : "#2b6cb0" },
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          fontSize: "0.9rem",
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
