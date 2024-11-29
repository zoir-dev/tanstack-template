import { DateRange } from "react-day-picker"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { DateRangePicker } from "../ui/date-range-picker"
import { CalendarProps } from "../ui/calendar"

interface IProps {
    name?: string
    format?: string
    className?: string
    date?: DateRange | undefined
    setDate?: (range: DateRange | { from: string | undefined, to: string | undefined }) => void
    disabled?: boolean
    from?: string
    to?: string,
    placeholder?: string
}

export default function ParamDateRange({
    name = "date",
    format = "dd/MM/yyyy",
    className,
    from = "from",
    to = "to",
    disabled,
    placeholder = 'Select a date range',
    ...props
}: IProps & CalendarProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >

    const handleOnChange = (range: DateRange | { from: string | undefined, to: string | undefined }) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [from]: range?.from,
                    [to]: range?.to
                },
            })
        }
    }

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [from]: undefined,
                    [to]: undefined,
                },
            })
        }
    }

    return (
        <div
            className={cn(
                "relative flex items-center justify-between min-w-64",
                className,
            )}
        >
            <DateRangePicker
                date={{ from: search?.[from], to: search?.[to] }}
                setDate={handleOnChange}
                disabled={disabled}
                placeholder={placeholder}
                className={className}
                format={format}
                {...props}
            />
            {(search?.[from] || search?.[to]) && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    )
}

