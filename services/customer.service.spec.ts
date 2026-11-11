import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CustomerService } from "./customer.service";
import { Customer } from "../app/core/models/customer.model";

describe("CustomerService", () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const apiUrl = "http://localhost:3000/customers";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch all customers via GET", () => {
    const dummyCustomers: Customer[] = [
      { id: 1, firstName: "John", lastName: "Doe", email: "j@d.com" },
    ];

    service.getCustomers().subscribe((customers) => {
      expect(customers.length).toBe(1);
      expect(customers).toEqual(dummyCustomers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(dummyCustomers);
  });

  it("should create a customer via POST", () => {
    const newCustomer = {
      firstName: "Jane",
      lastName: "Doe",
      email: "ja@d.com",
    };

    service.createCustomer(newCustomer).subscribe((customer) => {
      expect(customer.id).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush({ id: 2, ...newCustomer });
  });
});
