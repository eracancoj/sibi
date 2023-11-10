import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  inject,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { materialModules } from '@assets';
import { FirebaseService } from '@core';

@Component({
  standalone: true,
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  selector: 'app-sib-report',
  templateUrl: './sib-report.component.html',
  styleUrls: ['./sib-report.component.scss'],
})
export class SibReportComponent implements OnInit {
  @Input() reportForm?: any;

  sibForm: FormGroup;
  contracts: any;
  displayedColumns: string[] = [
    // 'id',
    'nombre',
    'puesto',
    'nit',
    'proyecto',
    'numero_de_cuenta',
    'fecha_inicio',
    'salario',
    'boni_legal',
    'boni_incentivo',
  ];

  fbService: FirebaseService = inject(FirebaseService);
  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.sibForm = this.fb.group({
      no: [null],
      codigo: [null],
      nombre: [''],
      puesto: [''],
      nit: [null],
      proyecto: [''],
      numero_de_cuenta: [null],
      fecha_inicio: [''],
      salario: [null],
      boni_legal: [null],
      boni_incentivo: [null],
      salario_mensual: [null],
      igss_laboral: [null],
      isr: [null],
      isr_anual: [null],
      liquido: [null],
      observaciones: [''],
      id_contrato: [''],
    });
  }

  ngOnInit() {
    this.getContracts();
  }

  getContracts() {
    this.fbService
      .getDates(
        'contratos',
        this.reportForm.fecha_inicio,
        this.reportForm.fecha_fin
      )
      .subscribe({
        next: (resp) => {
          console.log('getContracts');
          console.log(resp);
          this.contracts = new MatTableDataSource(resp);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    if (this.contracts) {
      return this.contracts.data
        .map((t: any) => t.salario)
        .reduce((acc: any, value: any) => acc + value, 0);
    } else {
      return 0;
    }
  }

  //GETS SIBFORM
  get no() {
    return this.sibForm.get('no');
  }
  get codigo() {
    return this.sibForm.get('codigo');
  }
  get nombre() {
    return this.sibForm.get('nombre');
  }
  get puesto() {
    return this.sibForm.get('puesto');
  }
  get nit() {
    return this.sibForm.get('nit');
  }
  get proyecto() {
    return this.sibForm.get('proyecto');
  }
  get numero_de_cuenta() {
    return this.sibForm.get('numero_de_cuenta');
  }
  get fecha_inicio() {
    return this.sibForm.get('fecha_inicio');
  }
  get salario() {
    return this.sibForm.get('salario');
  }
  get boni_legal() {
    return this.sibForm.get('boni_legal');
  }
  get boni_incentivo() {
    return this.sibForm.get('boni_incentivo');
  }
  get salario_mensual() {
    return this.sibForm.get('salario_mensual');
  }
  get igss_laboral() {
    return this.sibForm.get('igss_laboral');
  }
  get isr() {
    return this.sibForm.get('isr');
  }
  get isr_anual() {
    return this.sibForm.get('isr_anual');
  }
  get liquido() {
    return this.sibForm.get('liquido');
  }
  get observaciones() {
    return this.sibForm.get('observaciones');
  }
  get id_contrato() {
    return this.sibForm.get('id_contrato');
  }
}
