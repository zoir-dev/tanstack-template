import { X } from "lucide-react"
import { format as formatter } from "date-fns"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect } from "react"
import { DatePicker } from "../ui/date-picker"
import { CalendarProps } from "../ui/calendar"

interface IProps {
    name?: string
    format?: string
    className?: string
    date?: Date | undefined
    setDate?: (date: Date | undefined) => void
    disabled?: boolean
    paramName?: string
    defaultValue?: Date | string,
}

export default function ParamDatePicker({
    format = "yyyy-MM-dd",
    className,
    paramName = "date",
    defaultValue,
    disabled,
    date,
    name,
    setDate,
    fromYear = 1960,
    toYear = new Date().getFullYear(),
    ...props
}: IProps & CalendarProps) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >
    const handleOnChange = (date: string | Date | null | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: date ? formatter(date, format) : undefined,
                },
            })
            return new Date()
        }
        return new Date()
    }

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            })
        }
    }

    useEffect(() => {
        navigate({ search: { ...search, [paramName]: defaultValue } })
    }, [])
    return (
        <div
            className={cn(
                "relative flex items-center justify-between w-auto",
                className,
            )}
        >
            <DatePicker
                date={search?.[paramName]}
                disabled={disabled}
                onDayClick={handleOnChange}
                fromYear={fromYear}
                toYear={toYear}
                format={format}
                {...props}
                className={className}
            />
            {search?.[paramName] && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    )
}
