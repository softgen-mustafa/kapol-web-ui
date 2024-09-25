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
import { getBaseUrl, postAsync } from "@/app/services/rest_services";

interface EducationProfile {
  YearOfCompletion: string;
  InstituteName: string;
  CourseName: string;
}

interface JobProfile {
  MonthOfJoining: string;
  MonthOfLeaving: string;
  CompanyName: string;
  JobTitle: string;
  JobDescription: string;
}

interface UserProfile {
  Guid: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: null;
  DateOfBirthStr: string;
  Gender: string;
  FatherName: string;
  MotherName: string;
  MobileNumber: string;
  EmailAddress: string;
  MaritalStatus: string;
  Pincode: string;
  EducationDetails: EducationProfile[];
  JobDetails: JobProfile[];
}

const Page = () => {
  const router = useRouter();

  const [openModel, setOpenModel] = useState(false);
  const [Gender, setGender] = useState([
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

  const [formDetails, setFormDetails] = useState<UserProfile>({
    Guid: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    DateOfBirth: null,
    DateOfBirthStr: "",
    Gender: Gender[0].value,
    FatherName: "",
    MotherName: "",
    MobileNumber: "",
    EmailAddress: "",
    MaritalStatus: martialStatusList[0].value,
    Pincode: "",
    EducationDetails: [],
    JobDetails: [],
  });

  const password = useRef("");
  const repassword = useRef("");
  const repasswordError = useRef("");

  const [formValidation, setFormValidation] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirthStr: "",
    MobileNumber: "",
    EmailAddress: "",
  });

  const validatingForm = () => {
    const currentFormData = formDetails;

    let newErrors: any = {};

    if (!currentFormData?.FirstName) {
      newErrors.FirstName = "First name is required";
    }
    if (!currentFormData?.LastName) {
      newErrors.LastName = "Last name is required";
    }
    if (!currentFormData?.DateOfBirthStr) {
      newErrors.DateOfBirthStr = "Birthdate is required";
    }
    if (!currentFormData?.MobileNumber) {
      newErrors.MobileNumber = "Phone number is required";
    }
    if (!currentFormData?.EmailAddress) {
      newErrors.EmailAddress = "Email address is required";
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

  const onApi = async () => {
    try {
      const url = `${getBaseUrl()}/user/register`;
      let encoded = Buffer.from(password.current).toString("base64");

      const requestBody = {
        User: formDetails,
        Password: encoded,
      };

      const response = await postAsync(url, requestBody);

      if (response) {
        router.replace("/auth/login");
      }

      console.log("Response:", response);
      handleClose();
    } catch {
      console.log("Error");
    }
  };

  const handleSubmit = () => {
    if (validatingForm()) {
      console.log("Form Details: ", formDetails);
      handleOpen();
    } else {
      console.log("Error", formValidation);
    }
  };

  const handleSubmitForm = () => {
    console.log(password, repassword);
    if (password.current === repassword.current) {
      onApi();
      console.log("Registration Successfull", formDetails);
    } else {
      repasswordError.current = "Password not match";
    }
  };

  const addEducationProfile = () => {
    setFormDetails((prevState: any) => ({
      ...prevState,
      EducationDetails: [
        ...prevState.EducationDetails,
        { YearOfCompletion: "", InstituteName: "", CourseName: "" },
      ],
    }));
  };

  const removeEducationProfile = (index: number) => {
    setFormDetails((prevState) => ({
      ...prevState,
      EducationDetails: prevState.EducationDetails.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateEducationProfile = (
    index: number,
    field: keyof EducationProfile,
    value: string
  ) => {
    const updatedEducationDetails = formDetails.EducationDetails.map(
      (education: any, i) =>
        i === index ? { ...education, [field]: value } : education
    );

    setFormDetails((prevState: any) => ({
      ...prevState,
      EducationDetails: updatedEducationDetails,
    }));
  };

  const addJobProfile = () => {
    setFormDetails((prevState: any) => ({
      ...prevState,
      JobDetails: [
        ...prevState.JobDetails,
        {
          MonthOfJoining: "",
          MonthOfLeaving: "",
          CompanyName: "",
          JobTitle: "",
          JobDescription: "",
        },
      ],
    }));
  };

  const removeJobProfile = (index: number) => {
    setFormDetails((prevState) => ({
      ...prevState,
      JobDetails: prevState.JobDetails.filter((_, i) => i !== index),
    }));
  };

  const updateJobProfile = (
    index: number,
    field: keyof JobProfile,
    value: string
  ) => {
    const updatedJobDetails = formDetails.JobDetails.map((job: any, i) =>
      i === index ? { ...job, [field]: value } : job
    );

    setFormDetails((prevState: any) => ({
      ...prevState,
      JobDetails: updatedJobDetails,
    }));
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
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  FirstName: value,
                }))
              }
              errorMessage={formValidation.FirstName}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Middle Name"
              mode="text"
              placeHolder="Enter Middle Name"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  MiddleName: value,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Last Name"
              mode="text"
              placeHolder="Enter Last Name"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  LastName: value,
                }))
              }
              errorMessage={formValidation.LastName}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DateRangePicker
              label="Date of Birth"
              onDateChange={(date: any) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  DateOfBirthStr: date,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Father Name"
              mode="text"
              placeHolder="Enter Father Name"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  FatherName: value,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Mother Name"
              mode="text"
              placeHolder="Enter Mother Name"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  MotherName: value,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Gender"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={Gender}
              onSelection={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  Gender: value.value,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <DropDown
              label="Marital Status"
              displayFieldKey={"label"}
              valueFieldKey={null}
              selectionValues={martialStatusList}
              onSelection={(selection) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  MaritalStatus: selection.value,
                }))
              }
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Mobile Number"
              mode="text"
              placeHolder="Enter Mobille Number"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  MobileNumber: value,
                }))
              }
              errorMessage={formValidation.MobileNumber}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Email Address"
              mode="text"
              placeHolder="Enter Email Address"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  EmailAddress: value,
                }))
              }
              errorMessage={formValidation.EmailAddress}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Pincode"
              mode="text"
              placeHolder="Enter Pincode"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  Pincode: value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1.5} px={2} py={1}>
        <Typography color="#232325" variant="h6">
          Educational and Professional Information
        </Typography>
        {formDetails.EducationDetails.map((education, index) => (
          <Grid key={index} container spacing={2} mt={0.1}>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Year of Graduation"
                onDateChange={(date: any) =>
                  updateEducationProfile(index, "YearOfCompletion", date)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextInput
                label="Institute Name"
                mode="text"
                placeHolder="Enter Institute Name"
                onTextChange={(value) =>
                  updateEducationProfile(index, "InstituteName", value)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextInput
                label="Course Name"
                mode="text"
                placeHolder="Enter Course Name"
                onTextChange={(value) =>
                  updateEducationProfile(index, "CourseName", value)
                }
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            width: 150,
            height: 45,
            textTransform: "capitalize",
            boxShadow: "none",
          }}
          onClick={addEducationProfile}
        >
          Add Education
        </Button>
      </Box>
      <Box mt={1.5} px={2} py={1}>
        <Typography color="#232325" variant="h6">
          Job Profile
        </Typography>
        {formDetails.JobDetails.map((education, index) => (
          <Grid key={index} container spacing={2} mt={0.1}>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Month Of Joining"
                onDateChange={(date: any) =>
                  updateJobProfile(index, "MonthOfJoining", date)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Month Of Leaving"
                onDateChange={(date: any) =>
                  updateJobProfile(index, "MonthOfLeaving", date)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextInput
                label="Company Name"
                mode="text"
                placeHolder="Enter Company Name"
                onTextChange={(value) =>
                  updateJobProfile(index, "CompanyName", value)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextInput
                label="Job Title"
                mode="text"
                placeHolder="Enter Job Title"
                onTextChange={(value) =>
                  updateJobProfile(index, "JobTitle", value)
                }
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextInput
                label="Job Description"
                mode="text"
                placeHolder="Enter Job Description"
                onTextChange={(value) =>
                  updateJobProfile(index, "JobDescription", value)
                }
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            width: 150,
            height: 45,
            textTransform: "capitalize",
            boxShadow: "none",
          }}
          onClick={addJobProfile}
        >
          Add Job
        </Button>
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
              onTextChange={(value: string) => (password.current = value)}
            />
            <TextInput
              label="Re-enter Password"
              mode="password"
              placeHolder="Re-enter Password"
              onTextChange={(value: string) => {
                repassword.current = value;
                // repassword.current = "";
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
