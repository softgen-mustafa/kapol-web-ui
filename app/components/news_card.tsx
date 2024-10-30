import React from "react";
import { Avatar, Box, Card, IconButton, Typography } from "@mui/material";
import { Block, Delete, Edit } from "@mui/icons-material";

interface NewsCardProps {
  data: any;
  onCardClick: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onReportClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  data,
  onCardClick,
  onEditClick,
  onDeleteClick,
  onReportClick,
}) => {
  console.log(data);

  return (
    <Card
      className="h-full border-gray-200 shadow-md rounded-lg p-4 md:p-6" // Extra padding on desktop
      sx={{
        backgroundColor: "#FFF8F0",
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "#FFD70020",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        border: "2px solid #DAA520",
      }}
      onClick={onCardClick}
    >
      <div className="flex flex-col md:flex-row items-start space-x-4">
        {/* Avatar */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="w-12 h-12 md:w-16 md:h-16"
        />

        {/* Content Section */}
        <div className="flex-1 mt-4 md:mt-0">
          {/* User Info */}
          <div className="flex items-center justify-between space-x-2">
            <Typography variant="body1" className="font-semibold">
              Modi Harshad C ·2h
            </Typography>
            <Box className="flex items-center gap-2">
              {onEditClick && (
                <IconButton
                  onClick={onEditClick}
                  className="flex items-center justify-center"
                  sx={{
                    width: { xs: 30, md: 40 },
                    height: { xs: 30, md: 40 },
                    color: "#FFFFFF",
                    backgroundColor: "#4CAF50",
                    "&:hover": {
                      backgroundColor: "#388E3C",
                    },
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              )}
            </Box>
          </div>

          {/* Title */}
          <Typography
            fontSize={{ xs: 16, md: 20 }}
            fontWeight="600"
            color="#6B4226"
            className="mt-2"
          >
            <span className="font-bold mr-2">Title:</span>
            {data?.Title}
          </Typography>

          {/* Description */}
          <Typography fontSize={{ xs: 14, md: 16 }} color="#6B4226">
            <span className="font-bold mr-2">Description:</span>
            {data?.Description}
          </Typography>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4">
            {onReportClick && (
              <IconButton
                onClick={onReportClick}
                className="flex items-center justify-center"
                sx={{
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                  color: "#FFFFFF",
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  boxShadow:
                    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                    boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <Block fontSize="small" />
              </IconButton>
            )}

            {onDeleteClick && (
              <IconButton
                onClick={onDeleteClick}
                className="flex items-center justify-center"
                sx={{
                  width: { xs: 30, md: 40 },
                  height: { xs: 30, md: 40 },
                  color: "#FFFFFF",
                  background:
                    "linear-gradient(135deg, #dbc9b3, #bfa286, #8e6d4f)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #a48563, #5f4733)",
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
