"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProfileCard, { Profiles } from "@/app/components/matrimony";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";

const Matrimony = () => {
  const [profileList, setProfileList] = useState(Profiles);
  const statusRef = useRef<string>("all");


  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    statusRef.current = event.target.value;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let url = `${getBaseUrl()}/matrimony/get?gender=male&status=all`;

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
          <FormControlLabel value="all" control={<Radio />} label="All" />
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
      <Grid2 container spacing={4} justifyContent="center">
        {profileList.map((profile) => (
          <Grid2 size={{ xs: 12, sm: 3, md: 6 }} key={profile.id}>
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
              // sx={{
              //   transition: "0.3s",
              //   "&:hover": {
              //     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              //     transform: "scale(1.02)",
              //   },
              // }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
export default Matrimony;
