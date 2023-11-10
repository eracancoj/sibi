import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  inject,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { materialModules } from '@assets';
import { SibReportComponent } from '../sib-report';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SibReportComponent,
    materialModules,
  ],
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss'],
})
export class NewReportComponent implements OnInit {
  @Input() reportType: string = '';
  @Output() cancel = new EventEmitter<boolean>();
  @ViewChild('sibiReportComponent') sibiReportComponent?: SibReportComponent;

  reportForm: FormGroup;
  yearSelect: boolean = false;
  sibReport: boolean = false;

  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.reportForm = this.fb.group({
      fecha_inicio: [''],
      fecha_fin: [''],
      tipo: [''],
      reporte_sib: [[{ id_reporte_sib: '' }]],
    });
  }

  ngOnInit() {
    if (this.reportType) {
      switch (this.reportType) {
        case 'SIB':
          this.tipo?.setValue(this.reportType);
          this.yearSelect = true;
          break;
        default:
          break;
      }
    }
  }

  newReport() {
    switch (this.reportType) {
      case 'SIB':
        this.sibiReportComponent?.getContracts();
        this.sibReport = true;
        break;
      default:
        break;
    }
  }

  setYear(date: any, datepicker: MatDatepicker<any>) {
    this.fecha_inicio?.setValue(date);
    this.fecha_fin?.setValue(new Date(date.getFullYear(), 11, 31));

    datepicker.close();
  }

  get fecha_inicio() {
    return this.reportForm.get('fecha_inicio');
  }
  get fecha_fin() {
    return this.reportForm.get('fecha_fin');
  }
  get tipo() {
    return this.reportForm.get('tipo');
  }
  get reporte_sib() {
    return this.reportForm.get('reporte_sib');
  }
}
