"use client";

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getBaseUrl } from "../services/rest_services";
import { fetchCurrentUser } from "../services/Local/helper";

interface ImageModalProps {
  images: any[];
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images = [],
  isOpen,
  onClose,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const userDetails = fetchCurrentUser();

  const handleNext = () => {
    setCurrIndex((prevIndex) => (prevIndex + 1) % images?.length);
  };

  const handlePrev = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "45rem",
          },
        },
      }}
    >
      <Stack
        p={2}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={"1.4rem"} color="#232325">
          Photos
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <DialogContent>
        <Typography>Total Photos: {images?.length}</Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <IconButton onClick={handlePrev}>
            <ChevronLeft />
          </IconButton>
          <Box sx={{ flex: 1, height: 600 }}>
            {images?.length > 0 && (
              <Image
                src={`${getBaseUrl()}/imageservice/image/${
                  userDetails?.Guid
                }/profile/${images[currIndex]}`}
                alt="loading"
                width={800}
                height={500}
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
          <IconButton onClick={handleNext}>
            <ChevronRight />
          </IconButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
