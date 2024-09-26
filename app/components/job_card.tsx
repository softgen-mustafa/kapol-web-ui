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
      p={3}
      className="h-full bg-white shadow-md"
      sx={{ borderRadius: 3, cursor: "pointer" }}
      onClick={onCardClick}
    >
      <Stack flexDirection={"column"} spacing={1}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography fontSize={20} fontWeight={"600"} color="#232325">
              {data?.Position}
            </Typography>
            <Typography color="#232325">{data?.CompanyName}</Typography>
          </Box>
          <Image
            src={images.companyLogo}
            alt="loading"
            style={{
              height: 45,
              width: 45,
              borderRadius: '10%', // Makes the image circular
              boxShadow: '2px  2px  2px  rgba(0, 0, 0.1, 0.3)', // Adds a soft shadow
              objectFit: 'cover',
            }}
          />
        </Stack>
        <Typography color="#232325">
          <span className="font-bold mr-2  ">Location:</span>
          {data.Location}
        </Typography>
        <Typography color="#232325">
          <span className="font-bold mr-2 ">Description:</span>
          {data?.Description}
        </Typography>
        <Typography color="#232325">
          <span className="font-bold mr-2  ">Posted Date:</span>
          {convertToDate(data?.CreatedOn)}
        </Typography>
        {status === "applied" ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUnapply}
            sx={{ 
              mt: 2,
              px: 3,
              py: 1.2,
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
                
              },
              textTransform: "capitalize",
            }}
          >
            Unapply
          </Button>
          </Box>
        ) : (
          status === "all" && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              sx={{ 
              mt: 2,
              px: 3,
              py: 1,
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #04A7E5 30%, #1E90FF 90%)', // Sky Blue to Deep Blue gradient
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1E90FF 30%, #00BFFF 90%)',
                boxShadow: '0px 4px 6px -2px rgba(0,0,0,0.3)',
                
              },
              textTransform: "capitalize", 
              }}
            >
              Apply
            </Button>
            </Box>
          )
        )}
      </Stack>
    </Box>
  );
};

export default JobCard;
