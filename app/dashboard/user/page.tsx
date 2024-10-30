"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  getAsync,
  getBaseUrl,
  multiPartAsync,
  postAsync,
} from "@/app/services/rest_services";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { images } from "@/app/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/text_inputs";
import { DateRangePicker } from "@/app/components/date_ui";
import { DropDown } from "@/app/components/drop_down";
import { fetchCurrentUser, setUser } from "@/app/services/Local/helper";
import ImageModal from "@/app/components/image_modal";

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
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  Country: string;
}

// interface UserProfile {
//   Guid: string;
//   FirstName: string;
//   MiddleName: string;
//   LastName: string;
//   DateOfBirth: null;
//   DateOfBirthStr: string;
//   Gender: string;
//   FatherName: string;
//   MotherName: string;
//   MobileNumber: string;
//   EmailAddress: string;
//   MaritalStatus: string;
//   Pincode: string;
//   EducationDetails: EducationProfile[];
//   JobDetails: JobProfile[];
// }

const Page = () => {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<UserProfile | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
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
  const profileImage = useRef("");
  let userDetails = fetchCurrentUser();

  useEffect(() => {
    loadAllImages();
  }, []);

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

  const handleChange = (e: any) => {
    if (e.target.files) {
      setImageFile(Array.from(e.target.files));
    }
  };

  // const uploadImage = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const url = `${getBaseUrl()}/imageservice/upload`;

  //     const formData = new FormData();
  //     formData.append("user_guid", userDetails?.Guid);
  //     formData.append("category", "profile");
  //     imageFile.forEach((file) => {
  //       formData.append("image", file);
  //     });

  //     const response = await multiPartAsync(url, formData);
  //     console.log("Response:", response);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const uploadImage = async (e: any) => {
    e.preventDefault();
    setIsUploading(true); // Set loading state to true when upload starts

    try {
      const url = `${getBaseUrl()}/imageservice/upload`;

      const formData = new FormData();
      formData.append("user_guid", userDetails?.Guid);
      formData.append("category", "profile");
      imageFile.forEach((file) => {
        formData.append("image", file);
      });

      const response = await multiPartAsync(url, formData);
      console.log("Response:", response);
      await loadAllImages();

      // Optional: Show success message
      alert("Image uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
      // Optional: Show error message
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const loadAllImages = async () => {
    try {
      const url = `${getBaseUrl()}/imageservice/images/${
        userDetails.Guid
      }/profile`;
      const response = await getAsync(url);
      setImagesList(response);
      if (response) {
        profileImage.current = `${getBaseUrl()}/imageservice/image/${
          userDetails?.Guid
        }/profile/${response[0]}`;
      }
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box
      p={2}
      sx={{
        bgcolor: "#FFF8F0",
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{
            width: 150,
            height: 45,
            // boxShadow: "none",
            // textTransform: "capitalize",
            px: 3,
            // py: "auto",
            borderRadius: "12px",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
            "&:hover": {
              background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
            },
            textTransform: "capitalize",
          }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => router.back()}
          className="-mt-40 justify-end"
        >
          Back
        </Button>
      </Box>
      <Box className="flex flex-row items-center justify-between">
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
          sx={{
            gap: 2,
            alignItems: "center",
            flexDirection: { xs: "row", md: "row" },
            mt: { xs: 0, md: -6 },
            ml: { xs: 0, md: 0 },
          }}
        >
          <Image
            src={!!profileImage.current ? profileImage.current : images.profile}
            alt="loading"
            width={120}
            height={120}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              borderWidth: 2,
              borderColor: "#222222",
              width: "120px",
              height: "120px",
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
            <Button
              variant="contained"
              sx={{
                width: 150,
                height: 30,
                // boxShadow: "none",
                textTransform: "capitalize",
                // textTransform: "capitalize",
                backgroundImage:
                  "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron gradient
                color: "white", // White text color
                padding: "10px 20px", // Padding for a clean look
                borderRadius: "8px", // Rounded corners
                boxShadow: 2, // Soft shadow
                transition:
                  "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transitions
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)", // Hover effect
                  transform: "translateY(-2px)", // Lift effect
                  boxShadow: 4, // Increased shadow on hover
                },
                "&:active": {
                  transform: "translateY(0)", // Reset transform on click
                  boxShadow: 2, // Reduced shadow on click
                },
              }}
              onClick={() => setOpenModal(true)}
            >
              View Photos
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box mt={1.5} py={1} sx={{ py: 1, mt: { xs: 1, md: 1.5 } }}>
        <Typography color="#232325" variant="h6" fontWeight={"bold"}>
          Personal Information
        </Typography>
        <Grid container spacing={2} mt={0.2}>
          <Grid item md={4} sm={6} xs={12}>
            <Typography className="text-slate-900">Upload Photos</Typography>
            <form className="flex flex-col lg:flex-row md:flex-col sm:flex-col items-center gap-2 p-4 bg-yellow-50 rounded-lg shadow-md">
              <input
                type="file"
                multiple
                onChange={handleChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
               file:text-sm file:font-semibold file:bg-indigo-50
               file:text-indigo-600 hover:file:bg-indigo-100
               text-gray-600 rounded-lg border border-gray-300 p-2 w-full sm:w-auto"
              />

              <button
                onClick={uploadImage}
                disabled={isUploading}
                className={`w-full sm:w-auto px-4 py-2 font-semibold rounded-lg shadow transition-all duration-200
      ${
        isUploading
          ? "bg-indigo-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
      text-white`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </form>
          </Grid>
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
          Address Information
        </Typography>
        <Grid container spacing={2} mt={0.2}>
          <Grid item md={6} sm={12} xs={12}>
            <TextInput
              label="Address Line 1"
              mode="text"
              placeHolder="Enter Address Line 1"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  AddressLine1: value,
                }))
              }
              isDisabled={!isEdit}
              defaultValue={formDetails?.AddressLine1}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextInput
              label="Address Line 2"
              mode="text"
              placeHolder="Enter Address Line 2"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  AddressLine2: value,
                }))
              }
              isDisabled={!isEdit}
              defaultValue={formDetails?.AddressLine2}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="City"
              mode="text"
              placeHolder="Enter City"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  City: value,
                }))
              }
              isDisabled={!isEdit}
              defaultValue={formDetails?.City}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="State"
              mode="text"
              placeHolder="Enter State"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  State: value,
                }))
              }
              isDisabled={!isEdit}
              defaultValue={formDetails?.State}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <TextInput
              label="Country"
              mode="text"
              placeHolder="Enter Country"
              onTextChange={(value) =>
                setFormDetails((prevState: any) => ({
                  ...prevState,
                  Country: value,
                }))
              }
              isDisabled={!isEdit}
              defaultValue={formDetails?.Country}
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
            // boxShadow: "none",
            textTransform: "capitalize",
            backgroundImage: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)", // Saffron gradient
            color: "white", // White text color
            padding: "10px 20px", // Padding for a clean look
            borderRadius: "8px", // Rounded corners
            boxShadow: 2, // Soft shadow
            transition:
              "background-color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transitions
            "&:hover": {
              backgroundImage:
                "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)", // Hover effect
              transform: "translateY(-2px)", // Lift effect
              boxShadow: 4, // Increased shadow on hover
            },
            "&:active": {
              transform: "translateY(0)", // Reset transform on click
              boxShadow: 2, // Reduced shadow on click
            },
          }}
          onClick={handleSaveEdit}
        >
          {isEdit ? "Save" : "Edit Profile"}
        </Button>
      </Box>
      <ImageModal
        images={imagesList}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default Page;
