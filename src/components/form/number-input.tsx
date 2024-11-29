import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  formatOptions?: Intl.NumberFormatOptions;
  wrapperClassName?: string;
  thousandSeparatmor?: string;
  decimalSeparator?: string;
  hideError?: boolean;
}

export default function FormNumberInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  wrapperClassName,
  className,
  formatOptions,
  thousandSeparator,
  decimalSeparator,
  hideError = false,
  ...props
}: IProps<IForm> & NumericFormatProps) {
  const {
    field: { onChange, ref, ...field },
    fieldState,
  } = useController({
    name,
    control: methods.control,
  });

  return (
    <fieldset className={cn("flex flex-col gap-2 w-full", wrapperClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            !!methods.control._formState.errors?.[name] && "text-destructive",
            "cursor-pointer"
          )}
        >
          {label}
        </Label>
      )}
      <label className="relative flex items-center">
        <NumericFormat
          id={name}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            fieldState.isTouched &&
              !!fieldState.error &&
              !label &&
              "border-destructive focus:border-border !ring-destructive"
          )}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          getInputRef={ref}
          {...props}
          {...field}
          onValueChange={(val) => {
            onChange(val.value);
          }}
          placeholder={props.placeholder || label}
          disabled={field.disabled || props.disabled}
        />
      </label>
      {fieldState.error && !hideError && (
        <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
      )}
    </fieldset>
  );
}
