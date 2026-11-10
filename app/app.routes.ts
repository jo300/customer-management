import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CustomerDetailsComponent } from './features/customers/customer-details/customer-details.component';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { OpportunitiesComponent } from './features/opportunities/opportunities.component';
import { ReportsComponent } from './features/reports/reports.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: 'opportunities', component: OpportunitiesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', component: NotFoundComponent },
];
