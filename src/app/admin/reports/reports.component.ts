import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '@core';
import * as XLSX from 'xlsx';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  form: FormGroup;

  displayedColumns: string[] = [
    'nombre',
    'puesto',
    'nit',
    'proyecto',
    'numero_de_cuenta',
    'fecha_inicio',
    'salario',
  ];
  // dataSource: MatTableDataSource<any>;
  employees: any;

  fbService: FirebaseService = inject(FirebaseService);
  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    let i: Date = new Date();
    this.form = this.fb.group({
      init: [''],
      end: [''],
    });

    // this.dataSource = new MatTableDataSource();
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
    this.fbService
      .getDates('contratos', this.init?.value, this.end?.value)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.employees = new MatTableDataSource(resp);
          // this.dataSource = resp;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();
    console.log(this.employees.filter);
  }

  get init() {
    return this.form.get('init');
  }
  get end() {
    return this.form.get('end');
  }
}
