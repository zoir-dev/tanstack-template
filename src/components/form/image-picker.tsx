import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ClassNameValue } from "tailwind-merge";
import SeeInView from "../ui/see-in-view";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import ErrorMessage from "../ui/error-message";

export default function FormImagePicker<IForm extends FieldValues>({
  name,
  label,
  disabled,
  methods,
  hideError = false,
  className,
  avatar,
}: ImagePickerProps<IForm>) {
  const {
    control,
    formState: { errors },
  } = methods;
  return (
    <div className="w-full flex flex-col items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            {avatar ? (
              <Avatar className={`scale-150 mb-4 ${className}`}>
                {field.value && (
                  <SeeInView
                    url={
                      typeof field.value === "string"
                        ? field.value
                        : field.value && URL.createObjectURL(field.value)
                    }
                  >
                    <AvatarImage
                      src={
                        typeof field.value === "string"
                          ? field.value
                          : field.value && URL.createObjectURL(field.value)
                      }
                      alt="Selected Image"
                      className="object-cover"
                    />
                  </SeeInView>
                )}
                <AvatarFallback>Img</AvatarFallback>
              </Avatar>
            ) : (
              <>
                {field.value ? (
                  <SeeInView
                    url={
                      typeof field.value === "string"
                        ? field.value
                        : field.value && URL.createObjectURL(field.value)
                    }
                  >
                    <img
                      src={
                        typeof field.value === "string"
                          ? field.value
                          : field.value && URL.createObjectURL(field.value)
                      }
                      alt="Selected Image"
                      className={`${className}` || ""}
                    />
                  </SeeInView>
                ) : (
                  <div className={`${className} bg-secondary`}></div>
                )}
              </>
            )}
            <input
              type="file"
              id={name}
              accept="image/*"
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file);
                }
              }}
              hidden
            />
          </div>
        )}
      />
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            !!errors?.[name] && "text-destructive",
            "cursor-pointer pt-2"
          )}
        >
          {label}
        </Label>
      )}
      {!hideError && control._formState.errors?.[name] && (
        <ErrorMessage>
          {control._formState.errors[name]?.message as string}
        </ErrorMessage>
      )}
    </div>
  );
}

interface ImagePickerProps<IForm extends FieldValues> {
  name: Path<IForm>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  methods: UseFormReturn<IForm>;
  hideError?: boolean;
  className?: ClassNameValue;
  avatar?: boolean;
}
