"use client";
import { multiPartAsync, getBaseUrl } from "@/app/services/rest_services";
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Input,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const Page = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<string>("January");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("year", year.toString());
      formData.append("month", month);
      formData.append("magazine", file);

      const url = `${getBaseUrl()}/magazine/upload`;
      const response = await multiPartAsync(url, formData);
      setMessage("Magazine uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading file.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Magazine
      </Typography>

      {/* Form for Upload */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* Year Input */}
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          fullWidth
          required
          margin="normal"
        />

        {/* Month Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* File Input */}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="file-upload">Magazine File</InputLabel>
          <Input
            id="file-upload"
            type="file"
            inputProps={{ accept: ".pdf,.docx" }}
            onChange={handleFileChange}
            required
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Upload
        </Button>
      </Box>

      {/* Success/Error Message */}
      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{ mt: 3 }}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default Page;
