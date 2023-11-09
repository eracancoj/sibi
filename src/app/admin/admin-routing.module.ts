import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reportes',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () => import('@admin').then((m) => m.EmployeesModule),
  },
  {
    path: 'reportes',
    loadChildren: () => import('@admin').then((m) => m.ReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
