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
            boxShadow: 4, // Increase shadow on hover
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
            justifyContent: { xs: "space-between", md: "flex-start" }, // Align items to left in desktop view
            alignItems: "center",
            flexWrap: "wrap", // Ensure no wrapping
          }}
        >
          <FormControlLabel
            value="all"
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
            label="All"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" }, // Font size responsive
              fontWeight: 500,
              color: "text.primary",
              mx: 1, // Horizontal margin for spacing
            }}
          />
          <FormControlLabel
            value="liked"
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
            label="Liked"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" }, // Font size responsive
              fontWeight: 500,
              color: "text.primary",
              mx: 1, // Horizontal margin for spacing
            }}
          />
          <FormControlLabel
            value="ignored"
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
            label="Ignored"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" }, // Font size responsive
              fontWeight: 500,
              color: "text.primary",
              mx: 1, // Horizontal margin for spacing
            }}
          />
          <FormControlLabel
            value="no_action"
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
            label="No Action"
            sx={{
              fontSize: { xs: "0.975rem", md: "1rem" }, // Font size responsive
              fontWeight: 500,
              color: "text.primary",
              mx: 1, // Horizontal margin for spacing
            }}
          />
        </RadioGroup>
      </FormControl>
      <Grid2 container spacing={4}>
        {profileList?.map((profile: any, index: number) => (
          <Grid2 size={{ xs: 12, sm: 3, md: 6 }} key={profile.id}>
            <ProfileCard
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
