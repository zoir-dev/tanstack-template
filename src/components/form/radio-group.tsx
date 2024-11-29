import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ClassNameValue } from "tailwind-merge";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import ErrorMessage from "../ui/error-message";

interface SelectOption {
  name: string | number;
  id: string | number;
}

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  options: SelectOption[];
  label?: string;
  className?: ClassNameValue;
  hideError?: boolean;
  returnValue?: "name" | "id";
  disabled?: boolean;
}
export default function FormRadioGroup<IForm extends FieldValues>({
  name,
  disabled,
  methods,
  hideError = false,
  options,
  className,
  label,
  returnValue = "id",
}: IProps<IForm>) {
  const {
    control,
    formState: { errors },
  } = methods;
  const lastReturnValue = useMemo(
    () => returnValue || (options?.[0]?.id ? "id" : "name"),
    [returnValue, options]
  );

  return (
    <fieldset className="space-y-2">
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
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled || field.disabled}
            className={`${className}`}
          >
            {options?.map((option) => (
              <div className="flex items-center space-x-2" key={option.id}>
                <RadioGroupItem
                  id={option?.[lastReturnValue]?.toString()}
                  value={option?.[lastReturnValue]?.toString()}
                />
                <Label
                  htmlFor={option?.[lastReturnValue]?.toString()}
                  className={cn(
                    !!errors?.[name] && "text-destructive",
                    "cursor-pointer"
                  )}
                >
                  {option.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {!hideError && errors?.[name] && (
        <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
      )}
    </fieldset>
  );
}
