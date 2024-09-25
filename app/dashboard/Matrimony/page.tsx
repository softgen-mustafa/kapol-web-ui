"use client";
import { useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import ProfileCard, { Profiles } from "@/app/components/matrimony";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";

const Matrimony = () => {
  const [profileList, setProfileList] = useState(Profiles);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let url = `${getBaseUrl()}/matrimony/get?gender=male&status=all`;

      const response = await getAsync(url);

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
