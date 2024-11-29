import { FieldValues, Path, UseFormReturn, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select2";
import { ClassNameValue } from "tailwind-merge";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SelectOption {
  name: string | number;
  id?: string | number;
}

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  options: SelectOption[];
  label?: string;
  wrapperClassName?: ClassNameValue;
  hideError?: boolean;
  returnValue?: "name" | "id";
  disabled?: boolean;
}

export default function FormSelect<IForm extends FieldValues>({
  methods,
  name,
  options,
  label,
  wrapperClassName,
  hideError = false,
  returnValue,
  disabled,
}: IProps<IForm>) {
  const lastReturnValue = useMemo(
    () => returnValue || (options?.[0]?.id ? "id" : "name"),
    [returnValue, options]
  );
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <fieldset className={cn("flex flex-col gap-2 w-full", wrapperClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            !!errors?.[name] && "text-destructive",
            "cursor-pointer"
          )}
        >
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              value={field.value?.toString() || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger id={name} disabled={disabled || field.disabled}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option[lastReturnValue]?.toString() || ""}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!hideError && error && (
              <ErrorMessage className="-mt-1">
                {error.message as string}
              </ErrorMessage>
            )}
          </>
        )}
      />
    </fieldset>
  );
}
