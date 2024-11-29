import { useNavigate, useSearch } from "@tanstack/react-router"
import { format as formatter } from "date-fns"
import { MonthPicker } from "../ui/month-picker"

interface ParamMonthPickerProps {
    format?: string
    className?: string
    paramName?: string
    disabled?: boolean
    callbacks?: MonthCalProps["callbacks"]
    variant?: MonthCalProps["variant"]
    disabledDates?: Date[]
}

const DEFAULT_MONTH_FORMAT = "yyyy-MM"

export default function ParamMonthPicker({
    format = DEFAULT_MONTH_FORMAT,
    paramName = "month",
    disabled,
    callbacks,
    variant,
    disabledDates,
    className,
}: ParamMonthPickerProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: '__root__' }) as Record<
        string,
        string | undefined
    >
    const monthString = search[paramName]

    const handleMonthSelect = (date: Date | string) => {
        if (!disabled) {
            const formattedMonth = formatter(new Date(date), format)
            navigate({
                search: {
                    ...search,
                    [paramName]: formattedMonth,
                },
            })
        }
    }

    return (
        <MonthPicker
            value={monthString}
            setValue={handleMonthSelect}
            callbacks={callbacks}
            variant={variant}
            disabledDates={disabledDates}
            disabled={disabled}
            className={className}
            format={format}
        />
    )
}


type MonthCalProps = {
    value?: Date
    setValue?: (date: Date) => void
    onYearForward?: () => void
    onYearBackward?: () => void
    callbacks?: {
        yearLabel?: (year: number) => string
        monthLabel?: (month: Month) => string
    }
    variant?: {
        calendar?: {
            main?: ButtonVariant
            selected?: ButtonVariant
        }
        chevrons?: ButtonVariant
    }
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    disabled?: boolean
}

type ButtonVariant =
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined
type Month = {
    number: number
    name: string
}
