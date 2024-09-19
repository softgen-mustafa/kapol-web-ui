"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const format = "DD-MM-YYYY"; // Format of your date string

const DateRangePicker = ({
  label,
  defaultStart = "",
  onDateChange,
  errorMessage,
}: {
  label?: string;
  defaultStart?: string;
  onDateChange: (fromDate?: string) => void;
  errorMessage?: string;
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (defaultStart.length > 0) {
      setDate(dayjs(defaultStart, format));
    }
  }, [defaultStart]);

  return (
    <div className="flex flex-col">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography className="text-lg text-slate-900">{label}</Typography>
        <DatePicker
          value={date}
          views={["year", "month", "day"]}
          onChange={(value) => {
            setDate(value);
            onDateChange(value?.format("DD-MM-YYYY"));
          }}
        />
        <Typography className="text-red-600">{errorMessage}</Typography>
      </LocalizationProvider>
    </div>
  );
};

export { DateRangePicker };
