import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { materialModules } from 'src/assets/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form';

@Component({
  standalone: true,
  imports: [materialModules, ReactiveFormsModule, EmployeeFormComponent],
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent {
  employee: any;
  edit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ViewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employee = data;
  }

  close(): void {
    this.dialogRef.close();
  }
}
