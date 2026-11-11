import { Component, inject, signal } from "@angular/core";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { AuthService } from "../../../services/auth.service";
import { $localize } from "@angular/localize/init";

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  readonly isMenuOpen = signal(false);

  readonly navLinks: NavLink[] = [
    { label: $localize`:@@navHome:Home`, path: "/" },
    { label: $localize`:@@navCustomers:Customers`, path: "/customers" },
    {
      label: $localize`:@@navOpportunities:Opportunities`,
      path: "/opportunities",
    },
    { label: $localize`:@@navReports:Reports`, path: "/reports" },
  ];

  constructor(private readonly router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
