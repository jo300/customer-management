import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer, CustomerPayload } from "../app/core/models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  private readonly apiUrl = "http://localhost:3000/customers";

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }
  createCustomer(payload: CustomerPayload): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, payload);
  }
  updateCustomer(id: number, payload: CustomerPayload): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, payload);
  }
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
