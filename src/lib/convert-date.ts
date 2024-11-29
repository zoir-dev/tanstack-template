import { format } from "date-fns";
import { uz } from "date-fns/locale";

export default function convertDate(
  date: string | Date,
  not_full?: boolean,
  with_year?: boolean
): string {
  if (date) {
    const givenDate: Date = new Date(date);
    return format(
      givenDate,
      with_year ? "dd/MM/yyyy" : not_full ? "dd-MMM" : "dd-MMMM",
      {
        locale: uz,
      }
    ).toLowerCase();
  } else {
    return "";
  }
}
