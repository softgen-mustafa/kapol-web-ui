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
      className="mx-auto border border-gray-200 shadow-md rounded-lg p-4"
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
                    backgroundColor: "#03a9f4",
                    "&:hover": {
                      backgroundColor: "#03a9f4",
                    },
                  }}
                >
                  <Edit fontSize="small" />
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
                    backgroundColor: "#03a9f4",
                    "&:hover": {
                      backgroundColor: "#03a9f4",
                    },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>
          </div>
          <Typography fontSize={16} fontWeight="bold">
            {data?.Title}
          </Typography>
          {/* Post Content */}
          <Typography variant="body2" className="mt-2">
            {data?.Description}
          </Typography>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            {onReportClick && (
              <IconButton
                onClick={onReportClick}
                className="flex items-center justify-center"
                sx={{
                  width: 40,
                  height: 40,
                  color: "#FFFFFF",
                  backgroundColor: "#03a9f4",
                  "&:hover": {
                    backgroundColor: "#03a9f4",
                  },
                }}
              >
                <Block fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
