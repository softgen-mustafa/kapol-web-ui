"use client";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import omySmbol from "@/app/assets/omySmbol.png";
import { convertToDate } from "@/app/services/Local/helper";
import Loading from "../../loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Avatar, Box, Grid, Typography, Paper, Grid2 } from "@mui/material";
import theme from "@/app/theme";

const ProfileDetail = ({ params }: { params: any }) => {
  const router = useRouter();
  const guid = params.profiledetail;

  const [currIndex, setCurrIndex] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [ignored, setIgnored] = useState(false);

  const userGuid = fetchCurrentUser();

  useEffect(() => {
    loadProfile();
  }, [guid]);

  useEffect(() => {
    if (profile) {
      loadAllImages();
    }
  }, [profile]);

  const loadProfile = async () => {
    try {
      const response = await getAsync(`${getBaseUrl()}/user/get?guid=${guid}`);
      if (response && response?.Data) {
        setProfile(response?.Data);
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  const loadAllImages = async () => {
    try {
      const url = `${getBaseUrl()}/imageservice/images/${
        profile?.Guid
      }/profile`;
      const response = await getAsync(url);
      if (response) {
        setImagesList(response);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const likeProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/like/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 201) {
        setLiked(true);
        setIgnored(false);
      }
    } catch (error) {
      console.log("Error liking profile:", error);
    }
  };

  const unlikeProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/unlike/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 200) {
        setLiked(false);
      }
    } catch (error) {
      console.log("Error unliking profile:", error);
    }
  };

  const ignoreProfile = async () => {
    try {
      const response = await postAsync(
        `${getBaseUrl()}/matrimony/ignore/profile?user_guid=${
          userGuid?.Guid
        }&profile_guid=${guid}`,
        ""
      );
      if (response.status === 201) {
        setIgnored(true);
      }
    } catch (error) {
      console.log("Error ignoring profile:", error);
    }
  };

  if (!profile) {
    return <Loading />;
  }

  const handleDownload = async () => {
    const element = document.getElementById("profile-detail");
    if (!element) {
      console.error("Profile detail element not found.");
      return;
    }

    try {
      // Ensure CORS settings are applied and the element is properly captured
      const canvas = await html2canvas(element, { useCORS: true });

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");

      // Set up PDF size and scale image proportionally
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // Width in mm for A4 paper size
      const pageHeight = 297; // Height in mm for A4 paper size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If image height is larger than A4, handle pagination
      let position = 0;
      if (imgHeight > pageHeight) {
        let heightLeft = imgHeight;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage(); // Add new page if the content is too large
          }
        }
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      // Save the generated PDF
      pdf.save(
        `${profile.FirstName}-${profile.MiddleName}-${profile.LastName}.pdf`
      );
    } catch (error) {
      console.error("Failed to download profile as PDF:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8" style={{ background: theme.palette.secondary.main }} >
      <Paper
        id="profile-detail"
        elevation={4}
        className="w-full sm:w-4/5 max-w-6xl rounded-2xl shadow-2xl bg-transparent flex flex-col"
        sx={{borderRadius:'16px',
          border: `2px solid ${theme.palette.highlight.main}`,
        }}
      >
        <Box className="flex justify-end rounded-t-2xl bg-transparent"

        // sx={{ background: theme.palette.customColors.cream }}
        >
    <button
      onClick={handleDownload}
      className="text-black rounded-full mr-3 mt-3 opacity-95 transition duration-200 flex items-center"
    >
      <FileDownloadIcon sx={{ fontSize: "2rem" }} />
    </button>
  </Box>
        {/* Header Section */}
        <Box
          className=" p-4 sm:p-6 flex rounded-t-2xl -mt-11  flex-col md:flex-row items-center "
          sx={{ background: theme.palette.customColors.cream }}
        >
          {/* Profile Image */}
          <Box className="text-center mb-4 md:mb-0 flex-shrink-0">
            <Avatar
              src={`${getBaseUrl()}/imageservice/image/${
                profile?.Guid
              }/profile/${imagesList[currIndex]}`}
              alt="Profile"
              sx={{ width: 170, height: 170, border: `2px solid ${theme.palette.primary.main}`  }}
              className="rounded-full object-cover ml-5"
            />
          </Box>

          {/* Name and Contact Information */}
          <Box className="flex-1 text-center md:text-left mx-4">
            <Typography
              variant="h3"
              className="text-3xl sm:text-4xl md:text-5xl font-roboto hover:text-[#DAA520]"
            >
              {profile.FirstName} {profile.MiddleName} {profile.LastName}
            </Typography>
            <Typography className="text-lg mt-2 hover:text-[#DAA520]">
              {profile.FatherName} (Father) | {profile.EmailAddress || ""} |{" "}
              {profile.MobileNumber || ""}
            </Typography>
            <Typography className="text-lg mt-2 hover:text-[#DAA520]">
              Address: SCO 106, House No: 2096, Sector 71, Mohali
            </Typography>
          </Box>
          
          
          {/* Religious Symbol */}
          <Box className="flex-shrink-0 text-right">
            <Avatar
              src={omySmbol.src}
              alt="Om Symbol"
              sx={{width: 170, height: 170,}}
              className="w-max h-max object-cover opacity-90 hover:opacity-100"
            />
          </Box>
          
        </Box>

        {/* Personal Information */}
        <Box className="p-8 flex flex-wrap justify-between">
          <Grid container spacing={2}>
            {" "}
            {/* Changed Grid2 to Grid */}
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Born:</Typography>
              <Typography className="text-purple-700">
                {convertToDate(profile.DateOfBirth) || ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Birth Place:</Typography>
              <Typography className="text-purple-700">
                Mumbai, Maharashtra, India
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Current City:</Typography>
              <Typography className="text-purple-700">
                Dehradun, Uttarakhand, India
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Zodiac:</Typography>
              <Typography className="text-purple-700">Aries</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Gotra:</Typography>
              <Typography className="text-purple-700">
                Kashyap, Hindu Banya
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="font-semibold">Income:</Typography>
              <Typography className="text-purple-700">
                ₹5-10 Lakh/Annum
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Other Personal Information */}
        <Box className="p-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-b-2xl">
          <Typography
            variant="h6"
            className="text-black text-lg font-bold mb-4"
          >
            Other Personal Information
          </Typography>
          <Grid2 container spacing={4}>
            {" "}
            {/* Changed Grid2 to Grid */}
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Marital Status:
              </Typography>
              <Typography className="text-purple-700">
                {profile.MaritalStatus.charAt(0).toUpperCase() +
                  profile.MaritalStatus.slice(1)}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Interest:
              </Typography>
              <Typography className="text-purple-700 hover:text-red-700">
                Cooking
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Blood Group:
              </Typography>
              <Typography className="text-purple-700">A+</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Personal Traits:
              </Typography>
              <Typography className="text-purple-700">
                Loving, Caring
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Family Information */}
        <Box className="p-8   rounded-b-2xl">
          <Typography
            variant="h6"
            className="text-black text-lg font-bold mb-4"
          >
            Family Information
          </Typography>
          <Grid2 container spacing={4}>
            {" "}
            {/* Changed Grid2 to Grid */}
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Father:
              </Typography>
              <Typography className="text-purple-700">
                {profile.FatherName || ""}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Mother:
              </Typography>
              <Typography className="text-purple-700">
                {profile.MotherName || ""}
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Education and Work Experience */}
        <Box className="p-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-b-2xl">
          <Typography
            variant="h6"
            className="text-black text-lg font-bold mb-4"
          >
            Education/Work Experience
          </Typography>
          <Grid2 container spacing={2}>
            {" "}
            {/* Changed Grid2 to Grid */}
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Education:
              </Typography>
              <Typography className="text-purple-700">
                {profile.EducationDetails[0]?.CourseName || ""} from{" "}
                {profile.EducationDetails[0]?.InstituteName || ""}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              {" "}
              {/* Changed Grid2 to Grid */}
              <Typography className="text-[#6B4226] font-semibold">
                Job:
              </Typography>
              <Typography className="text-purple-700">
                {profile.JobDetails[0]?.JobTitle || ""} at{" "}
                {profile.JobDetails[0]?.CompanyName || ""}
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
      
    </div>
  );
};

export default ProfileDetail;
