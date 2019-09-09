// Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// Services
import { UserService } from '../../shared/services';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public registerForm: FormGroup;
    public loading: boolean = false;
    public submitted: boolean = false;
    public errorMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        let passwordRegEx = '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$';
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                Validators.pattern(passwordRegEx)
            ]]
        });
    }

    get f() { return this.registerForm.controls; }

    public onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe((data) => {
                this.router.navigate(['/auth/login']);
            }, (error) => {
                this.errorMessage = error;
                this.loading = false;
            });
    }
}