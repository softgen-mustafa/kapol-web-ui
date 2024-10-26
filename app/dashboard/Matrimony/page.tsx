"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
  Alert,
  Grid2,
  ToggleButtonGroup,
  ToggleButton,
  Tab,
  Tabs,
} from "@mui/material";
import ProfileCard from "@/app/components/matrimony";
import React from "react";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import theme from "@/app/theme";

const Matrimony = () => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const statusRef = useRef<string>("all");

  const [toggleStatus, setToggleStatus] = React.useState("all"); // State for toggle status
  // const statusRef = useRef(toggleStatus);

  const handleStatusChange = (
    event: React.SyntheticEvent<Element, Event>, // Explicitly typing as SyntheticEvent for Tabs
    newValue: string | null // Allow newValue to be nullable
  ) => {
    if (newValue) {
      // Check if newValue is valid
      statusRef.current = newValue;
      setToggleStatus(newValue);
      loadData();
    }
  };

  // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   statusRef.current = event.target.value;
  //   loadData();
  // };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${getBaseUrl()}/matrimony/get?gender=male&status=${
        statusRef.current
      }`;
      const response = await getAsync(url);

      if (response && response.Data) {
        setProfileList(response.Data);
      } else {
        setError("No profiles found.");
      }
    } catch (error) {
      setError("Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: theme.palette.customColors.parchment,
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Typography
        fontSize={24}
        fontWeight={"600"}
        // color="#232325"
        variant="h4"
        sx={{
          marginBottom: 2,
          color: theme.palette.primary.light,
          // fontStyle: theme.typography,
        }}
      >
        Matrimony Profiles
      </Typography>

      {/* Status Filter Section */}
      <FormControl
        component="fieldset"
        sx={{
          mb: 5,
          p: { xs: 0.1, md: 2.1 },
          width: "100%",
          mx: "auto",
          backgroundColor: theme.palette.customColors.parchment,
          borderRadius: 8,
        }}
      >
        <Tabs
          value={toggleStatus}
          onChange={handleStatusChange}
          variant="fullWidth"
          sx={{
            backgroundColor: theme.palette.customColors.parchment,
            borderRadius: 10,
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            "& .MuiTabs-indicator": {
              display: "none", // Hide the indicator
            },
            border: `2px solid ${theme.palette.customColors.goldenrod}`,
          }}
        >
          {["all", "liked", "ignored", "no_action"].map((value) => (
            <Tab
              key={value}
              value={value}
              label={
                value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ")
              }
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 800,
                color: theme.palette.primary.light,
                flex: 1,
                borderRadius: 10, // Add rounded corners
                "&.Mui-selected": {
                  backgroundColor: theme.palette.highlight.main,
                  color: theme.palette.customColors.parchment,
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                  borderRadius: 10, // Keep rounded corners when selected
                },
                // "&:first-of-type": {
                //   borderTopLeftRadius: 10, // Round top-left corner
                //   borderBottomLeftRadius: 10, // Round bottom-left corner
                // },
                // "&:last-of-type": {
                //   borderTopRightRadius: 10, // Round top-right corner
                //   borderBottomRightRadius: 10, // Round bottom-right corner
                // },
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.light,
                },
              }}
            />
          ))}
        </Tabs>
      </FormControl>

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Profiles Grid */}
      {!loading && !error && profileList.length > 0 && (
        <Grid2 container spacing={3}>
          {profileList?.map((profile: any) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
              key={profile.id}
              sx={{ display: "flex", justifyContent: "center" }}
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
                id={profile.id}
                bio={profile.bio}
                data={profile}
              />
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* No Profiles Message */}
      {!loading && !error && profileList.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No profiles available. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default Matrimony;
