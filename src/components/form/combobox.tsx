import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";
import { ClassNameValue } from "tailwind-merge";

export default function FormCombobox<IForm extends FieldValues>({
  name,
  label,
  options,
  disabled,
  placeholder,
  methods,
  onAddNew,
  hideError = false,
  returnValue = "id",
  wrapperClassName,
  addNew,
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
          <Combobox
            options={options}
            value={field.value || ""}
            setValue={(val) => {
              if (val === "new") {
                onAddNew?.("new");
              } else {
                field.onChange(val);
              }
            }}
            label={placeholder || label || "Tanlang"}
            disabled={control._formState.disabled || disabled}
            isError={!label && !!control._formState.errors?.[name]}
            returnValue={returnValue}
            addNew={addNew}
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
  onAddNew?: (val: string | number) => void;
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  hideError?: boolean;
  returnValue?: "name" | "id";
  wrapperClassName?: ClassNameValue;
  addNew?: boolean;
}
