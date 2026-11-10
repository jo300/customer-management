import { Component } from '@angular/core';
import { CustomerListComponent } from '../customers/customer-list/customer-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomerListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
