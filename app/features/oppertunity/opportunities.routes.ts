import { Routes } from "@angular/router";
import { authGuard } from "../../core/models/auth/auth.guard";

export const OPPORTUNITY_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("../oppertunity/opportunities/opportunities.component").then(
        (m) => m.OpportunitiesComponent,
      ),
    canActivate: [authGuard],
  },
];
