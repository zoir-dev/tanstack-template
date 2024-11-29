import { format as formatter, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { ClassNameValue } from "tailwind-merge";

export function DateRangePicker({
    date,
    setDate,
    placeholder = "Select a date range",
    disabled,
    defaultValue,
    format = "dd/MM/yyyy",
    className,
    ...calendarProps
}: {
    date: DateRange | undefined;
    setDate: (range: { from: string | undefined; to: string | undefined }) => void;
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: DateRange;
    format?: string;
    className?: ClassNameValue;
} & CalendarProps) {

    const valueFrom = date?.from
        ? typeof date.from === "string"
            ? parse(date.from, format, new Date())
            : date.from
        : defaultValue?.from
            ? typeof defaultValue.from === "string"
                ? parse(defaultValue.from, format, new Date())
                : defaultValue.from
            : undefined;

    const valueTo = date?.to
        ? typeof date.to === "string"
            ? parse(date.to, format, new Date())
            : date.to
        : defaultValue?.to
            ? typeof defaultValue.to === "string"
                ? parse(defaultValue.to, format, new Date())
                : defaultValue.to
            : undefined;

    const displayedDate =
        valueFrom && valueTo
            ? `${formatter(valueFrom, format)} - ${formatter(valueTo, format)}`
            : placeholder;

    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "justify-start text-left font-normal",
                        !date?.from && "text-muted-foreground",
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayedDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    fromYear={calendarProps?.captionLayout === "dropdown-buttons" ? 1900 : undefined}
                    toYear={calendarProps?.captionLayout === "dropdown-buttons" ? new Date().getFullYear() : undefined}
                    {...calendarProps}
                    mode="range"
                    selected={{ from: valueFrom, to: valueTo }}
                    onSelect={(newRange) => {
                        if (newRange?.from && newRange?.to) {
                            setDate({
                                from: formatter(newRange.from, format),
                                to: formatter(newRange.to, format),
                            });
                        } else if (newRange?.from) {
                            setDate({
                                from: formatter(newRange.from, format),
                                to: undefined,
                            });
                        } else {
                            setDate({ from: undefined, to: undefined });
                        }
                    }}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
}
