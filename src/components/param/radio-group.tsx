import { useNavigate, useSearch } from "@tanstack/react-router";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type RadioOption = {
  id: string | undefined | number;
  name: string | number;
};

type ParamRadioGroupProps = {
  options: RadioOption[];
  paramName: string;
  className?: string;
  disabled?: boolean;
  returnValue?: "name" | "id";
  clearOthers?: boolean;
};

export default function ParamRadioGroup({
  options,
  paramName,
  className,
  disabled,
  returnValue = "id",
  clearOthers,
}: ParamRadioGroupProps) {
  const navigate = useNavigate();
  const params: any = useSearch({ from: "__root__" });

  const currentParamValue = params[paramName];

  const initialValue =
    options
      .find((option) => option?.[returnValue] === currentParamValue)
      ?.[returnValue]?.toString() || options[0]?.id?.toString();
  const handleValueChange = (value: string) => {
    const option = options.find(
      (option) => option[returnValue]?.toString() === value
    );
    const paramVal = option?.[returnValue];
    const searchValue = value?.toString()?.includes("all")
      ? undefined
      : paramVal;

    navigate({
      search: clearOthers
        ? { [paramName]: searchValue }
        : { ...params, [paramName]: searchValue },
    });
  };

  return (
    <div className="overflow-auto w-max max-w-full pb-4">
      <RadioGroup
        className={className || "flex gap-4 w-max overflow-auto"}
        defaultValue={options[0]?.[returnValue]?.toString()}
        value={initialValue?.toString()}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <div className="flex items-center space-x-2 w-auto" key={option.name}>
            <RadioGroupItem
              value={
                option?.[returnValue]?.toString() ||
                option?.id?.toString() ||
                "all"
              }
              id={`${option.id}-radio`}
              className="w-4"
            />
            <Label
              htmlFor={`${option.id}-radio`}
              className="cursor-pointer whitespace-nowrap"
            >
              {option.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
