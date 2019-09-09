// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { AuthenticationService } from '../../shared/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading: boolean = false;
    public submitted: boolean = false;
    public returnUrl: string;
    public errorMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)
            ]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    public onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .subscribe((data) => {
                this.loading = false;
                this.router.navigate(['store']);
            }, (error) => {
                this.errorMessage = error;
                this.loading = false;
            });
    }
}