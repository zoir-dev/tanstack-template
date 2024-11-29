import { isValid, format as formatter, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ClassNameValue } from "tailwind-merge";

export function DatePicker({
    date,
    setDate,
    onDateChange,
    placeholder = "Select a date",
    fullWidth,
    disabled,
    defaultValue,
    format = 'dd/MM/yyyy',
    className,
    ...calendarProps
}: {
    date: Date | string | undefined;
    setDate?: (date?: Date | string | null | undefined) => void | undefined,
    onDateChange?: (date?: Date) => void
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    defaultValue?: Date;
    format?: string;
    cassName?: ClassNameValue
} & CalendarProps) {
    const [open, setOpen] = useState(false)
    const value = date ? (typeof date === 'string' ? parse(date, format, new Date()) : date) : (typeof defaultValue === 'string' ? parse(defaultValue, format, new Date()) : defaultValue)
    const displayedDate = value ? formatter(value, 'dd/MM/yyyy') : placeholder
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild onClick={() => setOpen(true)}>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        fullWidth && "w-full",
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayedDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    fromYear={calendarProps?.captionLayout === 'dropdown-buttons' ? 1960 : undefined}
                    toYear={calendarProps?.captionLayout === 'dropdown-buttons' ? new Date().getFullYear() : undefined}
                    mode="single"
                    defaultMonth={value}
                    selected={value}
                    onSelect={(newDate) => {
                        setOpen(false)
                        if (newDate && isValid(new Date(newDate))) {
                            setDate?.(format ? formatter(new Date(newDate), format) : newDate);
                            onDateChange?.()
                        } else {
                            setDate?.(null);
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
