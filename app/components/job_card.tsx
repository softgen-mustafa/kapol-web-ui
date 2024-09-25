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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUnapply}
            sx={{ mt: 2 }}
          >
            Unapply
          </Button>
        ) : (
          status === "all" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              sx={{ mt: 2 }}
            >
              Apply
            </Button>
          )
        )}
      </Stack>
    </Box>
  );
};

export default JobCard;
