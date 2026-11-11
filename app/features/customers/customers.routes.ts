import { Routes } from "@angular/router";
import { authGuard } from "../../core/models/auth/auth.guard";

export const CUSTOMER_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./customer-list/customer-list.component").then(
        (m) => m.CustomerListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: ":id",
    loadComponent: () =>
      import("./customer-details/customer-details.component").then(
        (m) => m.CustomerDetailsComponent,
      ),
    canActivate: [authGuard],
  },
];
