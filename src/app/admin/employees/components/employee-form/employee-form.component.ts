import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materialModules } from 'src/assets/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from '@core';
import { puestos, proyectos } from '@assets';

@Component({
  standalone: true,
  imports: [materialModules, ReactiveFormsModule, CommonModule],
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: any;
  @Input() edit: boolean = false;

  contract: any;

  formEmployee: FormGroup;
  formContract: FormGroup;
  startDate = new Date(1995, 0, 1);

  sexo: any;
  genero: any;
  estado_civil: any;

  nacionalidad_pais: any;
  municipio: any;
  doc_identificacion: any;
  pueblo_pertenencia: any;
  comunidad_linguistica: any;

  nivel_educativo: any;
  temporalidad_contrato: any;
  tipo_contrato: any;
  ocupacion: any;
  jornada_trabajo: any;
  tipo_discapacidad: any;
  proyectos: any = proyectos;

  igss_ocupacion: any;
  igss_tipo_salario: any;
  puestos: any = puestos;
  documentos: any;

  private fb: FormBuilder = inject(FormBuilder);
  private fbService: FirebaseService = inject(FirebaseService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    this.formEmployee = this.fb.group({
      id: [''],

      primer_nombre: [''],
      segundo_nombre: [''],
      tercer_nombre: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      apellido_de_casada: [''],
      fecha_de_nacimiento: [''],
      id_sexo: [''],
      id_genero: [''],
      id_estado_civil: [''],
      numero_de_hijos: [0],

      id_pais_origen: [''],
      id_nacionalidad_pais: [''],
      id_municipio: [''],

      id_doc_identificacion: [''],
      numero_de_identificacion: [''],
      numero_de_identificacion_extranjera: [''],
      id_pueblo_pertenencia: [''],
      id_comunidad_linguistica: [''],
    });

    this.formContract = this.fb.group({
      id: [''],

      nit: [null],
      igss: [null],
      id_nivel_educativo: [''],
      profesion: [''],
      id_temporalidad_contrato: [''],
      id_tipo_contrato: [''],
      id_ocupacion: [''],
      id_jornada_trabajo: [''],
      id_tipo_discapacidad: [''],
      proyecto: [''],
      fecha_inicio: [''],
      fecha_fin: [''],

      numero_de_cuenta: [null],
      salario: [null],
      id_igss_ocupacion: [''],
      id_igss_tipo_salario: [''],
      puesto: [''],
      id_documentos: [''],
      empleado: [
        {
          primer_nombre: '',
          primer_apellido: '',
          id_empleado: '',
        },
      ],
    });
  }

  ngOnInit() {
    if (this.employee) {
      this.setEmployeeInfo();
      this.enabledFields(false);
      this.getContract();
    }

    this.getSelects();
  }

  async createEmployee() {
    try {
      if (this.employee) {
        const response = await this.fbService.udpate(
          'empleados',
          this.formEmployee.value
        );
        this.openSnackBar('Empleado actualizado');
      } else {
        if (this.primer_nombre?.value) {
          const resp = await this.fbService.create(
            'empleados',
            this.formEmployee.value
          );
          this.id?.setValue(resp.id);
          this.employee = this.formEmployee.value;
          this.openSnackBar('Empleado creado');
        } else {
          this.openSnackBar('Llene almenos el nombre');
        }
      }
    } catch (error) {
      console.log(error);
      this.openSnackBar(error);
    }
  }

  async createContract() {
    try {
      this.empleado?.setValue({
        primer_nombre: this.primer_nombre?.value,
        primer_apellido: this.primer_apellido?.value,
        id_empleado: this.id?.value,
      });

      if (!this.contract) {
        const response = await this.fbService.create(
          'contratos',
          this.formContract.value
        );
        this.openSnackBar('Contrato creado');
      } else {
        const response = await this.fbService.udpate(
          'contratos',
          this.formContract.value
        );
        this.openSnackBar('Contrato actualizado');
      }
    } catch (error) {
      console.log(error);
      this.openSnackBar(error);
    }
  }

  async getContract() {
    const response = await this.fbService
      .getQuery('contratos', 'empleado.id_empleado', '==', this.id?.value)
      .subscribe({
        next: (resp) => {
          if (Object.keys(resp).length !== 0) {
            this.contract = resp[0];
            this.setContractInfo();
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnChanges(changes: any): void {
    if (changes.edit && !changes.edit.firstChange) {
      if (this.edit) {
        this.enabledFields(true);
      }
    }
  }

  setEmployeeInfo() {
    if (this.employee) {
      this.id?.setValue(this.employee.id);

      this.primer_nombre?.setValue(this.employee.primer_nombre);
      this.segundo_nombre?.setValue(this.employee.segundo_nombre);
      this.tercer_nombre?.setValue(this.employee.tercer_nombre);
      this.primer_apellido?.setValue(this.employee.primer_apellido);
      this.segundo_apellido?.setValue(this.employee.segundo_apellido);
      this.apellido_de_casada?.setValue(this.employee.apellido_de_casada);
      this.fecha_de_nacimiento?.setValue(
        new Date(this.employee.fecha_de_nacimiento.seconds * 1000)
      );
      this.id_sexo?.setValue(this.employee.id_sexo);
      this.id_genero?.setValue(this.employee.id_genero);
      this.id_estado_civil?.setValue(this.employee.id_estado_civil);
      this.numero_de_hijos?.setValue(
        this.employee.numero_de_hijos ? this.employee.numero_de_hijos : 0
      );

      this.id_pais_origen?.setValue(this.employee.id_pais_origen);
      this.id_nacionalidad_pais?.setValue(this.employee.id_nacionalidad_pais);
      this.id_municipio?.setValue(this.employee.id_municipio);
      this.id_doc_identificacion?.setValue(this.employee.id_doc_identificacion);
      this.numero_de_identificacion?.setValue(
        this.employee.numero_de_identificacion
      );
      this.numero_de_identificacion_extranjera?.setValue(
        this.employee.numero_de_identificacion_extranjera
      );
      this.id_pueblo_pertenencia?.setValue(this.employee.id_pueblo_pertenencia);
      this.id_comunidad_linguistica?.setValue(
        this.employee.id_comunidad_linguistica
      );
    }
  }

  setContractInfo() {
    this.id_contract?.setValue(this.contract.id);
    this.nit?.setValue(this.contract.nit);
    this.igss?.setValue(this.contract.igss);
    this.id_nivel_educativo?.setValue(this.contract.id_nivel_educativo);
    this.profesion?.setValue(this.contract.profesion);
    this.id_temporalidad_contrato?.setValue(
      this.contract.id_temporalidad_contrato
    );
    this.id_tipo_contrato?.setValue(this.contract.id_tipo_contrato);
    this.id_ocupacion?.setValue(this.contract.id_ocupacion);
    this.id_jornada_trabajo?.setValue(this.contract.id_jornada_trabajo);
    this.id_tipo_discapacidad?.setValue(this.contract.id_tipo_discapacidad);
    this.proyecto?.setValue(this.contract.proyecto);
    this.fecha_inicio?.setValue(
      new Date(this.contract.fecha_inicio.seconds * 1000)
    );
    this.fecha_fin?.setValue(new Date(this.contract.fecha_fin.seconds * 1000));

    this.numero_de_cuenta?.setValue(this.contract.numero_de_cuenta);
    this.salario?.setValue(this.contract.salario);
    this.id_igss_ocupacion?.setValue(this.contract.id_igss_ocupacion);
    this.id_igss_tipo_salario?.setValue(this.contract.id_igss_tipo_salario);
    this.puesto?.setValue(this.contract.puesto);
    this.id_documentos?.setValue(this.contract.id_documentos);
  }

  getSelects() {
    this.fbService.get('sexo').subscribe({
      next: (resp) => {
        this.sexo = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('genero').subscribe({
      next: (resp) => {
        this.genero = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('estado_civil').subscribe({
      next: (resp) => {
        this.estado_civil = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fbService.get('nacionalidad_pais').subscribe({
      next: (resp) => {
        this.nacionalidad_pais = resp.sort((a, b) =>
          a.nacionalidad.localeCompare(b.nacionalidad)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('municipios').subscribe({
      next: (resp) => {
        this.municipio = resp.sort((a, b) =>
          a.municipio.localeCompare(b.municipio)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('doc_identificacion').subscribe({
      next: (resp) => {
        this.doc_identificacion = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('pueblo_pertenencia').subscribe({
      next: (resp) => {
        this.pueblo_pertenencia = resp.sort((a, b) =>
          a.pueblo.localeCompare(b.pueblo)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('comunidad_linguistica').subscribe({
      next: (resp) => {
        this.comunidad_linguistica = resp.sort((a, b) =>
          a.comunidad.localeCompare(b.comunidad)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fbService.get('nivel_educativo').subscribe({
      next: (resp) => {
        this.nivel_educativo = resp.sort((a, b) =>
          a.nivel.localeCompare(b.nivel)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('temporalidad_contrato').subscribe({
      next: (resp) => {
        this.temporalidad_contrato = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('tipo_contrato').subscribe({
      next: (resp) => {
        this.tipo_contrato = resp;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('ocupacion').subscribe({
      next: (resp) => {
        this.ocupacion = resp.sort((a, b) =>
          a.ocupación.localeCompare(b.ocupación)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('jornada_trabajo').subscribe({
      next: (resp) => {
        this.jornada_trabajo = resp.sort((a, b) =>
          a.jornada.localeCompare(b.jornada)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('tipo_discapacidad').subscribe({
      next: (resp) => {
        this.tipo_discapacidad = resp.sort((a, b) =>
          a.discapacidad.localeCompare(b.discapacidad)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    // this.fbService.get('proyectos').subscribe({
    //   next: (resp) => {
    //     this.proyectos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre));
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    this.fbService.get('igss_ocupacion').subscribe({
      next: (resp) => {
        this.igss_ocupacion = resp.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fbService.get('igss_tipo_salario').subscribe({
      next: (resp) => {
        this.igss_tipo_salario = resp.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fbService.get('documentos').subscribe({
      next: (resp) => {
        this.documentos = resp.sort((a, b) =>
          a.descripcion.localeCompare(b.descripcion)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openSnackBar(message: any, action: string = 'ok') {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  enabledFields(status: boolean) {
    if (!status) {
      this.primer_nombre?.disable();
      this.segundo_nombre?.disable();
      this.tercer_nombre?.disable();
      this.primer_apellido?.disable();
      this.segundo_apellido?.disable();
      this.apellido_de_casada?.disable();
      this.fecha_de_nacimiento?.disable();
      this.id_sexo?.disable();
      this.id_genero?.disable();
      this.id_estado_civil?.disable();
      this.numero_de_hijos?.disable();

      this.id_pais_origen?.disable();
      this.id_nacionalidad_pais?.disable();
      this.id_municipio?.disable();
      this.id_doc_identificacion?.disable();
      this.numero_de_identificacion?.disable();
      this.numero_de_identificacion_extranjera?.disable();
      this.id_pueblo_pertenencia?.disable();
      this.id_comunidad_linguistica?.disable();

      this.nit?.disable();
      this.igss?.disable();
      this.id_nivel_educativo?.disable();
      this.profesion?.disable();
      this.id_temporalidad_contrato?.disable();
      this.id_tipo_contrato?.disable();
      this.id_ocupacion?.disable();
      this.id_jornada_trabajo?.disable();
      this.id_tipo_discapacidad?.disable();
      this.proyecto?.disable();
      this.fecha_inicio?.disable();
      this.fecha_fin?.disable();
      this.numero_de_cuenta?.disable();
      this.salario?.disable();
      this.id_igss_ocupacion?.disable();
      this.id_igss_tipo_salario?.disable();
      this.puesto?.disable();
      this.id_documentos?.disable();
    } else {
      this.primer_nombre?.enable();
      this.segundo_nombre?.enable();
      this.tercer_nombre?.enable();
      this.primer_apellido?.enable();
      this.segundo_apellido?.enable();
      this.apellido_de_casada?.enable();
      this.fecha_de_nacimiento?.enable();
      this.id_sexo?.enable();
      this.id_genero?.enable();
      this.id_estado_civil?.enable();
      this.numero_de_hijos?.enable();

      this.id_pais_origen?.enable();
      this.id_nacionalidad_pais?.enable();
      this.id_municipio?.enable();
      this.id_doc_identificacion?.enable();
      this.numero_de_identificacion?.enable();
      this.numero_de_identificacion_extranjera?.enable();
      this.id_pueblo_pertenencia?.enable();
      this.id_comunidad_linguistica?.enable();

      this.nit?.enable();
      this.igss?.enable();
      this.id_nivel_educativo?.enable();
      this.profesion?.enable();
      this.id_temporalidad_contrato?.enable();
      this.id_tipo_contrato?.enable();
      this.id_ocupacion?.enable();
      this.id_jornada_trabajo?.enable();
      this.id_tipo_discapacidad?.enable();
      this.proyecto?.enable();
      this.fecha_inicio?.enable();
      this.fecha_fin?.enable();

      this.numero_de_cuenta?.enable();
      this.salario?.enable();
      this.id_igss_ocupacion?.enable();
      this.id_igss_tipo_salario?.enable();
      this.puesto?.enable();
      this.id_documentos?.enable();
    }
  }

  // EMPLOYEE GETS
  get id() {
    return this.formEmployee.get('id');
  }

  get primer_nombre() {
    return this.formEmployee.get('primer_nombre');
  }
  get segundo_nombre() {
    return this.formEmployee.get('segundo_nombre');
  }
  get tercer_nombre() {
    return this.formEmployee.get('tercer_nombre');
  }
  get primer_apellido() {
    return this.formEmployee.get('primer_apellido');
  }
  get segundo_apellido() {
    return this.formEmployee.get('segundo_apellido');
  }
  get apellido_de_casada() {
    return this.formEmployee.get('apellido_de_casada');
  }
  get fecha_de_nacimiento() {
    return this.formEmployee.get('fecha_de_nacimiento');
  }
  get id_sexo() {
    return this.formEmployee.get('id_sexo');
  }
  get id_genero() {
    return this.formEmployee.get('id_genero');
  }
  get id_estado_civil() {
    return this.formEmployee.get('id_estado_civil');
  }
  get numero_de_hijos() {
    return this.formEmployee.get('numero_de_hijos');
  }

  get id_pais_origen() {
    return this.formEmployee.get('id_pais_origen');
  }
  get id_nacionalidad_pais() {
    return this.formEmployee.get('id_nacionalidad_pais');
  }
  get id_municipio() {
    return this.formEmployee.get('id_municipio');
  }
  get id_doc_identificacion() {
    return this.formEmployee.get('id_doc_identificacion');
  }
  get numero_de_identificacion() {
    return this.formEmployee.get('numero_de_identificacion');
  }
  get numero_de_identificacion_extranjera() {
    return this.formEmployee.get('numero_de_identificacion_extranjera');
  }
  get id_pueblo_pertenencia() {
    return this.formEmployee.get('id_pueblo_pertenencia');
  }
  get id_comunidad_linguistica() {
    return this.formEmployee.get('id_comunidad_linguistica');
  }

  // CONTRACT GETS
  get id_contract() {
    return this.formContract.get('id');
  }
  get nit() {
    return this.formContract.get('nit');
  }
  get igss() {
    return this.formContract.get('igss');
  }
  get id_nivel_educativo() {
    return this.formContract.get('id_nivel_educativo');
  }
  get profesion() {
    return this.formContract.get('profesion');
  }
  get id_temporalidad_contrato() {
    return this.formContract.get('id_temporalidad_contrato');
  }
  get id_tipo_contrato() {
    return this.formContract.get('id_tipo_contrato');
  }
  get id_ocupacion() {
    return this.formContract.get('id_ocupacion');
  }
  get id_jornada_trabajo() {
    return this.formContract.get('id_jornada_trabajo');
  }
  get id_tipo_discapacidad() {
    return this.formContract.get('id_tipo_discapacidad');
  }
  get proyecto() {
    return this.formContract.get('proyecto');
  }
  get fecha_inicio() {
    return this.formContract.get('fecha_inicio');
  }
  get fecha_fin() {
    return this.formContract.get('fecha_fin');
  }

  get numero_de_cuenta() {
    return this.formContract.get('numero_de_cuenta');
  }
  get salario() {
    return this.formContract.get('salario');
  }
  get id_igss_ocupacion() {
    return this.formContract.get('id_igss_ocupacion');
  }
  get id_igss_tipo_salario() {
    return this.formContract.get('id_igss_tipo_salario');
  }
  get puesto() {
    return this.formContract.get('puesto');
  }
  get id_documentos() {
    return this.formContract.get('id_documentos');
  }
  get empleado() {
    return this.formContract.get('empleado');
  }
}
