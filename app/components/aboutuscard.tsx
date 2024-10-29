"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import theme from "../theme";

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: any;
  type?: "about" | "address" | "bankDetails" | "contact";
}

const AboutUsCard = ({
  title,
  imageSrc,
  description,
  type = "about",
}: CardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  const PhoneLink = ({ number }: { number: string }) => (
    <Link
      href={`tel:${number.replace(/\s+/g, "")}`}
      color="#6B4226"
      sx={{
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
          cursor: "pointer",
        },
      }}
    >
      {number}
    </Link>
  );

  const AddressLink = ({ address }: { address: string }) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    return (
      <Link
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        color="#6B4226"
        sx={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
          },
        }}
      >
        <Box component="span" sx={{ mr: 1 }}>
          {address}
        </Box>
        <OpenInNewIcon sx={{ fontSize: 16 }} />
      </Link>
    );
  };

  const renderCardContent = () => {
    if (type === "address") {
      const fullAddress =
        "103, Maganlal Chambers, Baburao Babade Marg, Lokhan Jatha, Masjid Bunder (E), Mumbai 400 009";

      return (
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography fontWeight="bold">Kapol Yuvak Mandal</Typography>
          <Typography
            variant="body2"
            color="#6B4226"
            sx={{
              "&:hover": {
                bgcolor: "#FFD70010",
                borderRadius: 1,
              },
              padding: 1,
            }}
          >
            <AddressLink address={fullAddress} />
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} color="#6B4226">
            <strong>GST Number:</strong> 27AAATK1631M1ZL
          </Typography>
        </Box>
      );
    } else if (type === "bankDetails") {
      return (
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="body2" fontWeight="bold" color="#6B4226">
            A/c. Name: Ms. Kapol Yuvak Mandal
          </Typography>
          <Typography variant="body2" color="#6B4226">
            Bank: RBL Bank
            <br />
            A/c No.: 309006725857
            <br />
            IFSC Code: RATN0000053
            <br />
            Branch: Kandivali(W), Mumbai
          </Typography>
        </Box>
      );
    } else if (type === "contact") {
      return (
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="body2" fontWeight="bold" color="#6B4226">
            Contact Numbers:
          </Typography>
          <Typography variant="body2" color="#6B4226">
            <PhoneLink number="+91 73049 64515" />
            <br />
            <PhoneLink number="+91 22 2348 0338" />
            <br />
            <PhoneLink number="+91 22 2348 3463" />
            <br />
            <PhoneLink number="+91 22 4973 1774" />
          </Typography>
          <br />
          <Typography variant="body2" fontWeight="bold" color="#6B4226">
            Email:
          </Typography>
          <Link
            href="mailto:kapolApp@gmail.com"
            color="#6B4226"
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="body2">kapolApp@gmail.com</Typography>
          </Link>
        </Box>
      );
    } else {
      return (
        <Typography fontSize={14} color="#6B4226" fontWeight={400}>
          {description}
        </Typography>
      );
    }
  };

  const icon =
    type === "address" ? (
      <LocationOnIcon />
    ) : type === "bankDetails" ? (
      <AccountBalanceIcon />
    ) : type === "contact" ? (
      <PhoneIcon />
    ) : null;

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionToggle}
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          bgcolor: "#FFF8F0",
          borderRadius: 2,
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "#FFD70020",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
          overflow: "hidden",
          border: "1px solid #DAA520",
          paddingY: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {icon && (
            <Box
              sx={{
                marginX: { xs: 1, md: 2 },
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </Box>
          )}
          <Stack
            flex={1}
            justifyContent="center"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography fontSize={16} color="#6B4226" fontWeight={600}>
              {title}
            </Typography>
          </Stack>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          paddingX: 2,
          paddingY: 1,
          bgcolor: theme.palette.customColors.parchmentLight1,
          borderRadius: 2,
        }}
      >
        {renderCardContent()}
      </AccordionDetails>
    </Accordion>
  );
};

export default AboutUsCard;
