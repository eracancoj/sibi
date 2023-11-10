import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { materialModules } from 'src/assets/material-imports';
import { ReactiveFormsModule } from '@angular/forms';
import { NewReportComponent } from './components/new-report/new-report.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    materialModules,
    ReactiveFormsModule,
    NewReportComponent,
  ],
})
export class ReportsModule {}
