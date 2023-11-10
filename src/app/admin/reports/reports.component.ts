import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '@core';
import * as XLSX from 'xlsx';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';

import { tipos_reportes } from '@assets';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  form: FormGroup;

  displayedColumns: string[] = ['id', 'tipo'];

  reportType: string = '';
  tipos_reportes = tipos_reportes;
  sibReport: boolean = false;
  yearSelect: boolean = false;

  reports: MatTableDataSource<any>;

  fbService: FirebaseService = inject(FirebaseService);
  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      fecha_inicio: [''],
      fecha_fin: [''],
    });

    this.reports = new MatTableDataSource();
  }

  setYear(date: any, datepicker: MatDatepicker<any>) {
    this.fecha_inicio?.setValue(date);
    this.fecha_fin?.setValue(this.getLastDayOfYear(date));
    console.log(this.form.value);
    datepicker.close();
  }

  ngOnInit() {
    // Crear un nuevo libro (workbook)
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear una hoja de cálculo con datos
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Nombre', 'Edad'],
      ['Alice', 25],
      ['Bob', 30],
      ['Charlie', 35],
    ]);

    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');

    // XLSX.writeFile(workbook, 'excel_download.xlsx');
  }

  getContracts() {
    this.fbService.get('reportes').subscribe({
      next: (resp) => {
        console.log(resp);
        this.reports = new MatTableDataSource(resp);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openSibReport() {
    this.sibReport = true;
    this.yearSelect = true;
    this.reportType = 'SIB';
  }

  openNewReport(reportType: string) {
    this.reportType = reportType;
    console.log(reportType);
  }

  onTipoReporteChange(event: any): void {
    console.log(event);
  }

  getLastDayOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 11, 31);
  }
  getLastDayOfMonth(date: Date): Date {
    const año = date.getFullYear();
    const mes = date.getMonth();
    const diasDelMes = new Date(año, mes + 1, 0).getDate();

    return new Date(año, mes, diasDelMes);
  }

  // GETS
  get fecha_inicio() {
    return this.form.get('fecha_inicio');
  }
  get fecha_fin() {
    return this.form.get('fecha_fin');
  }
}
