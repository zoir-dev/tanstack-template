import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ClassNameValue } from "tailwind-merge";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  wrapperClassName?: ClassNameValue;
  hideError?: boolean;
}

export default function FormInput<IForm extends FieldValues>({
  methods,
  name,
  label,
  wrapperClassName,
  className,
  type = "text",
  hideError = false,
  ...props
}: IProps<IForm> & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = methods;

  const reg = register(name);

  const { disabled, ...otherProps } = props;

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
      <Input
        type={type}
        {...reg}
        {...otherProps}
        disabled={disabled || methods.formState.disabled}
        placeholder={props.placeholder || label}
        id={name}
        fullWidth
      />
      {!hideError && errors[name] && (
        <ErrorMessage className="-mt-1">
          {errors[name]?.message as string}
        </ErrorMessage>
      )}
    </fieldset>
  );
}
