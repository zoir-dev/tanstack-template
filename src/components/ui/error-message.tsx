import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
    className?: string
}
export default function ErrorMessage({ children, className }: IProps) {
    return (
        <p
            className={cn(
                "text-destructive text-sm font-medium",
                className,
            )}
        >
            {children}
        </p>
    )
}
