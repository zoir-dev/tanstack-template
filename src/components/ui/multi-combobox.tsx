import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"

export function MultiCombobox({
    options,
    values,
    setValues,
    label,
    disabled,
    isError,
    returnValue = "id",
}: {
    options: { name: string | number; id: string | number }[] | undefined
    values?: (string | number)[]
    setValues: (val: (string | number)[]) => void
    label: string
    disabled?: boolean
    isError?: boolean
    returnValue?: "id" | "name"
}) {
    const [open, setOpen] = useState(false)

    const handleSelect = (selectedItem: {
        name: string | number
        id: string | number
    }) => {
        const newValue =
            returnValue === "name" ? selectedItem.name : selectedItem.id
        const updatedValues = values?.includes(newValue)
            ? values.filter((v) => v !== newValue)
            : (values || []).concat(newValue)
        setValues(updatedValues)
    }

    const sortedData = options?.sort((a, b) => {
        const aSelected = values?.includes(a[returnValue])
        const bSelected = values?.includes(b[returnValue])
        return aSelected === bSelected ? 0 : aSelected ? -1 : 1
    })

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between font-normal text-muted-foreground",
                        isError && "!text-destructive",
                        values && values?.length > 0 && 'text-foreground'
                    )}
                    disabled={disabled}
                >
                    {values?.length && values?.length < 3
                        ? options
                            ?.filter((d) => values.includes(d[returnValue]))
                            .map((d) => d.name)
                            .join(", ")
                        : values?.length
                            ? values.length + " ta tanlandi"
                            : label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Command>
                    <CommandInput placeholder={label} className="h-10" />
                    {!!values?.length && (
                        <span className="absolute cursor-pointer text-destructive top-1.5 right-1 p-1" onClick={() => { setValues([]); setOpen(false) }}>
                            <X
                                className="text-destructive"
                                width={16}
                            />
                        </span>
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup className="!overflow-y-scroll">
                            {sortedData?.map((d, i) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            values?.includes(d[returnValue])
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
