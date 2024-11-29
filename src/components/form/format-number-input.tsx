import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import ErrorMessage from "../ui/error-message";
import { Label } from "../ui/label";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  formatOptions?: Intl.NumberFormatOptions;
  wrapperClassName?: string;
  thousandSeparatmor?: string;
  decimalSeparator?: string;
  hideError?: boolean;
  format?: string;
}

export default function FormFormatNumberInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  wrapperClassName,
  className,
  formatOptions,
  hideError = false,
  format = "",
  ...props
}: IProps<IForm> & PatternFormatProps) {
  const {
    field: { onChange, ref, ...field },
    fieldState,
  } = useController({
    name,
    control: methods.control,
  });

  return (
    <fieldset className={cn("flex gap-2 flex-col w-full", wrapperClassName)}>
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
        <PatternFormat
          format={format}
          id={name}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            methods.control._formState.errors?.[name] &&
              !label &&
              "border-destructive focus:border-border !ring-destructive"
          )}
          onValueChange={(val) => {
            onChange(val.value);
          }}
          getInputRef={ref}
          {...field}
          {...props}
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
