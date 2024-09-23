import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Collapse, Box } from "@mui/material"; 
import { images } from "../assets/images";
import Image from "next/image";
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
        onClick={() => router.push("/dashboard/Matrimony/profiledetail")}
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" }, // Horizontal for phone, vertical for desktop
          maxWidth: { xs: 400, sm: 800 }, // Increase size for phone view
          minHeight: expanded ? { xs: 300, sm: 600 } : { xs: 250, sm: 500 },
          margin: "5px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          background: "linear-gradient(145deg, #f0f4f8, #e2e8f0)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.04)",
            boxShadow: "0px 16px 32px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Image on left for phone view and top for desktop */}
        <Box
          sx={{
            width: { xs: "40%", sm: "100%" },
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: "16px 0 0 16px", sm: "16px 16px 0 0" },
          }}
        >
          <Image
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              borderRadius: "inherit",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(180deg, rgba(0.2,0,0,0), transparent)",
              borderRadius: "inherit",
            }}
          />
        </Box>
  
        {/* Card content on right for phone view and bottom for desktop */}
        <CardContent
          sx={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: { xs: "0 16px 16px 0", sm: "0 0 16px 16px" },
            width: { xs: "60%", sm: "100%" }, // Adjust width based on view
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.8rem" }, // Adjust font size for phone view
              color: "#2d3748",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginTop: "8px",
              color: "#4a5568",
            }}
          >
            Age: {age}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginTop: "4px",
              color: "#4a5568",
            }}
          >
            Gender: {gender}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginTop: "4px",
              color: "#4a5568",
            }}
          >
            Location: {location}
          </Typography>
  
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "8px",
                color: "#4a5568",
              }}
            >
              Religion: {religion}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Caste: {caste}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Education: {education}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Occupation: {occupation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                marginTop: "8px",
                color: "#2d3748",
                fontStyle: "italic",
              }}
            >
              {bio}
            </Typography>
          </Collapse>
  
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleExpandClick();
            }}
            variant="contained"
            sx={{
              marginTop: "16px",
              backgroundColor: expanded ? "#2d3748" : "#3182ce",
              "&:hover": {
                backgroundColor: expanded ? "#1a202c" : "#2c5282",
              },
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "background-color 0.3s",
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default ProfileCard;
  