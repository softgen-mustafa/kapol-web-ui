import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Collapse } from "@mui/material"; 
import { images } from "../assets/images";
import Image from "next/image";


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
      name: "Mohammed Ali",
      age: 30,
      gender: "Male",
      religion: "Muslim",
      caste: "Sunni",
      height: "6'0",
      location: "Hyderabad",
      education: "M.Sc",
      occupation: "Doctor",
      bio: "A dedicated doctor, caring for patients and committed to making the world a better place.",
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
    name: string;
    age: number;
    gender: string;
    location: string;
    religion: string;
    caste: string;
    education: string;
    occupation: string;
    bio: string;
    image: string; // Add image prop

  };
  
  const ProfileCard: React.FC<ProfileCardProps> = ({
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
    const [expanded, setExpanded] = useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          minHeight: expanded ? 400 : 300, // Adjust height based on expansion
          margin: "16px",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.12)", // Stronger shadow
          borderRadius: "12px", // Rounded corners
          background: "linear-gradient(145deg, #e2e8f0, #f7fafc)", // Subtle gradient background
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)", // Slightly scale up on hover
            boxShadow: "0px 12px 24px rgba(0,0,0,0.2)", // Stronger shadow on hover
          },
        }}
      >
        <CardContent>
        <Image
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px 12px 0 0", // Rounded top corners
          }}
        />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem", // Larger title
              color: "#2d3748", // Darker color for emphasis
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              marginTop: "8px",
              color: "#4a5568", // Darker gray
            }}
          >
            Age: {age}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              marginTop: "4px",
              color: "#4a5568",
            }}
          >
            Gender: {gender}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              marginTop: "4px",
              color: "#4a5568",
            }}
          >
            Location: {location}
          </Typography>
  
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {/* Show additional details when expanded */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                marginTop: "8px",
                color: "#4a5568",
              }}
            >
              Religion: {religion}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Caste: {caste}
            </Typography>
            
            
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Education: {education}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                marginTop: "4px",
                color: "#4a5568",
              }}
            >
              Occupation: {occupation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                marginTop: "8px",
                color: "#4a5568",
                fontStyle: "italic", // Italicized bio for emphasis
              }}
            >
              {bio}
            </Typography>
          </Collapse>
  
          <Button
            onClick={handleExpandClick}
            variant="contained"
            sx={{
              marginTop: "16px",
              backgroundColor: expanded ? "#2d3748" : "#3182ce", // Change color when expanded
              "&:hover": {
                backgroundColor: expanded ? "#1a202c" : "#2c5282",
              },
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  export default ProfileCard;
  