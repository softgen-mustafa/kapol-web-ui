// components/CommunityMemberCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid2,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import communitybg1 from "@/app/assets/icons/communitybg1.jpeg";
import Image from "next/image";
import theme from "../theme";
import profile from "@/app/assets/profile.jpg";
import id1 from "@/app/assets/community/id1.jpeg";
import id2 from "@/app/assets/community/id2.jpg";
import id3 from "@/app/assets/community/id3.jpg";
import id4 from "@/app/assets/community/id4.jpg";
import id5 from "@/app/assets/community/id5.jpg";
import id6 from "@/app/assets/community/id6.jpg";
import id7 from "@/app/assets/community/id7.jpg";
import id8 from "@/app/assets/community/id8.jpg";
import id9 from "@/app/assets/community/id9.jpg";
import id11 from "@/app/assets/community/id11.jpg";
import id12 from "@/app/assets/community/id12.jpg";
import id10 from "@/app/assets/community/id10.jpg";

// Hardcoded member data
const members = [
  {
    id: 1,
    role: "Head",
    name: "Bharat Vinubhai Kanakiya",
    mobile: "9821161171",
    profileImage: id1,
    email: "kanakiyabharatvinubhai@kapol.com ",
  },
  {
    id: 2,
    role: "Member",
    name: "Modi Anil H.",
    mobile: "123-456-7891",
    email: "modianilh@example.com",
    profileImage: id2,
  },
  {
    id: 3,
    role: "Member",
    name: "Mehta Jayant Kantilal",
    mobile: "123-456-7892",
    profileImage: id3,
    email: "mehtajayantk@example.com",
  },
  {
    id: 4,
    role: "Member",
    name: "Parekh Rajnikant Wamanrai",
    mobile: "123-456-7893",
    profileImage: id4,
    email: "parekhrajnikantw@example.com",
  },
  {
    id: 5,
    role: "Member",
    name: "Mehta Jagdish Pravinchandra",
    mobile: "123-456-7894",
    profileImage: id5,
    email: "mehtajagdishp@example.com",
  },
  {
    id: 6,
    role: "Member",
    name: "Goradia Nitin R.",
    mobile: "123-456-7895",
    profileImage: id6,
    email: "goradianitinr@example.com",
  },
  {
    id: 7,
    role: "Member",
    name: "Parekh Gopalbhai A.",
    profileImage: id7,
    mobile: "123-456-7896",
    email: "parekhgopalbhaia@example.com",
  },
  {
    id: 8,
    role: "Member",
    name: "Modi Rameshbhai Himatlal",
    mobile: "123-456-7897",
    profileImage: id8,
    email: "modirameshbh@example.com",
  },
  {
    id: 9,
    role: "Member",
    name: "Kanakia Bharat Vinubhai",
    mobile: "123-456-7898",
    profileImage: id9,
    email: "kanakiabharatv@example.com",
  },
  {
    id: 10,
    role: "Member",
    name: "Mehta Hemant Vasantlal",
    mobile: "123-456-7899",
    profileImage: id10,
    email: "mehtahemantv@example.com",
  },
  {
    id: 11,
    role: "Member",
    name: "Sanghavi Vijay Harkishandas",
    mobile: "123-456-7800",
    profileImage: id11,
    email: "sanghavivijayh@example.com",
  },
  {
    id: 12,
    role: "Member",
    name: "Mehta Sharad Dwarkadas",
    mobile: "123-456-7801",
    profileImage: id12,
    email: "mehtasharadd@example.com",
  },
  // {
  //   id: 12,
  //   role: "Member",
  //   name: "Mehta Sharad Dwarkadas",
  //   mobile: "123-456-7801",
  //   profileImage: profile,
  //   email: "mehtasharadd@example.com",
  // },
];
const isSmallScreen = window.innerWidth < 600;

const CommunityMemberCard: React.FC = () => {
  return (
    <Box>
      <Accordion
        defaultExpanded
        sx={{
          width: "98%",
          justifySelf: "center",
          borderRadius: 2,
          boxShadow: "none",
          "&:before": { display: "none" },
          overflow: "hidden", // Ensure content doesn't overflow the rounded corners
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            bgcolor: "#FFF8F0",
            borderRadius: 2,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#FFD70020",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            },
            overflow: "hidden",
            border: "1px solid #DAA520",
            paddingY: 1,
          }}
        >
          <Typography
            variant="h4"
            fontSize={17}
            color="#6B4226"
            fontWeight={600}
          >
            Community Members
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            overflowY: "scroll",
            height: "65vh",
            bgcolor: theme.palette.customColors.parchmentLight1,
            padding: 2, // Add padding here
            borderRadius: 2,
          }}
        >
          <Grid2 container spacing={2}>
            {members.map((member) => (
              <Grid2 size={{ md: 3, sm: 6, xs: 12 }} key={member.id}>
                <Card
                  sx={{
                    width: { xs: "90%", md: "85%" },
                    maxWidth: 750,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "auto",
                    padding: 0,
                    border: `2px solid #DAA520`,
                    borderRadius: 8,
                    boxShadow: 4,
                    alignItems: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    backgroundImage: `url(${communitybg1.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                    marginTop: 4,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  className="mt-12"
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      maxHeight: 200,
                      p: 2,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: communitybg1
                        ? "transparent"
                        : "rgba(0, 0, 0, 0.1)",
                      backgroundBlendMode: "overlay",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={member.profileImage || profile} // Use member's profileImage or fallback
                      alt={`${member.name}'s photo`}
                      width={200}
                      height={100}
                      style={{
                        borderRadius: "50%",
                        width: isSmallScreen ? "70%" : "60%",
                        border: `4px solid ${theme.palette.customColors.VeryLightSilver}`,
                        padding: "1px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ padding: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 1,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Divider
                      sx={{ mb: 1, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 1,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>
                        <a
                          href={`mailto:${member.email}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {member.email}
                        </a>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2" ml={1}>
                        <a
                          href={`tel:${member.mobile}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {member.mobile}
                        </a>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CommunityMemberCard;
