"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProfileCard, { Profiles } from "@/app/components/matrimony";

const Matrimony = () => {
  const [profileList, setProfileList] = useState(Profiles);
  const statusRef = useRef<string>("all");


  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    statusRef.current = event.target.value;
  };

  return (
    <Box sx={{ padding: 1.8, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ marginBottom: 4, color: "#232325" }}>
        Profile Wall
      </Typography>
      <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <RadioGroup
          row
          defaultValue="all"
          name="status-filter"
          onChange={handleStatusChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="View All" />
          <FormControlLabel value="liked" control={<Radio />} label="Liked" />
          <FormControlLabel
            value="ignored"
            control={<Radio />}
            label="Ignored"
          />
          <FormControlLabel
            value="no_action"
            control={<Radio />}
            label="No Action"
          />
        </RadioGroup>
      </FormControl>
      <Grid container spacing={4} justifyContent="center">
        {profileList.map((profile) => (
          <Grid item xs={12} sm={3} md={6} key={profile.id}>
            <ProfileCard
              image={profile.image}
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Matrimony;
