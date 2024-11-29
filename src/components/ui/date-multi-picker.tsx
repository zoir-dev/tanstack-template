import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { parse, isValid } from "date-fns";
import { uz } from "date-fns/locale";
import { ClassNameValue } from "tailwind-merge";
import convertDate from "@/lib/convert-date";

type DateMultiPickerProps = {
    dates: (Date | string)[];
    setDates: (dates: Date[]) => void;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    defaultMonth?: Date;
    format?: string;
    className?: ClassNameValue;
};

export function DateMultiPicker({
    dates,
    setDates,
    placeholder = "Select dates",
    fullWidth,
    disabled,
    defaultMonth,
    format = "dd/MM/yyyy",
    className,
    ...calendarProps
}: DateMultiPickerProps & CalendarProps) {
    const parsedDates = (values: (Date | string)[]) => {
        return values?.map((date) => {
            if (typeof date === "string") {
                return parse(date, format, new Date());
            }
            return date;
        });
    }

    const handleOnChange = (selectedDates: Date[] | undefined) => {
        if (!disabled) {
            setDates(selectedDates || []);
        }
    };

    const reset = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        if (!disabled) {
            setDates([]);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Button
                        variant="outline"
                        className={cn(
                            "pr-3 lex items-center justify-start text-left font-normal w-full",
                            !parsedDates(dates)?.length && "text-muted-foreground",
                            className
                        )}
                        type="button"
                        disabled={disabled}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {parsedDates(dates)?.length > 0 ? (
                            <p className="truncate mr-5">
                                {parsedDates(dates)?.map((date) => convertDate(date, true, calendarProps.captionLayout === 'dropdown-buttons')).join(", ")}
                            </p>
                        ) : (
                            <span className="truncate">{placeholder}</span>
                        )}
                    </Button>
                    {parsedDates(dates)?.length > 0 && !disabled && (
                        <X
                            onClick={reset}
                            className="text-destructive absolute right-3 cursor-pointer z-10 top-3"
                            size={16}
                        />
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    {...calendarProps}
                    fromYear={calendarProps?.captionLayout === 'dropdown-buttons' ? 1960 : undefined}
                    toYear={calendarProps?.captionLayout === 'dropdown-buttons' ? 2050 : undefined}
                    defaultMonth={defaultMonth}
                    mode="multiple"
                    selected={parsedDates(dates)}
                    onSelect={(selectedDates) =>
                        handleOnChange(selectedDates?.filter(isValid) || [])
                    }
                    initialFocus
                    locale={uz}
                />
            </PopoverContent>
        </Popover>
    );
}
