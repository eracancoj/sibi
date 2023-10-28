import { Component, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { materialModules } from 'src/assets/material-imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  standalone: true,
  imports: [materialModules, ReactiveFormsModule],
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  form: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  private fbService = inject(FirebaseService);

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  async createEmployee(){
    if (this.form.valid) {
      const response = await this.fbService.addEmployee(
        this.form.value
      );
      console.log(response);
      this.onNoClick();
    }
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
