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
      className="h-full border-gray-200 shadow-md rounded-lg p-4"
      sx={{
        backgroundColor: "#FFF8F0", // Warm background color
        borderRadius: 3,
        cursor: "pointer",
        transition: "all 0.3s ease", // Smooth transition
        "&:hover": {
          background: "#FFD70020", // Subtle hover effect
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow on hover
        },
        border: "2px solid #DAA520", // Saffron border
      }}
      onClick={onCardClick}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="w-12 h-12"
        />

        {/* Content Section */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center justify-between space-x-2">
            <Typography variant="body1" className="font-semibold">
              John Doe · 2h
            </Typography>
            <Box className="flex items-center gap-2">
              {onEditClick && (
                <IconButton
                  onClick={onEditClick}
                  className="flex items-center justify-center"
                  sx={{
                    width: 40,
                    height: 40,
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
          <Typography fontSize={20} fontWeight="600" color="#6B4226">
            <span className="font-bold mr-2 ">Title:</span>
            {data?.Title}
          </Typography>
          {/* Post Content */}
          <Typography color="#6B4226">
            <span className="font-bold mr-2 ">Description:</span>
            {data?.Description}
          </Typography>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4">
            {onReportClick && (
              <IconButton
                onClick={onReportClick}
                className="flex items-center justify-center"
                sx={{
                  width: 40,
                  height: 40,
                  color: "#FFFFFF",
                  backgroundColor: "#d32f2f",
                  "&:hover": {
                    backgroundColor: "#c62828",
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
                  width: 40,
                  height: 40,
                  color: "#FFFFFF",
                  backgroundColor: "#A86A00",
                  paddingRight: 1,
                  "&:hover": {
                    backgroundColor: "#8F5D00",
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
