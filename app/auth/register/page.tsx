"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/text_inputs";
import { DateRangePicker } from "@/app/components/date_ui";
import { DropDown } from "@/app/components/drop_down";

const Page = () => {
  const router = useRouter();

  const [openModel, setOpenModel] = useState(false);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);
  const [martialStatusList, setMartialStatusList] = useState([
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
  ]);
  const [qualificationList, setQualificationList] = useState([
    { label: "High School", value: "high-school" },
    { label: "Diploma", value: "diploma" },
    { label: "Bachelor's Degree", value: "bachelor" },
    { label: "Master's Degree", value: "master" },
    { label: "PhD", value: "phd" },
  ]);
  const [occupationList, setOccupationList] = useState([
    { label: "Business", value: "business" },
    { label: "Service", value: "service" },
    { label: "Student", value: "student" },
    { label: "Retired", value: "retired" },
  ]);

  const repassword = useRef("");
  const repasswordError = useRef("");

  const formDetails = useRef({
    firstName: "",
    lastName: "",
    fathersName: "",
    mothersName: "",
    birthdate: "",
    gender: gender[0],
    martialStatus: martialStatusList[0],
    phone: "",
    email: "",
    qualification: qualificationList[0],
    universityName: "",
    yearOfGraduation: "",
    occupation: occupationList[0],
    specialization: "",
    socialMedia: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    phone: "",
    email: "",
  });

  const validatingForm = () => {
    const currentFormData = formDetails.current;

    let newErrors: any = {};

    if (!currentFormData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!currentFormData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!currentFormData.birthdate) {
      newErrors.birthdate = "Birthdate is required";
    }
    if (!currentFormData.phone) {
      newErrors.phone = "Phone number is required";
    }
    if (!currentFormData.email) {
      newErrors.email = "Email address is required";
    }

    setFormValidation(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = () => {
    setOpenModel(true);
  };

  const handleClose = () => {
    setOpenModel(false);
  };

  const handleSubmit = () => {
    if (validatingForm()) {
      console.log("Form Details: ", formDetails.current);
      handleOpen();
    } else {
      console.log("Error", formValidation);
    }
  };

  const handleSubmitForm = () => {
    if (formDetails.current.password === repassword.current) {
      console.log("Registration Successfull", formDetails.current);
    } else {
      repasswordError.current = "Password not match";
    }
  };

  return (
    <div className="p-2 rounded-md">
      <Stack
        p={2}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color="#232325" fontWeight={"bold"}>
          Registration Form
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: 120,
            height: 45,
            boxShadow: "none",
            textTransform: "capitalize",
          }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Stack>
      <Box px={2} py={1}>
        <Typography color="#232325" variant="h6">
          Personal Information
        </Typography>
        <Grid container spacing={2} mt={0.2}>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="First Name"
              mode="text"
              placeHolder="Enter First Name"
              onTextChange={(value: string) =>
                (formDetails.current.firstName = value)
              }
              errorMessage={formValidation.firstName}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Last Name"
              mode="text"
              placeHolder="Enter Last Name"
              onTextChange={(value) => (formDetails.current.lastName = value)}
              errorMessage={formValidation.lastName}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Father Name"
              mode="text"
              placeHolder="Enter Father's Name"
              onTextChange={(value) =>
                (formDetails.current.fathersName = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Mother Name"
              mode="text"
              placeHolder="Enter Mother's Name"
              onTextChange={(value) =>
                (formDetails.current.mothersName = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DateRangePicker
              label="Birth Date"
              onDateChange={(date: any) =>
                (formDetails.current.birthdate = date)
              }
              errorMessage={formValidation.birthdate}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Gender"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={gender}
              onSelection={(value) => (formDetails.current.gender = value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Martial Status"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={martialStatusList}
              onSelection={(value) =>
                (formDetails.current.martialStatus = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Phone number"
              mode="text"
              placeHolder="Enter Phone Number"
              onTextChange={(value) => (formDetails.current.phone = value)}
              errorMessage={formValidation.phone}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Email"
              mode="text"
              placeHolder="Enter Email"
              onTextChange={(value) => (formDetails.current.email = value)}
              errorMessage={formValidation.email}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1.5} px={2} py={1}>
        <Typography color="#232325" variant="h6">
          Educational and Professional Information
        </Typography>
        <Grid container spacing={2} mt={0.1}>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Highest Qualification"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={qualificationList}
              onSelection={(value) =>
                (formDetails.current.qualification = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="University Name"
              mode="text"
              placeHolder="Enter University Name"
              onTextChange={(value) =>
                (formDetails.current.universityName = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DateRangePicker
              label="Year of Graduation"
              onDateChange={(date: any) =>
                (formDetails.current.yearOfGraduation = date)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Occupation"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={occupationList}
              onSelection={(value) => (formDetails.current.occupation = value)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Specialization"
              mode="text"
              placeHolder="Enter Specialization"
              onTextChange={(value) =>
                (formDetails.current.specialization = value)
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Social Media (LinkedIn or Instagram)"
              mode="text"
              placeHolder="Enter Social Media Link"
              onTextChange={(value) =>
                (formDetails.current.socialMedia = value)
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={3}
      >
        <Button
          variant="contained"
          sx={{
            height: 45,
            width: 150,
            boxShadow: "none",
            textTransform: "capitalize",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Dialog
        open={openModel}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#F8F9FA",
            maxWidth: "revert",
            width: 500,
            p: 2,
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>Create Password</DialogTitle>
        <DialogContent>
          <Stack gap={1.5}>
            <TextInput
              label="Create New Password"
              mode="password"
              placeHolder="Enter Password"
              onTextChange={(value: string) =>
                (formDetails.current.password = value)
              }
            />
            <TextInput
              label="Re-enter Password"
              mode="password"
              placeHolder="Re-enter Password"
              onTextChange={(value: string) => {
                repassword.current = value;
                repassword.current = "";
              }}
            />
            {repasswordError.current && (
              <Stack color="error.main">
                <Typography>{repasswordError.current}</Typography>
              </Stack>
            )}
            <Button
              variant="contained"
              sx={{
                height: 45,
                width: 150,
                boxShadow: "none",
                textTransform: "capitalize",
              }}
              onClick={handleSubmitForm}
            >
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
