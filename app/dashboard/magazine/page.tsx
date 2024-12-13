"use client";
import { getAsync, getBaseUrl } from "@/app/services/rest_services";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DateRangePicker } from "@/app/components/date_ui";
import dayjs from "dayjs";
import theme from "@/app/theme";
const Page = () => {
  const [magazines, setMagazines] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" })
  ); // Get current month in full text
  const router = useRouter();

  // Fetch magazines when the date changes
  useEffect(() => {
    const fetchMagazines = async () => {
      const url = `${getBaseUrl()}/magazines/view/${year}/${month}`;
      console.log("Fetching magazines from URL:", url); // Debugging line
      try {
        const response = await getAsync(url);

        console.log("Response for maggggzien", JSON.stringify(response));
        setMagazines(response || []);
      } catch (error) {
        console.error("Error fetching magazines: ", error);
        setMagazines([]);
      } finally {
      }
    };

    if (selectedDate) {
      const [day, monthNum, yearNum] = selectedDate.split("-");
      setYear(parseInt(yearNum));
      setMonth(dayjs(`${yearNum}-${monthNum}-${day}`).format("MMMM")); // Format month to full text
      fetchMagazines();
    }
  }, [selectedDate]);

  // Function to navigate to the create/upload magazine page
  const handleCreateNewMagazine = () => {
    router.push("/dashboard/magazine/createmagazine");
  };

  return (
    <Container
      maxWidth={false} // Disable the max width constraints
      sx={{
        p: 4,
        borderRadius: 0,
        boxShadow: 0,
        backgroundColor: theme.palette.customColors.parchment,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100%", // Full width without constraints
        maxWidth: "100vw", // Ensure no max width constraint
        overflow: "auto",
      }}
      className="h-[100vh] w-[100vw]"
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: theme.palette.primary.light }}
        className="text-center"
      >
        Magazines for {month} {year}
      </Typography>

      {/* Date Picker */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Column for mobile, row for desktop
          justifyContent: { sm: "space-between" }, // Space between items in row layout
          alignItems: "center",
          gap: { xs: 2, sm: 3 }, // Spacing between items, responsive
          width: "100%",
          mb: 2,
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "80%" }, mb: { xs: 2, sm: 0 } }}>
          <DateRangePicker
            label="Select Date"
            defaultStart={dayjs().format("DD-MM-YYYY")}
            onDateChange={(date: any) => setSelectedDate(date)}
            // className="w-full"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNewMagazine}
          sx={{
            width: { xs: "100%", sm: "auto" }, // Full width on mobile, auto width on larger screens
            height: 45,
            boxShadow: "none",
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "15px",
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
              transform: "translateY(-2px)",
              boxShadow: 4,
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: 2,
            },
            marginTop: "20px",
          }}
        >
          Create New Magazine
        </Button>
      </Box>

      {/* Loading Spinner / Magazine List */}
      <Box className="flex justify-center items-center w-full mt-2">
        {magazines.length > 0 ? (
          <List className="w-full sm:w-auto">
            {magazines.map((magazine: string) => (
              <ListItem
                key={magazine}
                component="a"
                href={`${getBaseUrl()}/magazine/view/${year}/${month}/${magazine}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
                className="hover:bg-gray-100 rounded-md px-4 py-2"
              >
                <ListItemText primary={magazine} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            className="text-center"
          >
            No magazines found for this month.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Page;
