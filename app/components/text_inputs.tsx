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
}: {
  label?: string;
  mode: string;
  placeHolder: string;
  onTextChange: (value: string) => void;
  defaultValue?: string;
  multiline?: boolean;
  errorMessage?: string;
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
        InputLabelProps={{
          shrink: shrinkLabel,
        }}
        placeholder={placeHolder}
        variant="outlined"
        type={mode}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setShrink(true);
          let updatedValue = event.target.value;
          onTextChange(updatedValue);
        }}
      />
      <Typography className="text-red-600">{errorMessage}</Typography>
    </div>
  );
};

export { TextInput, SearchInput };
