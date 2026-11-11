import { Directive, ElementRef, HostListener, inject } from "@angular/core";
import { formatPhone } from "../utils/format-phone";

@Directive({ selector: "[appPhoneFormat]", standalone: true })
export class PhoneFormatDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);

  @HostListener("input")
  onInput(): void {
    const input = this.el.nativeElement;
    const formatted = formatPhone(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}
