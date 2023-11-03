import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '@core';
import { materialModules } from 'src/assets/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [materialModules, ReactiveFormsModule],
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  form: FormGroup;
  startDate = new Date(1995, 0, 1);

  private fb: FormBuilder = inject(FormBuilder);
  private fbService = inject(FirebaseService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    this.form = this.fb.group({
      primer_nombre: [''],
      segundo_nombre: [''],
      tercer_nombre: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      apellido_de_casada: [''],
      fecha_de_nacimiento: [''],
    });
  }

  async createEmployee() {
    // const response = await this.fbService.addEmployee(this.form.value);
    // console.log(response);

    this.openSnackBar('Empleado creado con éxito');
  }

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {duration: 800});
  }
}
