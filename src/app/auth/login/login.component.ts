import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup ;

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  login() {
    this.router.navigateByUrl("/admin/app", { replaceUrl: true });
  }
}
