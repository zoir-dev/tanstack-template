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
import { CheckIcon, ChevronsUpDown, Plus, X } from "lucide-react"
import { useMemo, useState } from "react"
import { ClassNameValue } from "tailwind-merge"

export function Combobox({
    options,
    value,
    setValue,
    label,
    disabled,
    addNew,
    isError,
    returnValue = "id",
    className,
}: {
    options: Item[] | undefined
    value: string | number | null
    setValue: (val: any) => void
    label: string
    disabled?: boolean
    addNew?: boolean
    isError?: boolean
    returnValue?: "name" | 'id'
    className?: ClassNameValue
}) {
    const [open, setOpen] = useState(false)
    const lastReturnValue = useMemo(() => returnValue || (options?.[0]?.id ? 'id' : 'name'), [returnValue, options]);

    const handleSelect = (option: Item) => {
        const returnVal = lastReturnValue === "name" ? option.name : option.id
        setValue(returnVal)
        setOpen(false)
    }

    const sortedOptions = options?.sort((a, b) => {
        const isASelected = a[lastReturnValue] === value
        const isBSelected = b[lastReturnValue] === value
        return isASelected === isBSelected ? 0 : isASelected ? -1 : 1
    })


    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between bg-background font-normal text-muted-foreground",
                        value && "text-foreground",
                        isError && "!text-destructive",
                        className,
                    )}
                    disabled={disabled}
                >
                    {value
                        ? options?.find((d) => d.id == value)?.name?.toString() || value
                        : label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Command>
                    <CommandInput placeholder={label} />
                    {!!value && (
                        <span className="absolute cursor-pointer text-destructive top-1.5 right-1 p-1" onClick={() => { setValue(null); setOpen(false) }}>
                            <X
                                className="text-destructive"
                                width={16}
                            />
                        </span>
                    )}
                    <CommandList>
                        <CommandEmpty>Mavjud emas</CommandEmpty>
                        <CommandGroup>
                            {sortedOptions?.map((d, i) => (
                                <CommandItem
                                    key={i}
                                    onSelect={() => handleSelect(d)}
                                >
                                    {d.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value == d[lastReturnValue] ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                            {addNew && (
                                <CommandItem
                                    onSelect={() => {
                                        setValue(-1)
                                        setOpen(false)
                                    }}
                                >
                                    <Plus width={20} className="pr-1" /> Yangi qo'shish
                                    <CheckIcon className={cn("ml-auto h-4 w-4")} />
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

type Item = {
    name: string | number
    id?: string | number
}
