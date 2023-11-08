import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FirebaseService } from '@core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent, ViewEmployeeComponent } from './components';
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
  displayedColumns: string[] = ['id', 'name', 'project'];
  // dataSource: any;

  employees: object[] = [];

  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getEmployees();
    this.employees = [
      {
        numero_de_hijos: 0,
        tercer_nombre: '',
        segundo_nombre: 'Fernando',
        primer_nombre: 'Emerson',
        segundo_apellido: 'Lopez',
        apellido_de_casada: '',
        id_pueblo_pertenencia: 'GViWVLzZ77WOgK1V53GD',
        id: 'tN2tVe66fm8ffHWAsqJQ',
        id_municipio: 'zXbozToIRcPzWTEIRHAS',
        id_nacionalidad_pais: 'Y15GtD4y0tPSCQuOhdn8',
        numero_de_identificacion: '2222222222',
        numero_de_identificacion_extranjera: '',
        primer_apellido: 'Racancoj',
        id_doc_identificacion: 'xNFDtUk5IHpTvHh9akzp',
        id_sexo: '8UlU6AY1v4KK0Bsycns2',
        id_genero: 'qRpib5fA30WxH9m0LHO9',
        id_pais_origen: 'Y15GtD4y0tPSCQuOhdn8',
        id_comunidad_linguistica: 'H3UNoCk0RIEfDQFJG6oC',
        id_estado_civil: 'a5GmRfCf9qDLHYlp9n6D',
        fecha_de_nacimiento: {
          seconds: 865317600,
          nanoseconds: 0,
        },
      },
    ];
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
    this.firebaseService.get('empleados').subscribe({
      next: (resp) => {
        this.employees = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  viewEmployee(employee: object) {
    const dialogRef = this.dialog.open(ViewEmployeeComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: { id: '1', nombre: 'juanita' },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
