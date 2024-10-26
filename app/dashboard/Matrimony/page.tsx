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
} from "@mui/material";
import ProfileCard from "@/app/components/matrimony";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import theme from "@/app/theme";

const Matrimony = () => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const statusRef = useRef<string>("all");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    statusRef.current = event.target.value;
    loadData();
  };

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
          backgroundColor: theme.palette.customColors.parchment,
          p: { xs: 2, md: 2.1 },
          borderRadius: 8,
          border: `2px solid ${theme.palette.highlight.main}`,
          // boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            border: `2px solid ${theme.palette.highlight.main}`,
          },

          width: "100%",
          mx: "auto",
        }}
      >
        <RadioGroup
          row
          defaultValue="all"
          name="status-filter"
          onChange={handleStatusChange}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            color: theme.palette.highlight.main,
            backgroundColor: "transparent",
          }}
        >
          {["all", "liked", "ignored", "no_action"].map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={
                value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ")
              }
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                fontWeight: 800,
                color: theme.palette.primary.light,
                mx: 2,
                backgroundColor: "transparent",
                transition: "color 0.3s",
                "&:hover": {
                  color: theme.palette.highlight.main,
                },
              }}
            />
          ))}
        </RadioGroup>
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
