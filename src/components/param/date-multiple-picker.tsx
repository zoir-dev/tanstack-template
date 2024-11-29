import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { format as formatter } from "date-fns";
import { ClassNameValue } from "tailwind-merge";
import { DateMultiPicker } from "../ui/date-multi-picker";
import { CalendarProps } from "../ui/calendar";

type ParamDateMultiPickerProps = {
  paramName?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  defaultMonth?: Date;
  defaultValue?: Date[];
  className?: ClassNameValue;
  format?: string;
};

export default function ParamDateMultiPicker({
  paramName = "dates",
  placeholder = "Select dates",
  fullWidth,
  disabled,
  defaultMonth,
  defaultValue = [],
  className,
  format = "dd/MM/yyyy",
  ...calendarProps
}: ParamDateMultiPickerProps & CalendarProps) {
  const navigate = useNavigate();
  const search: any = useSearch({ from: "__root__" }) as Record<
    string,
    string | undefined
  >;

  const dateStrings = search[paramName];
  const parsedDates = dateStrings ? dateStrings.split(",") : [];

  const handleOnChange = (dates: Date[] | undefined) => {
    if (!disabled) {
      const formattedDates = dates
        ?.map((date) => formatter(date, format))
        .join(",");
      navigate({
        search: {
          ...search,
          [paramName]: formattedDates || undefined,
        },
      });
    }
  };

  useEffect(() => {
    if (defaultValue.length) {
      const formattedDefault = defaultValue
        .map((date) => formatter(date, format))
        .join(",");
      navigate({
        search: {
          ...search,
          [paramName]: formattedDefault,
        },
      });
    }
  }, [defaultValue, navigate, paramName, search]);

  return (
    <DateMultiPicker
      dates={parsedDates}
      setDates={handleOnChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      defaultMonth={defaultMonth}
      format={format}
      className={className}
      {...calendarProps}
    />
  );
}
