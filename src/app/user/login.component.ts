import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Toastr, TOASTR_TOKEN } from "../common";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: './login.component.html',
  styles:[
    'em { color: #dc3545; float: right; font-style: italic }'
  ]
})

export class LoginComponent {
  userName: any;
  password: any;
  mouseoverLogin: boolean | undefined;
  loginInvalid = false;

  constructor(
    private authService:AuthService, 
    private router:Router,
    @Inject(TOASTR_TOKEN) private toarts: Toastr
  ) {}

  login(formValues:any): void {
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe((response) => {
        if (!response) {
          this.loginInvalid = true;
        } else {
          this.toarts.success('Login successed!', 'Announce');
          this.router.navigate(['events']);
        }
      });
  }

  handleCancel() {
    this.router.navigate(['events']);
  }
}