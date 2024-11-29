import ParamCombobox from "@/components/param/combobox";
import ParamDateMultiPicker from "@/components/param/date-multiple-picker";
import ParamDatePicker from "@/components/param/date-picker";
import ParamDateRange from "@/components/param/date-range-picker";
import ParamInput from "@/components/param/input";
import ParamMonthPicker from "@/components/param/month-picker";
import ParamMultiCombobox from "@/components/param/multi-combobox";
import ParamPagination from "@/components/param/pagination";
import ParamRadioGroup from "@/components/param/radio-group";
import ParamSelect from "@/components/param/select";
import ParamTabs from "@/components/param/tabs";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/params")({
  component: ParamComponent,
});

function ParamComponent() {
  return (
    <div className="w-full max-w-lg overflow-hidden mx-auto pt-20 flex flex-col gap-4 px-0.5">
      <ParamInput fullWidth />
      <ParamMonthPicker className="w-full" />
      <ParamDatePicker className="w-full" captionLayout="dropdown-buttons" />
      <ParamDateMultiPicker className="w-full" />
      <ParamDateRange className="w-full" captionLayout="dropdown-buttons" />
      <ParamCombobox
        paramName="color"
        options={colors}
        className="w-full"
        label="Select a color"
      />
      <ParamMultiCombobox
        paramName="colors"
        options={colors}
        className="w-full"
        label="Select colors"
      />
      <ParamSelect
        paramName="color-select"
        options={select_colors}
        className="w-full"
        label="Select a color "
      />
      <ParamPagination totalPages={10} />
      <ParamRadioGroup paramName="color-radio" options={select_colors} />
      <ParamTabs options={select_colors} />
    </div>
  );
}

const colors = [
  {
    name: "Green",
    id: 1,
  },
  {
    name: "Red",
    id: 2,
  },
  {
    name: "Blue",
    id: 3,
  },
];

const select_colors = [
  {
    name: "All",
    id: "all",
  },
  {
    name: "Green",
    id: 1,
  },
  {
    name: "Red",
    id: 2,
  },
  {
    name: "Blue",
    id: 3,
  },
  {
    name: "Yellow",
    id: 4,
  },
  {
    name: "Orange",
    id: 5,
  },
  {
    name: "Purple",
    id: 6,
  },
  {
    name: "Pink",
    id: 7,
  },
  {
    name: "Brown",
    id: 8,
  },
];
