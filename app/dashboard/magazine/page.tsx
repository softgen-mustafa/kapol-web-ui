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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Magazines for {month} {year}
      </Typography>
      {/* Date Picker */}
      <DateRangePicker
        label="Select Date"
        defaultStart={dayjs().format("DD-MM-YYYY")} // Set default to today's date
        onDateChange={(date: any) => setSelectedDate(date)}
      />
      {/* Create New Magazine Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleCreateNewMagazine}
        sx={{ mb: 3 }}
      >
        Create New Magazine
      </Button>
      {/* Loading Spinner */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
      ></Box>
      // Magazines List or No Magazines Message
      <>
        {magazines.length > 0 ? (
          <List>
            {magazines.map((magazine: string) => (
              <ListItem
                key={magazine}
                component="a"
                href={`${getBaseUrl()}/magazine/view/${year}/${month}/${magazine}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none" }} // Remove underline from link
              >
                <ListItemText primary={magazine} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No magazines found for this month.
          </Typography>
        )}
      </>
    </Container>
  );
};

export default Page;
