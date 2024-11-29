import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function ParamMultiCombobox({
  options,
  paramName,
  label,
  disabled,
  addNew,
  isError,
  returnValue = "id",
  className,
}: {
  options: Item[] | undefined;
  paramName: string;
  label?: string;
  disabled?: boolean;
  addNew?: boolean;
  isError?: boolean;
  returnValue?: "name" | "id";
  className?: string;
}) {
  const navigate = useNavigate();
  const search: any = useSearch({ from: "__root__" }) as Record<
    string,
    string | undefined
  >;
  const currentValues = search[paramName]?.split(",") || [];
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Item) => {
    const val = returnValue === "name" ? option.name : option.id;
    const updatedValues = currentValues.includes(String(val))
      ? currentValues.filter((v: string | number) => v !== String(val))
      : [...currentValues, String(val)];

    navigate({
      search: {
        ...search,
        [paramName]: updatedValues.length ? updatedValues.join(",") : undefined,
      },
    });
  };

  const handleCancel = () => {
    navigate({ search: { ...search, [paramName]: undefined } });
    setOpen(false);
  };

  const sortedData = options?.sort((a, b) => {
    const aSelected = currentValues?.includes(a[returnValue]?.toString());
    const bSelected = currentValues?.includes(b[returnValue]?.toString());
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-muted-foreground font-normal",
            currentValues.length && "text-foreground",
            isError && "!text-destructive",
            className
          )}
          disabled={disabled}
        >
          {currentValues.length
            ? currentValues
                .map(
                  (val: string) =>
                    options?.find((d) => String(d[returnValue]) === val)
                      ?.name || val
                )
                .join(", ")
            : label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <div className="relative">
            <CommandInput placeholder={label} />
            {currentValues.length > 0 && (
              <span className="absolute cursor-pointer text-destructive top-1.5 right-1 p-1 z-20">
                <X
                  className="text-destructive"
                  width={16}
                  onClick={handleCancel}
                />
              </span>
            )}
          </div>
          <CommandList>
            <CommandEmpty>Mavjud emas</CommandEmpty>
            <CommandGroup>
              {sortedData?.map((d, i) => (
                <CommandItem key={i} onSelect={() => handleSelect(d)}>
                  {d.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentValues.includes(String(d[returnValue]))
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              {addNew && (
                <CommandItem
                  onSelect={() =>
                    handleSelect({
                      name: "New Item",
                      id: -1,
                    })
                  }
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
  );
}

type Item = {
  name: string | number;
  id: string | number;
};
