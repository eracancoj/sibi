import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from '@core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  employees: object[] = [];

  private firebaseService = inject(FirebaseService);
  private http = inject(HttpClient);

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
        console.log(typeof this.employees);
        console.log(this.employees);
      },
      error: (error) => {
        console.log(error);
      },
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
