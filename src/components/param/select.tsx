import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select2";
import { Plus } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function ParamSelect({
  options,
  paramName,
  label,
  disabled,
  addNew,
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
  const currentValue = search[paramName] || options?.[0]?.[returnValue];

  const handleSelect = (val: string | number) => {
    navigate({
      search: {
        ...search,
        [paramName]: val?.toString()?.includes("all") ? undefined : val,
      },
    });
  };

  return (
    <Select
      onValueChange={(val) =>
        handleSelect(
          options?.find((o) => o[returnValue] == val)?.[returnValue] || ""
        )
      }
      defaultValue={currentValue?.toString()}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-max bg-transparent", className)}>
        <SelectValue placeholder={label || "Tanlang"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem key={option.id} value={option?.id?.toString()}>
              {option.name}
            </SelectItem>
          ))}
          {addNew && (
            <SelectItem key="add" value="other">
              <div className="flex items-center gap-2">
                <Plus />
                Add new
              </div>
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type Item = {
  name: string | number;
  id: string | number;
};
