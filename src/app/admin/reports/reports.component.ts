import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from '@core';
import * as XLSX from 'xlsx';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  form: FormGroup;

  reportType: string = '';

  openSibReport: boolean = false;

  reports: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nombre'];

  fbService: FirebaseService = inject(FirebaseService);
  fb: FormBuilder = inject(FormBuilder);

  date = new FormControl();

  constructor() {
    let i: Date = new Date();
    this.form = this.fb.group({
      init: [''],
      end: [''],
    });

    this.reports = new MatTableDataSource();
  }

  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value!;

    console.log(this.date.value.set());

    // console.log(normalizedMonthAndYear.year());

    // ctrlValue.month(normalizedMonthAndYear.month());
    // ctrlValue.year(normalizedMonthAndYear.year());

    // console.log(ctrlValue.year(normalizedMonthAndYear.year()));
    // this.date.setValue(ctrlValue);
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

  // GETS
  get init() {
    return this.form.get('init');
  }
  get end() {
    return this.form.get('end');
  }
}
