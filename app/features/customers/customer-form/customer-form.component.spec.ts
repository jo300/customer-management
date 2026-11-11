import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CustomerFormComponent } from "./customer-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card"; // <-- Added
import { MatIconModule } from "@angular/material/icon"; // <-- Added

describe("CustomerFormComponent", () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule, // <-- Added
        MatIconModule, // <-- Added
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid when empty", () => {
    expect(component.form.valid).toBeFalsy();
  });

  it("should be valid with correct data", () => {
    component.form.patchValue({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
    expect(component.form.valid).toBeTruthy();
  });

  it("should emit formSubmit with payload when valid", () => {
    spyOn(component.formSubmit, "emit");

    component.form.patchValue({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: undefined,
      company: undefined,
    });
  });
});
