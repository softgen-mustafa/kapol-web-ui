"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProfileCard from "@/app/components/matrimony"; // Ensure this import is correct
import { getAsync, getBaseUrl } from "@/app/services/rest_services";

const Matrimony = () => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const statusRef = useRef<string>("all");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    statusRef.current = event.target.value;
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let url = `${getBaseUrl()}/matrimony/get?gender=male&status=${
        statusRef.current
      }`;
      const response = await getAsync(url);

      if (response && response.Data) {
        setProfileList(response.Data);
      }
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box sx={{ padding: 1.5, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        fontSize={22}
        fontWeight={"600"}
        color="#232325"
        variant="h4"
        sx={{ marginBottom: 0.1 }}
      >
        Profile Wall
      </Typography>
      <FormControl
        component="fieldset"
        sx={{
          mt: 3,
          backgroundColor: "background.paper",
          p: { xs: 2, md: 3 }, // Padding responsive to screen size
          borderRadius: 2,
          boxShadow: 3,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 8, // Increase shadow on hover
          },
          width: { xs: "100%", md: "100%" }, // Adjust width for desktop
          mx: "auto", // Center horizontally
          marginBottom: 0.8,
        }}
      >
        <RadioGroup
          row
          defaultValue="all"
          name="status-filter"
          onChange={handleStatusChange}
          sx={{
            display: "flex",
            justifyContent: "space-between", // Spread items evenly
            alignItems: "center",
            flexWrap: "wrap", // Ensure items wrap if necessary
          }}
        >
          {["all", "liked", "ignored", "no_action"].map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <Radio
                  sx={{
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "primary.main", // Change label color on hover
                    },
                  }}
                />
              }
              label={
                value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ")
              } // Capitalize label
              sx={{
                fontSize: { xs: "0.975rem", md: "1rem" }, // Font size responsive
                fontWeight: 500,
                color: "text.primary",
                mx: 1, // Horizontal margin for spacing
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Grid2 container spacing={2}>
        {profileList?.map((profile: any, index: number) => (
          <Grid2 size={{ xs: 12, sm: 4 }} key={profile.id}>
            <Box
              sx={{
                height: "340px", // Set a fixed height for rectangular shape
                width: "350px", // Ensure full width within the grid item
                display: "flex", // Use flexbox for proper alignment of content
                flexDirection: "column", // Stack items vertically
                justifyContent: "space-between", // Space items evenly
                transition: "0.3s",
                margin: "auto",
              }}
            >
              <ProfileCard
                image={""}
                name={profile.name}
                age={profile.age}
                gender={profile.gender}
                location={profile.location}
                religion={profile.religion}
                caste={profile.caste}
                education={profile.education}
                occupation={profile.occupation}
                id={0}
                bio={""}
                data={profile}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Matrimony;
