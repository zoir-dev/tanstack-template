import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";
import { Slider } from "../ui/slider";

export default function FormSlider<IForm extends FieldValues>({
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  methods,
  hideError = false,
}: SliderProps<IForm>) {
  const {
    control,
    formState: { errors },
  } = methods;
  return (
    <fieldset className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={label ? "flex flex-col gap-3" : ""}>
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
            <Slider
              min={min}
              max={max}
              step={step}
              value={[field.value || min]}
              onValueChange={(val) => field.onChange(val?.[0])}
              disabled={disabled}
            />
          </div>
        )}
      />
      {!hideError && control._formState.errors?.[name] && (
        <ErrorMessage className="pt-2">
          {control._formState.errors[name]?.message as string}
        </ErrorMessage>
      )}
    </fieldset>
  );
}

interface SliderProps<IForm extends FieldValues> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  hideError?: boolean;
}
