import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { materialModules } from 'src/assets/material-imports';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  standalone: true,
  imports: [materialModules, ReactiveFormsModule],
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

  employee: any;

  constructor(
    public dialogRef: MatDialogRef<ViewEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employee = data;
    console.log( this.employee);

  }


  close(): void {
    this.dialogRef.close();
  }
}
