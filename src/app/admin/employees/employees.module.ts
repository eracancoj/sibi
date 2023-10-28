import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from '../../admin/employees/employees.component';
import { materialModules } from 'src/assets/material-imports';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [CommonModule, EmployeesRoutingModule, materialModules],
})
export class EmployeesModule {}
