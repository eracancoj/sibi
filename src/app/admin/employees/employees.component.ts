import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FirebaseService } from '@core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'
import { AddEmployeeComponent } from './components';
import { FormBuilder, Validators } from '@angular/forms';
// import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog'

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource: any;

  employees: object[] = [];

  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getEmployees();
  }

  jsonNames = [
    'nacionalidad_pais',
    'tipo_discapacidad',
    'estado_civil',
    'doc_identificacion',
    'municipios',
    'sexo',
    'nivel_educativo',
    'pueblo_pertenencia',
    'comunidad_linguistica',
    'temporalidad_contrato',
    'tipo_contrato',
    'ocupacion',
    'jornada_trabajo',
  ];

  getEmployees() {
    this.firebaseService.getEmployees().subscribe({
      next: (resp) => {
        this.employees = resp;
        this.dataSource = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  viewEmployee(id:string){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  
  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: {id: '1', nombre: 'juanita'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  // cargar JSON files
  async addDoc(collectionName: string, doc: any) {
    await this.firebaseService.addDocs(collectionName, doc);
  }
  loadJsonFiles() {
    const requests = this.jsonNames.map((fileName) => {
      return this.http
        .get(`../../../../../assets/json/${fileName}.json`)
        .subscribe((doc) => {
          this.addDoc(fileName, doc);
          console.log('---');
        });
    });
  }

}
