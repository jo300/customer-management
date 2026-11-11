import { Routes } from "@angular/router";
import { authGuard } from "../../core/models/auth/auth.guard";

export const REPORT_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./reports.component").then((m) => m.ReportsComponent),
    canActivate: [authGuard],
  },
];
