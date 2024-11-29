import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";
import { ClassNameValue } from "tailwind-merge";
import { MultiCombobox } from "../ui/multi-combobox";

export default function FormMultiCombobox<IForm extends FieldValues>({
  name,
  label,
  options,
  disabled,
  placeholder,
  methods,
  hideError = false,
  returnValue = "id",
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
          <MultiCombobox
            options={options}
            values={field.value}
            setValues={field.onChange}
            label={placeholder || label || "Tanlang"}
            disabled={control._formState.disabled || disabled}
            isError={!label && !!control._formState.errors?.[name]}
            returnValue={returnValue}
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
  options: { name: string | number; id: string | number }[] | undefined;
  disabled?: boolean;
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  hideError?: boolean;
  returnValue?: "name" | "id";
  wrapperClassName?: ClassNameValue;
}
