import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { images } from "../assets/images";
import { convertToDate } from "../services/Local/helper";
import { postAsync, getBaseUrl } from "@/app/services/rest_services";

interface JobCardProps {
  data: any;
  status: string;
  onUnapply: (jobGuid: string) => void;
  onApply: (jobGuid: string) => void;
  userGuid: string;
  onCardClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  data,
  status,
  onUnapply,
  onApply,
  userGuid,
  onCardClick,
}) => {
  const router = useRouter();

  const handleUnapply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = `${getBaseUrl()}/jobs/unapply?job_guid=${
        data.Guid
      }&applicant_guid=${userGuid}`;
      await postAsync(url, "");
      onUnapply(data.Guid);
    } catch (error) {
      console.error("Error unapplying from job:", error);
    }
  };

  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = `${getBaseUrl()}/jobs/apply?job_guid=${
        data.Guid
      }&applicant_guid=${userGuid}`;
      await postAsync(url, "");
      onApply(data.Guid);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <Box
      className="h-full bg-white shadow-md rounded-lg p-4"
      sx={{
        backgroundColor: "#FFF8F0",
        borderRadius: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "#FFD70020",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        border: "2px solid #DAA520",
        padding: "20px",
      }}
      onClick={onCardClick}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Stack flexDirection={{ xs: "column", md: "row" }} spacing={1}>
          {/* Job details and company logo */}
          <Stack flex={1} spacing={1} justifyContent="center">
            <Box
              sx={{
                paddingTop: { xs: "15px", md: "0px" },
                paddingLeft: { xs: "10px", md: "10px" },
                paddingBottom: { xs: "0px", md: "0px" },
              }}
            >
              <Image
                src={images.companyLogo}
                alt="Company Logo"
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: "10%",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography fontSize={20} fontWeight="600" color="#6B4226">
              <span className="font-bold mr-1">Company :</span>
              {data?.CompanyName}
            </Typography>

            <Typography color="#6B4226">{data?.Position}</Typography>
          </Stack>
        </Stack>

        <Typography color="#6B4226" mt={2}>
          <span className="font-bold mr-2">Location:</span>
          {data.Location}
        </Typography>
        {/* <Typography color="#6B4226">
          <span className="font-bold mr-2">Description:</span>
          {data?.Description}
        </Typography> */}
        <Typography color="#6B4226">
          <span className="font-bold mr-2">Posted Date:</span>
          {convertToDate(data?.CreatedOn)}
        </Typography>

        <Box
          sx={{
            display: { xs: "block", md: "none" },
            borderBottom: "1px solid #DAA520",
            marginY: 1,
          }}
        />
      </Box>

      {/* Apply/Unapply buttons positioned at the bottom */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        {status === "applied" ? (
          <Button
            variant="contained"
            onClick={handleUnapply}
            sx={{
              px: 3,
              py: 1.2,
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
          >
            Unapply
          </Button>
        ) : (
          status === "all" && (
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "12px",
                background: "linear-gradient(45deg, #FFA726 30%, #FF7043 90%)",
                boxShadow:
                  "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)",
                  boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
                },
                textTransform: "capitalize",
              }}
            >
              Apply
            </Button>
          )
        )}
      </Box>
    </Box>
  );
};

export default JobCard;
