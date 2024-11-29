import FormAudioRecord from "@/components/form/audio-record";
import FormCheckbox from "@/components/form/checkbox";
import FormCombobox from "@/components/form/combobox";
import FormDateMultiPicker from "@/components/form/date-multi-picker";
import FormDatePicker from "@/components/form/date-picker";
import FormDateRangePicker from "@/components/form/date-range-picker";
import FormFormatNumberInput from "@/components/form/format-number-input";
import FormImagePicker from "@/components/form/image-picker";
import FormInput from "@/components/form/input";
import FormMonthPicker from "@/components/form/month-picker";
import FormMultiCombobox from "@/components/form/multi-combobox";
import FormNumberInput from "@/components/form/number-input";
import FormRadioGroup from "@/components/form/radio-group";
import FormSelect from "@/components/form/select";
import FormSlider from "@/components/form/slider";
import FormTextarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full max-w-lg mx-auto pt-20">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormImagePicker
          methods={form}
          name="photo"
          label="Image"
          className="w-16 h-16 rounded-md object-cover"
        />
        <FormInput methods={form} name="name" label="Name" />
        <FormTextarea methods={form} name="description" label="Description" />
        <FormNumberInput methods={form} name="age" label="Age" />
        <FormFormatNumberInput
          methods={form}
          name="phone_number"
          format="+998 ## ### ## ##"
          label="Phone number"
        />
        <FormCheckbox methods={form} name="is_active" label="Is active" />
        <FormDatePicker
          methods={form}
          name="birth_date"
          label="Birth date"
          captionLayout="dropdown-buttons"
        />
        <FormDatePicker methods={form} name="plan_date" label="Plan date" />
        <FormDateRangePicker
          methods={form}
          name="date_range"
          label="Date range"
          captionLayout="dropdown-buttons"
        />
        <FormDateMultiPicker
          methods={form}
          name="dates"
          label="Dates"
          captionLayout="dropdown-buttons"
        />
        <FormSelect
          methods={form}
          name="gender"
          options={[
            { name: "Male", id: 1 },
            { name: "Female", id: 2 },
          ]}
          label="Gender"
        />
        <FormCombobox
          methods={form}
          name="color"
          options={colors}
          label="Color"
        />
        <FormMultiCombobox
          methods={form}
          name="multi_colors"
          label="Colors"
          options={colors}
        />
        <FormMonthPicker methods={form} name="month" label="Pick a month" />
        <FormSlider
          methods={form}
          name="lang_val"
          label="Language level"
          step={1}
          min={1}
          max={5}
        />
        <FormRadioGroup
          options={colors}
          methods={form}
          name="color-radio"
          label="Color"
        />
        <FormAudioRecord
          methods={form}
          name="audio"
          name2="comment"
          label="Comment"
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
}

const formSchema = z.object({
  photo: z
    .instanceof(File, { message: "Image is required" })
    .or(z.string({ message: "" }).min(1)),
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Name length must be at least 5" }),
  age: z
    .string({ message: "Age is required" })
    .min(1, "Age must be at least 1")
    .transform((t) => +t),
  phone_number: z
    .string({ message: "Phone number is required" })
    .length(9, "Enter correct phone number"),
  is_active: z.boolean().default(false),
  plan_date: z.string({ message: "Plan date is required" }).min(1),
  birth_date: z
    .string({ message: "Date is required" })
    .min(1, { message: "Date is required" }),
  date_range: z.object({
    from: z
      .string({ message: "Date is required" })
      .min(1, { message: "Date is required" }),
    to: z
      .string({ message: "Date is required" })
      .min(1, { message: "Date is required" }),
  }),
  dates: z.array(
    z
      .string({ message: "Date is required" })
      .min(1, { message: "Date is required" })
  ),
  gender: z.string({ message: "Gender is required" }).transform((t) => +t),
  color: z.number({ message: "Color is required" }).min(1),
  month: z.string({ message: "Select a month" }).min(1),
  description: z
    .string({ message: "Write short description" })
    .min(1, { message: "Write short description" }),
  lang_val: z.number({ message: "Enter lanuage level" }).min(1),
  multi_colors: z
    .array(z.number({ message: "Select colors" }))
    .min(1, { message: "Select colors" }),
  "color-radio": z.string({ message: "Select color" }).min(1),
  audio: z
    .instanceof(File, { message: "Audio is required" })
    .or(z.string({ message: "" }).min(1)),
  comment: z
    .string({ message: "Write comment" })
    .min(1, { message: "Write comment" }),
});

const colors = [
  {
    name: "Red",
    id: 1,
  },
  {
    name: "Blue",
    id: 2,
  },
  {
    name: "Green",
    id: 3,
  },
];
