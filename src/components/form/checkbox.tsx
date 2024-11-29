import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";
import { ClassNameValue } from "tailwind-merge";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  wrapperClassName?: ClassNameValue;
  hideError?: boolean;
}
export default function FormCheckbox<IForm extends FieldValues>({
  methods,
  name,
  label,
  hideError = false,
  disabled,
}: IProps<IForm> & { disabled?: boolean }) {
  return (
    <div>
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <div className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || field.disabled}
              id={name}
            />
            <Label
              htmlFor={name}
              className={cn(
                !!methods.control._formState.errors?.[name] &&
                  "text-destructive",
                "cursor-pointer"
              )}
            >
              {label}
            </Label>
          </div>
        )}
      />
      {!hideError && methods.control._formState.errors?.[name] && (
        <ErrorMessage>
          {methods.control._formState.errors[name]?.message as string}
        </ErrorMessage>
      )}
    </div>
  );
}
