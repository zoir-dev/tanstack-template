import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";
import { MonthPicker } from "../ui/month-picker";
import { ClassNameValue } from "tailwind-merge";

export default function FormMonthPicker<IForm extends FieldValues>({
  name,
  label,
  disabled,
  placeholder,
  methods,
  hideError = false,
  wrapperClassName,
}: IProps<IForm>) {
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
        render={({ field }) => (
          <MonthPicker
            value={field.value}
            setValue={field.onChange}
            disabled={field.disabled || disabled}
            placeholder={placeholder}
            className="w-full"
          />
        )}
      />
      {!hideError && control._formState.errors?.[name] && (
        <ErrorMessage className="-mt-1">
          {control._formState.errors[name]?.message as string}
        </ErrorMessage>
      )}
    </fieldset>
  );
}

interface IProps<IForm extends FieldValues> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  hideError?: boolean;
  wrapperClassName?: ClassNameValue;
}
