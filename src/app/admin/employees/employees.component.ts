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
  dataSource: any;

  employees: object[] = [];

  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getEmployees();
    this.dataSource = [
      {
        id_genero: 'qRpib5fA30WxH9m0LHO9',
        apellido_de_casada: '',
        profesion: 'Computación',
        id_doc_identificacion: 'xNFDtUk5IHpTvHh9akzp',
        numero_de_identificacion: '335989120901',
        primer_nombre: 'Emerson',
        numero_de_identificacion_extranjera: '',
        igss: null,
        segundo_apellido: 'López',
        id_municipio: 'y4m0LPScm1O8dOBYf2sI',
        id_igss_ocupacion: 'bqNjUrCvmtl96q4YSPlJ',
        id_comunidad_linguistica: 'lnIt1YliZc60LEdqU2Cq',
        id_estado_civil: 'a5GmRfCf9qDLHYlp9n6D',
        id_documentos: '',
        id_pueblo_pertenencia: 'CrsHP4sVri89R3n49Iv1',
        tercer_nombre: '',
        id_nivel_educativo: '8kEXHoQCoAl5wtZL8Hbl',
        id_tipo_discapacidad: 'lbEZUxrWiTKQTv4r4759',
        id_temporalidad_contrato: '7z76rLLg3kO09uwT0U5b',
        id_igss_tipo_salario: 'C5XJO6VGAmcsUtRU4Os5',
        fecha_de_nacimiento: {
          seconds: 930376800,
          nanoseconds: 0,
        },
        id_proyecto: 'HUFelaxzNYTgrnXsnUlA',
        id_nacionalidad_pais: '1BD5lXWZr181u9wKVkCC',
        segundo_nombre: 'Fernando',
        id_pais_origen: '1BD5lXWZr181u9wKVkCC',
        numero_de_cuenta: 1,
        id_sexo: '8UlU6AY1v4KK0Bsycns2',
        primer_apellido: 'Racancoj',
        id_jornada_trabajo: 'jXCeQIs5PNZehI2Zxkps',
        numero_de_hijos: 0,
        id_ocupacion: 'eZxEm0RfnGPQG8AQrlp2',
        id: 'zCnUufw3VsbXsvwLoEZS',
        nit: 97802255,
        id_tipo_contrato: 'ce880hdt40Yb4CqpGKGU',
      },
    ];

    console.log('employees');
    console.log(this.dataSource);
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
    // this.firebaseService.getEmployees().subscribe({
    //   next: (resp) => {
    //     this.employees = resp;
    //     this.dataSource = resp;
    //     console.log('this.employees');
    //     console.log(this.employees);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
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
