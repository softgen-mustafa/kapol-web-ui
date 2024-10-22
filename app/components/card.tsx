// "use client";

// import React from "react";
// import { Box, Stack, Typography } from "@mui/material";
// import Image from "next/image";

// interface CardProps {
//   title: string;
//   description: string;
//   imageSrc: any;
//   onClick?: () => void;
// }

// const Card = ({ title, imageSrc, onClick, description }: CardProps) => {
//   return (
//     <Box
//       borderRadius={2}
//       // p={2}
//       sx={{
//         bgcolor: "#FFF8F0",
//         cursor: "pointer",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           bgcolor: "#FFD70020",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for elegance
//         },
//         overflow: "hidden",
//         border: "2px solid #DAA520", // Golden border for a traditional touch
//       }}
//       onClick={onClick}
//     >
//       <Stack
//         flexDirection={{ xs: "column", sm: "row" }} // Stack items in column for small screens and row for larger screens
//         alignItems="center"
//       >
//         {/* Image with dynamic source */}
//         <Image
//           src={imageSrc}
//           alt={title}
//           style={{
//             width: "100px",
//             height: "100px",
//             objectFit: "contain",
//             marginRight: "10px",
//             borderRadius: "12px",
//           }}
//         />
//         <Typography
//           fontSize={{ xs: 18, sm: 18 }}
//           color="#6B4226"
//           fontWeight={600}
//           textAlign={{ xs: "center", sm: "left" }}
//           mt={{ xs: 2, sm: 0 }}
//         >
//           {title}
//         </Typography>

//         <Typography
//           fontSize={{ xs: 18, sm: 18 }}
//           color="#6B4226"
//           fontWeight={600}
//           textAlign={{ xs: "center", sm: "left" }}
//           mt={{ xs: 2, sm: 0 }}
//         >
//           {description}
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

// export default Card;

"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc: any;
  onClick?: () => void;
}

const Card = ({ title, imageSrc, onClick, description }: CardProps) => {
  return (
    <Box
      borderRadius={2}
      sx={{
        display: "flex", // Make the card a flex container
        bgcolor: "#FFF8F0",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "#FFD70020",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for elegance
        },
        overflow: "hidden",
        border: "2px solid #DAA520", // Golden border for a traditional touch
      }}
      onClick={onClick}
    >
      {/* Image takes full height and a fixed width */}
      <Box
        sx={{
          width: "120px", // Set a fixed width for the image
          height: "auto",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          layout="responsive"
          width={100}
          height={100} // Keep the image responsive
          style={{ objectFit: "cover", height: "100%" }} // Ensure image fills the box
        />
      </Box>

      {/* Stack for title and description */}
      <Stack
        flex={1}
        justifyContent="center"
        padding={2} // Add some padding for title and description
      >
        <Typography fontSize={18} color="#6B4226" fontWeight={600}>
          {title}
        </Typography>

        <Typography fontSize={16} color="#6B4226" fontWeight={400}>
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Card;
