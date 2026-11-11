import { Pipe, PipeTransform } from "@angular/core";
import { formatPhone } from "../utils/format-phone";

@Pipe({ name: "phoneFormat", standalone: true })
export default class PhoneFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return formatPhone(value);
  }
}
