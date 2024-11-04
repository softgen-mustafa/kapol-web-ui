"use client";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import omySmbol from "@/app/assets/omySmbol.png";
import { convertToDate } from "@/app/services/Local/helper";
import Loading from "../../loading";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Paper,
  Grid2,
  Divider,
} from "@mui/material";
import theme from "@/app/theme";
import profileDetails from "@/app/assets/icons/profileDetails.png";
import profileDetailphone from "@/app/assets/icons/profileDetailphone.png";

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
    <div
      className="flex justify-center items-center min-h-screen p-4 sm:p-8"
      style={{ background: theme.palette.secondary.main }}
    >
      <Paper
        id="profile-detail"
        elevation={4}
        className="w-full sm:w-4/5 max-w-6xl rounded-2xl shadow-2xl bg-transparent flex flex-col"
        sx={{
          borderRadius: "16px",
          border: `2px solid ${theme.palette.highlight.main}`,
          backgroundColor: theme.palette.customColors.parchment,
        }}
      >
        {/* Header Section */}
        <Box className="flex justify-end rounded-t-2xl bg-transparent">
          <button
            onClick={handleDownload}
            className="text-black rounded-t-full mr-3 mt-3 opacity-95 transition duration-200 flex items-center hover:shadow-lg"
          >
            <FileDownloadIcon
              sx={{
                fontSize: "2rem",
                color: theme.palette.customColors.goldenrod,
              }}
            />
          </button>
        </Box>

        <Box
          className="p-4 sm:p-6 flex rounded-t-2xl -mt-11 flex-col md:flex-row items-center"
          sx={{
            background: theme.palette.customColors.cream,
            backgroundImage: {
              md: `url(${profileDetails.src})`,
              xs: `url(${profileDetailphone.src})`,
            },
            backgroundSize: { md: "cover", xs: "cover" },
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Profile Image */}
          <Box className="text-center mt-14 mb-4 md:mt-0 md:mb-0 flex-shrink-0">
            <Avatar
              src={`${getBaseUrl()}/imageservice/image/${
                profile?.Guid
              }/profile/${imagesList[currIndex]}`}
              alt="Profile"
              sx={{
                width: 120,
                height: 120,
                border: `2px solid ${theme.palette.customColors.goldenrod}`,
              }}
              className="rounded-full object-cover ml-5 shadow-lg"
            />
          </Box>

          {/* Name and Contact Information */}
          <Box className="flex-1 text-center md:text-left mx-4">
            <Typography
              variant="h4"
              className="text-2xl md:text-5xl font-roboto hover:text-[#DAA520] transition duration-300"
              sx={{ color: theme.palette.customColors.goldenrod }}
            >
              {profile.FirstName} {profile.MiddleName} {profile.LastName}
            </Typography>
            <Divider
              className="block md:hidden my-2"
              sx={{
                bgcolor: theme.palette.customColors.goldenrod,
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <Typography
              className="text-lg mt-2 hover:text-[#DAA520] transition duration-300"
              sx={{ color: theme.palette.customColors.goldenrod }}
            >
              {profile.FatherName} (Father) | {profile.EmailAddress || ""} |{" "}
              {profile.MobileNumber || ""}
            </Typography>
            <Typography
              className="text-lg mt-2 hover:text-[#DAA520] transition duration-300"
              sx={{ color: theme.palette.customColors.goldenrod }}
            >
              Address: SCO 106, House No: 2096, Sector 71, Mohali
            </Typography>
          </Box>

          {/* Religious Symbol */}
          <Box className="flex-shrink-0 text-right">
            <Avatar
              src={omySmbol.src}
              alt="Om Symbol"
              sx={{ width: 100, height: 100 }}
              className="w-max h-max object-cover opacity-90 hover:opacity-100"
            />
          </Box>
        </Box>

        {/* Personal Information */}
        <Box
          className="p-8 flex flex-wrap justify-between"
          sx={{ bgcolor: theme.palette.customColors.parchment }}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Born:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {convertToDate(profile.DateOfBirth) || ""}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Birth Place:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Mumbai, Maharashtra, India
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Current City:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Dehradun, Uttarakhand, India
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Zodiac:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Aries
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Gotra:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Kashyap, Hindu Banya
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                className="font-semibold text-primary"
                sx={{ color: theme.palette.primary.light }}
              >
                Income:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                ₹5-10 Lakh/Annum
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Other Personal Information */}
        <Box className="p-8" sx={{ bgcolor: theme.palette.customColors.cream }}>
          <Typography
            variant="h6"
            className=" text-lg font-bold mb-4"
            sx={{ color: theme.palette.primary.main }}
          >
            Other Personal Information
          </Typography>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Marital Status:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {profile.MaritalStatus}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Interest:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Cooking
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Blood Group:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                A+
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Personal Traits:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                Loving, Caring
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Family Information */}
        <Box
          className="p-8 bg-gray-100"
          sx={{ bgcolor: theme.palette.customColors.parchment }}
        >
          <Typography
            variant="h6"
            className=" text-lg font-bold mb-4"
            sx={{ color: theme.palette.primary.main }}
          >
            Family Information
          </Typography>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Father:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {profile.FatherName || ""}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Mother:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {profile.MotherName || ""}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Siblings:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {profile.Siblings || "N/A"}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Typography
                className="text-[#6B4226] font-semibold"
                sx={{ color: theme.palette.primary.light }}
              >
                Extended Family:
              </Typography>
              <Typography sx={{ color: theme.palette.customColors.rubyRed }}>
                {profile.ExtendedFamily || "N/A"}
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        <Box
          className="p-6 rounded-b-2xl "
          sx={{
            bgcolor: theme.palette.customColors.cream,
            // border: "1px solid #E0E0E0",
            // width: "100%",
          }}
        >
          <Typography
            variant="h5"
            className="text-xl font-semibold mb-4 text-center"
            sx={{ color: theme.palette.primary.main }}
          >
            Uploaded Images
          </Typography>
          <Divider
            className="flex md:hidden my-2"
            sx={{
              bgcolor: theme.palette.customColors.goldenrod,
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
          <Box
            className="grid grid-cols-2 sm:grid-cols-4 gap-1 mt-3"
            sx={{ bgcolor: theme.palette.customColors.cream }}
          >
            {imagesList.map((image, index) => (
              <Box
                key={index}
                className="flex justify-center"
                sx={{ bgcolor: theme.palette.customColors.cream }}
              >
                <Avatar
                  src={`${getBaseUrl()}/imageservice/image/${
                    profile?.Guid
                  }/profile/${image}`}
                  alt={`Uploaded Image ${index + 1}`}
                  sx={{
                    bgcolor: theme.palette.customColors.cream,
                    width: { xs: "100%", md: "90%" },
                    height: { xs: "100%", md: "90%" },
                    borderRadius: "10px",
                    // border: "2px solid #FFF",
                  }}
                  className="object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default ProfileDetail;
