"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAsync, getBaseUrl, postAsync } from "@/app/services/rest_services";
import { fetchCurrentUser } from "@/app/services/Local/helper";
import omySmbol from "@/app/assets/omySmbol.png";
import { convertToDate } from "@/app/services/Local/helper";
import Loading from "../../loading";

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
    loadAllImages();
  }, [profile]);

  const handleNext = () => {
    setCurrIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };

  const handlePrev = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? imagesList.length - 1 : prevIndex - 1
    );
  };

  // Function to fetch the user profile based on GUID
  const loadProfile = async () => {
    try {
      const response = await getAsync(`${getBaseUrl()}/user/get?guid=${guid}`);
      if (response && response?.Data) {
        console.log(response?.Data);
        console.log("Response of profile dataa :", JSON.stringify(response));

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
        console.log("Response:", response);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [guid]);

  const handleGoBack = () => {
    router.back();
  };

  // Function to handle liking a profile
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
        console.log("Profile liked successfully!");
      }
    } catch (error) {
      console.log("Error liking profile:", error);
    }
  };

  // Function to handle unliking a profile
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
        console.log("Profile unliked successfully!");
      }
    } catch (error) {
      console.log("Error unliking profile:", error);
    }
  };

  // Function to handle ignoring a profile
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
        console.log("Profile ignored successfully!");
      }
    } catch (error) {
      console.log("Error ignoring profile:", error);
    }
  };

  // Handlers for button actions
  const handleLike = () => {
    likeProfile();
  };

  const handleUnlike = () => {
    unlikeProfile();
  };

  const handleIgnore = () => {
    ignoreProfile();
  };

  // If the profile data is not yet loaded, return a loading indicator
  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gradient-to-r from-gray-200 to-gray-300">
      <div className="w-full sm:w-4/5 max-w-6xl rounded-2xl shadow-2xl bg-white flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFD70020] text-[#6B4226] p-4 sm:p-6 flex flex-col md:flex-row items-center rounded-t-2xl">
          {/* Profile Image */}
          <div className="text-center mb-4 md:mb-0 flex-shrink-0">
            <Image
              src={`${getBaseUrl()}/imageservice/image/${
                profile?.Guid
              }/profile/${imagesList[currIndex]}`}
              alt="Profile"
              width={70}
              height={70}
              className="w-auto h-auto rounded-full object-cover ml-5 border-2 border-[#DAA520]"
            />
          </div>

          {/* Name and Contact Information */}
          <div className="flex-1 text-center md:text-left mx-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold italic hover:text-[#DAA520]">
              {profile.FirstName} {profile.MiddleName} {profile.LastName}
            </h1>
            <p className="text-lg mt-2 hover:text-[#DAA520]">
              {profile.FatherName} (Father) | {profile.EmailAddress || ""} |{" "}
              {profile.MobileNumber || ""}
            </p>
            <p className="text-lg mt-2 hover:text-[#DAA520]">
              Address: SCO 106, House No: 2096, Sector 71, Mohali
            </p>
          </div>

          {/* Religious Symbol */}
          <div className="text-right flex-shrink-0">
            <Image
              src={omySmbol}
              alt="Om Symbol"
              className="w-16 h-16 object-cover justify-self-end opacity-90 hover:opacity-100"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-8 flex flex-wrap justify-between">
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Born:</p>
            <p className="text-purple-700">
              {convertToDate(profile.DateOfBirth) || ""}
            </p>
          </div>
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Birth Place:</p>
            <p className="text-purple-700">Mumbai, Maharashtra, India</p>
          </div>
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Current City:</p>
            <p className="text-purple-700">Dehradun, Uttarakhand, India</p>
          </div>

          {/* More Personal Info */}
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Zodiac:</p>
            <p className="text-purple-700">Aries</p>
          </div>
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Gotra:</p>
            <p className="text-purple-700">Kashyap, Hindu Banya</p>
          </div>
          <div className="text-[#6B4226] w-full sm:w-1/3 mb-6">
            <p className="font-semibold">Income:</p>
            <p className="text-purple-700">₹5-10 Lakh/Annum</p>
          </div>
        </div>

        {/* Other Personal Information */}
        <div className="p-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-b-2xl">
          <h2 className="text-black text-lg font-bold mb-4">
            Other Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <p className="text-[#6B4226] font-semibold">Marital Status:</p>
              <p className="text-purple-700">
                {profile.MaritalStatus.charAt(0).toUpperCase() +
                  profile.MaritalStatus.slice(1)}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#6B4226] font-semibold">Interest:</p>
              <p className="text-purple-700 hover:text-red-700">Cooking</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#6B4226] font-semibold">Blood Group:</p>
              <p className="text-purple-700">A+</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#6B4226] font-semibold">
                Personal Statement:
              </p>
              <p className="text-purple-700">
                LIFE IS AN AMAZING JOURNEY AND SEEK TO LIVE IT IN A WAY THAT IS
                FULL OF HAPPINESS.
              </p>
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="p-8">
          <h2 className="text-black text-lg font-bold mb-4">
            Family Information
          </h2>
          <div className="flex justify-between">
            <div className="flex-1">
              <p className="text-[#6B4226] font-semibold">Father:</p>
              <p className="text-purple-700">{profile.FatherName || ""}</p>
            </div>
            <div className="flex-1">
              <p className="text-[#6B4226] font-semibold">Mother:</p>
              <p className="text-purple-700">{profile.MotherName || ""}</p>
            </div>
          </div>
        </div>

        {/* Education and Work Experience */}
        <div className="p-8 bg-gradient-to-r from-gray-200 to-gray-100 rounded-b-2xl">
          <h2 className="text-black text-lg font-bold mb-4">
            Education/Work Experience
          </h2>
          <div className="flex justify-between">
            <div className="flex-1">
              <p className="text-[#6B4226] font-semibold">Education:</p>
              <p className="text-purple-700">
                {profile.EducationDetails[0]?.CourseName || ""} from{" "}
                {profile.EducationDetails[0]?.InstituteName || ""}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-[#6B4226] font-semibold">Job:</p>
              <p className="text-purple-700">
                {profile.JobDetails[0]?.JobTitle || ""} at{" "}
                {profile.JobDetails[0]?.CompanyName || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
