"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { images } from "@/app/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/text_inputs";
import { DateRangePicker } from "@/app/components/date_ui";
import { DropDown } from "@/app/components/drop_down";
import { fetchCurrentUser, setUser } from "@/app/services/Local/helper";

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
  const [formDetails, setFormDetails] = useState<UserProfile | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
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

  const userDetails = fetchCurrentUser();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let url = `${getBaseUrl()}/user/get?guid=${userDetails?.Guid}`;
      let response = await getAsync(url);
      if (response) {
        setFormDetails(response.Data);
      }
      console.log("Response", response);
    } catch {
      console.log("Error");
    }
  };

  const updateUser = async () => {
    try {
      const url = `${getBaseUrl()}/user/update?guid=${userDetails?.Guid}`;

      const response = await postAsync(url, formDetails);

      if (response) {
        setIsEdit(false);
        setUser(formDetails);
      }
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
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
    setFormDetails((prevState: any) => ({
      ...prevState,
      EducationDetails: prevState.EducationDetails.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const updateEducationProfile = (
    index: number,
    field: keyof EducationProfile,
    value: string
  ) => {
    const updatedEducationDetails = formDetails?.EducationDetails.map(
      (education: any, i: number) =>
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
    setFormDetails((prevState: any) => ({
      ...prevState,
      JobDetails: prevState.JobDetails.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const updateJobProfile = (
    index: number,
    field: keyof JobProfile,
    value: string
  ) => {
    const updatedJobDetails = formDetails?.JobDetails.map((job: any, i) =>
      i === index ? { ...job, [field]: value } : job
    );

    setFormDetails((prevState: any) => ({
      ...prevState,
      JobDetails: updatedJobDetails,
    }));
  };

  const handleSaveEdit = () => {
    if (isEdit) {
      updateUser();
    } else {
      setIsEdit(true);
    }
  };

  return (
    <Box p={2}>
      <Box className="flex flex-row items-center justify-between">
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <Image
            src={images.rohit}
            alt="loading"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              borderWidth: 2,
              borderColor: "#222222",
            }}
          />
          <Box>
            <Typography
              variant="h5"
              color="#232325"
            >{`${formDetails?.FirstName} ${formDetails?.LastName}`}</Typography>
            <Typography variant="body1" color="#232325">
              {formDetails?.EmailAddress}
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          sx={{
            width: 150,
            height: 45,
            boxShadow: "none",
            textTransform: "capitalize",
          }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>
      <Box mt={1.5} py={1}>
        <Typography color="#232325" variant="h6" fontWeight={"bold"}>
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
              isDisabled={isEdit}
              defaultValue={formDetails?.FirstName}
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
              isDisabled={isEdit}
              defaultValue={formDetails?.MiddleName}
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
              isDisabled={isEdit}
              defaultValue={formDetails?.LastName}
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
              defaultStart={formDetails?.DateOfBirthStr}
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
              isDisabled={isEdit}
              defaultValue={formDetails?.FatherName}
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
              isDisabled={isEdit}
              defaultValue={formDetails?.MotherName}
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
              onSelection={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  MaritalStatus: value,
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
              isDisabled={false}
              defaultValue={formDetails?.MobileNumber}
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
              isDisabled={false}
              defaultValue={formDetails?.EmailAddress}
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
              isDisabled={false}
              defaultValue={formDetails?.Pincode}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1.5} py={1}>
        <Typography color="#232325" variant="h6" fontWeight={"bold"}>
          Educational and Professional Information
        </Typography>
        {formDetails?.EducationDetails.map((education: any, index: number) => (
          <Grid key={index} container spacing={2} mt={0.1}>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Year of Graduation"
                onDateChange={(date: any) =>
                  updateEducationProfile(index, "YearOfCompletion", date)
                }
                defaultStart={education?.YearOfCompletion}
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
                isDisabled={isEdit}
                defaultValue={education?.InstituteName}
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
                isDisabled={isEdit}
                defaultValue={education?.CourseName}
              />
            </Grid>
          </Grid>
        ))}
        {isEdit && (
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
        )}
      </Box>
      <Box mt={1.5} py={1}>
        <Typography color="#232325" variant="h6" fontWeight={"bold"}>
          Job Profile
        </Typography>
        {formDetails?.JobDetails.map((job: any, index: number) => (
          <Grid key={index} container spacing={2} mt={0.1}>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Month Of Joining"
                onDateChange={(date: any) =>
                  updateJobProfile(index, "MonthOfJoining", date)
                }
                defaultStart={job?.MonthOfJoining}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <DateRangePicker
                label="Month Of Leaving"
                onDateChange={(date: any) =>
                  updateJobProfile(index, "MonthOfLeaving", date)
                }
                defaultStart={job?.MonthOfLeaving}
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
                isDisabled={isEdit}
                defaultValue={job?.CompanyName}
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
                isDisabled={isEdit}
                defaultValue={job?.JobTitle}
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
                isDisabled={isEdit}
                defaultValue={job?.JobDescription}
              />
            </Grid>
          </Grid>
        ))}
        {isEdit && (
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
        )}
      </Box>
      <Box className="flex flex-row items-center justify-center mt-1.5">
        <Button
          variant="contained"
          sx={{
            width: 150,
            height: 45,
            boxShadow: "none",
            textTransform: "capitalize",
          }}
          onClick={handleSaveEdit}
        >
          {isEdit ? "Save" : "Edit Profile"}
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
