"use client";

import { useEffect, useState } from "react";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
const SearchInput = ({
  placeHolder,
  onTextChange,
}: {
  placeHolder: string;
  onTextChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-row w-full ">
      <TextField
        label={placeHolder}
        variant="outlined"
        type={"text"}
        sx={{
          flex: 1,
          borderRadius: "25px", // Increased border radius for circular corners
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            padding: "10px", // Adjusted padding for better usability
            "&:hover fieldset": {
              borderColor: "#6200ee", // Custom hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6200ee", // Custom focused border color
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let updatedValue = event.target.value;
          onTextChange(updatedValue);
        }}
      />
    </div>
  );
};

const TextInput = ({
  label,
  mode,
  placeHolder,
  onTextChange,
  defaultValue,
  multiline = false,
  errorMessage,
  isDisabled = true,
}: {
  label?: string;
  mode: string;
  placeHolder: string;
  onTextChange: (value: string) => void;
  defaultValue?: string;
  multiline?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
}) => {
  const [value, setValue] = useState<any | null>(null);
  const [shrinkLabel, setShrink] = useState(false);
  useEffect(() => {
    if (defaultValue != null) {
      setValue(mode == "number" ? parseInt(defaultValue) : defaultValue);
      setShrink(true);
    } else if (value == null || value.length < 1) {
      setShrink(false);
    }
  }, [defaultValue]);
  return (
    <div>
      <Typography className="text-slate-900">{label}</Typography>
      <TextField
        className="w-full"
        multiline={multiline}
        value={value}
        slotProps={
          {
            // shrink: shrinkLabel,
          }
        }
        placeholder={placeHolder}
        variant="outlined"
        type={mode}
        sx={{
          borderRadius: "25px", // Increased border radius for circular corners
          "& .MuiOutlinedInput-root": {
            // height: "56px", // Increased height
            "&.Mui-disabled": {
              backgroundColor: "#f5f5f5", // Light grey background when disabled
              opacity: 1,
            },
            "&:hover fieldset": {
              borderColor: "#DAA520", // Custom hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#DAA520", // Custom focused border color
            },
          },
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setShrink(true);
          let updatedValue = event.target.value;
          onTextChange(updatedValue);
        }}
        disabled={!isDisabled}
      />
      <Typography className="text-red-600  mt-1 font-semibold">
        {errorMessage}
      </Typography>
    </div>
  );
};

export { TextInput, SearchInput };

// "use client";
// import { useEffect, useState } from "react";
// import { InputAdornment, TextField } from "@mui/material";
// import { Search } from "@mui/icons-material";
// const SearchInput = ({
//   placeHolder,
//   onTextChange,
// }: {
//   placeHolder: string;
//   onTextChange: (value: string) => void;
// }) => {
//   return (
//     <div className="flex flex-row w-full ">
//       <TextField
//         label={placeHolder}
//         variant="outlined"
//         type={"text"}
//         sx={{
//           flex: 1,
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search />
//             </InputAdornment>
//           ),
//         }}
//         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//           let updatedValue = event.target.value;
//           onTextChange(updatedValue);
//         }}
//       />
//     </div>
//   );
// };
// const TextInput = ({
//   mode,
//   placeHolder,
//   onTextChange,
//   defaultValue,
//   multiline = false,
// }: {
//   mode: string;
//   placeHolder: string;
//   onTextChange: (value: string) => void;
//   defaultValue?: string;
//   multiline?: boolean;
// }) => {
//   const [value, setValue] = useState<any | null>(null);
//   const [shrinkLabel, setShrink] = useState(false);
//   useEffect(() => {
//     if (defaultValue != null) {
//       setValue(mode == "number" ? parseInt(defaultValue) : defaultValue);
//       setShrink(true);
//     } else if (value == null || value.length < 1) {
//       setShrink(false);
//     }
//   }, [defaultValue]);
//   return (
//     <div>
//       <TextField
//         className="w-full"
//         multiline={multiline}
//         value={value}
//         InputLabelProps={{
//           shrink: shrinkLabel,
//         }}
//         label={placeHolder}
//         variant="outlined"
//         type={mode}
//         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//           setShrink(true);
//           let updatedValue = event.target.value;
//           onTextChange(updatedValue);
//         }}
//       />
//     </div>
//   );
// };
// export { TextInput, SearchInput };
