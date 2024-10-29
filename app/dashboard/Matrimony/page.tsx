"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  Typography,
  CircularProgress,
  Alert,
  Grid2,
  Tab,
  Tabs,
  MenuItem,
  Select,
  Menu,
  IconButton,
  InputLabel,
} from "@mui/material";
import ProfileCard from "@/app/components/matrimony";
import React from "react";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import theme from "@/app/theme";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { SelectChangeEvent } from "@mui/material/Select";

const Matrimony = () => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const statusRef = useRef<string>("all");
  const [toggleStatus, setToggleStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [gender, setGender] = useState("");
  const genderRef = useRef<string>("male");
  const [maritalStatus, setMaritalStatus] = useState("");

  const handleStatusChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    if (newValue) {
      statusRef.current = newValue;
      setToggleStatus(newValue);
      loadData();
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    genderRef.current = selectedGender; // Update genderRef with the new value
    loadData(); // Fetch data based on the updated gender
  };

  const handleMaritalStatusChange = (event: SelectChangeEvent<string>) => {
    setMaritalStatus(event.target.value);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${getBaseUrl()}/matrimony/get?gender=${
        genderRef.current
      }&status=${statusRef.current}`;
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Page Title */}
        <Typography
          fontSize={{ xs: 20, md: 24 }}
          fontWeight={600}
          variant="h4"
          sx={{
            marginBottom: { xs: 1, md: 2 },
            color: theme.palette.primary.light,
          }}
        >
          Matrimony Profiles
        </Typography>

        {/* Status Filter Section */}
        <FormControl
          component="fieldset"
          sx={{
            mb: { xs: 3, md: 5 },
            p: { xs: 1, md: 2.1 },
            width: { xs: "90%", md: "100%" },
            mx: "auto",
            backgroundColor: theme.palette.customColors.parchment,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Tabs
            value={toggleStatus}
            onChange={handleStatusChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              backgroundColor: theme.palette.customColors.parchment,
              borderRadius: 10,
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              width: { xs: "100%", md: "45%" },
              border: `2px solid ${theme.palette.customColors.goldenrod}`,
            }}
            className="-ml-16 md:ml-0"
          >
            {[
              "all",
              "liked",
              "ignored",
              // "no_action"
            ].map((value) => (
              <Tab
                key={value}
                value={value}
                label={
                  value.charAt(0).toUpperCase() +
                  value.slice(1).replace("_", " ")
                }
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  color: theme.palette.primary.light,
                  flex: 1,
                  textTransform: "capitalize",
                  borderRadius: 10,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.highlight.main,
                    color: theme.palette.customColors.parchment,
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                    borderRadius: 10,
                  },
                }}
              />
            ))}
          </Tabs>
        </FormControl>

        {/* Right-Aligned Filter Icon Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-end", md: "flex-end" },
            alignItems: "center",
            width: { xs: "100%", md: "52%" },
            mt: { xs: -11, md: -14.5 },
            mb: { xs: 4, md: 5 },
          }}
        >
          <IconButton onClick={handleOpenMenu}>
            <FilterAltIcon
              sx={{
                color: theme.palette.customColors.parchment,
                backgroundColor: theme.palette.highlight.main,
                fontSize: { xs: "2.7rem", md: "2.9rem" },
                padding: { xs: 1.1, md: 1 },
                "&:hover": {
                  backgroundColor: theme.palette.customColors.goldenrod, // Optional hover effect
                },
              }}
              className="rounded-full hover:-translate-y-1"
            />
          </IconButton>

          {/* Filter Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            slotProps={{
              paper: {
                sx: {
                  mt: 2,
                  backgroundColor: theme.palette.customColors.parchment, // Background color for the paper
                  padding: "16px",
                  width: "200px",
                  border: `2px solid ${theme.palette.customColors.goldenrod}`, // Border color
                  borderRadius: 8, // Border radius for the menu
                  boxShadow: theme.shadows[8], // Elevation shadow
                },
              },
            }}
          >
            {/* Gender Filter */}
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                borderRadius: 6,
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.light,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 8,
                  "& fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                },
              }}
            >
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={handleGenderChange}
                label="Gender"
                sx={{
                  borderRadius: 8,
                }}
              >
                <MenuItem
                  value=""
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.customColors.parchment,
                    },
                  }}
                >
                  <em>None</em>
                </MenuItem>
                <MenuItem
                  value="male"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Male
                </MenuItem>
                <MenuItem
                  value="female"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Female
                </MenuItem>
              </Select>
            </FormControl>

            {/* Marital Status Filter */}
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                borderRadius: 6,
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.light,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 8,
                  "& fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.customColors.goldenrod,
                  },
                },
              }}
            >
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={maritalStatus}
                onChange={handleMaritalStatusChange}
                label="Marital Status"
              >
                <MenuItem
                  value=""
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <em>None</em>
                </MenuItem>
                <MenuItem
                  value="single"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Single
                </MenuItem>
                <MenuItem
                  value="married"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Married
                </MenuItem>
                <MenuItem
                  value="divorced"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Divorced
                </MenuItem>
                <MenuItem
                  value="widowed"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: theme.palette.customColors.goldenrod,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Widowed
                </MenuItem>
              </Select>
            </FormControl>
          </Menu>
        </Box>
      </Box>
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
