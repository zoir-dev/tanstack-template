import { useNavigate, useSearch } from "@tanstack/react-router"
import AnimatedTabs from "../custom/tabs"

interface ParamTabsProps {
    options: {
        id: string | number
        name: string | number
        content?: React.ReactNode
    }[]
    paramName?: string
    disabled?: boolean
    onAdd?: () => void
    cleanOthers?: boolean
    returnValue?: "name" | "id"
    onValueChange?: (val: string | number) => void
}

const ParamAnimatedTabs: React.FC<ParamTabsProps> = ({
    options,
    paramName = "tab",
    disabled = false,
    onAdd,
    cleanOthers = false,
    returnValue = 'id',
    onValueChange
}) => {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >
    const currentTab = search[paramName] || options[0]?.[returnValue]

    const handleTabChange = (tab: string | number) => {
        onValueChange?.(tab)
        if (tab === "add") {
            onAdd?.()
        } else {
            if (disabled || tab === currentTab) return
            cleanOthers ?
                navigate({ search: { [paramName]: tab } as any })
                :
                navigate({ search: { ...search, [paramName]: tab } as any })
        }
    }

    return (
        <AnimatedTabs
            options={options} value={currentTab} setValue={handleTabChange} returnValue={returnValue} />
    )
}

export default ParamAnimatedTabs
