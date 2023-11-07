import { Component, inject } from '@angular/core';
import { materialModules } from 'src/assets/material-imports';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [materialModules],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  router: Router = inject(Router);

  goToEmployees() {
    this.router.navigateByUrl('/admin/app', { replaceUrl: true });
  }
  goToReports() {
    this.router.navigateByUrl('/admin/reportes', { replaceUrl: true });
  }
}
