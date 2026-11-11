import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";
import { NotFoundComponent } from "./features/not-found/not-found.component";
import { LoginComponent } from "./features/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "login",
    loadComponent: () =>
      import("./features/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "customers",
    loadChildren: () =>
      import("./features/customers/customers.routes").then(
        (m) => m.CUSTOMER_ROUTES,
      ),
  },
  {
    path: "opportunities",
    loadChildren: () =>
      import("./features/oppertunity/opportunities.routes").then(
        (m) => m.OPPORTUNITY_ROUTES,
      ),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./features/reports/reports.routes").then((m) => m.REPORT_ROUTES),
  },
  { path: "**", component: NotFoundComponent },
];
