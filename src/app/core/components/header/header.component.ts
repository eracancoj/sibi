import { Component } from '@angular/core';
import { materialModules } from 'src/assets/material-imports';

@Component({
  standalone: true,
  imports: [materialModules],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
