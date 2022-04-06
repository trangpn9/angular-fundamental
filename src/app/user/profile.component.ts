import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Toastr, TOASTR_TOKEN } from "../common/toastr.service";
import { AuthService } from "./auth.service";

@Component({
    templateUrl: './profile.component.html',
    styles:[`
        em {float: right; color: #E05C65;}
        .error input { background-color: #E3C3E5 }
        .error ::-webkit-input-placeholder { color: #999999 }
        .error ::-moz-placeholder { color: #999999 }
        .error :-webkit-input-placeholder { color: #999999 }
        .error :ms-input-placeholder { color: #999999 }
    `]
})

export class ProfileComponent implements OnInit {
    profileForm!:FormGroup;
    private firstName: FormControl | undefined;
    private lastName: FormControl | undefined;

    constructor(
        private authService:AuthService, 
        private _router:Router,
        @Inject(TOASTR_TOKEN) private toastr: Toastr,
    ) {

    }

    ngOnInit() {
        this.firstName = new FormControl(
            this.authService.currentUser?.firstName,
            [
                Validators.required,
                Validators.pattern('[a-zA-Z].*')
            ]
        );
        this.lastName = new FormControl(
            this.authService.currentUser?.lastName,
            [
                Validators.required,

            ]
        );
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    validateFirstName() {
        return this.firstName?.valid || this.firstName?.untouched;
    }

    validateLastName() {
        return this.lastName?.valid || this.lastName?.untouched;
    }

    handleCancel() {
        this._router.navigate(['events']);
    }

    saveProfile(formValue: any) {
        if (this.profileForm.valid) {
        this.authService.updateCurrentUser(formValue.firstName, formValue.lastName).subscribe(() => {
                this.toastr.success('Profile saved');
                this._router.navigate(['events']);
            });
        }
    }

    logout() {
        this.authService.logout().subscribe(() => {
            return this._router.navigate(['/user/login']);
        });
    }
}