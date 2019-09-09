// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }
  ngOnInit() {
    let passwordRegEx = '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$';
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], this.asyncUserValidator.bind(this)),
      password: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.pattern(passwordRegEx)
      ]),
      repeatPassword: new FormControl('', [Validators.required])
    }, this.passwordMatchValidator.bind(this));
  }

  get f() { return this.resetForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.userService.resetPassword(this.f.email.value, this.f.password.value).subscribe((res) => {
      this.router.navigate(['/auth/login']);
    })
     
  }

  // Password match validator
  public passwordMatchValidator(g: FormGroup): object {
    if (g.controls['password'].value === g.controls['repeatPassword'].value) {
      return null;
    }
    return {
      'mismatch': true
    };
  }

  // Async user validator
  public asyncUserValidator(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      if (control.value ) {
        this.userService.getUserByEmail(control.value)
          .subscribe((res: any) => {
            if (res) {
              resolve(null);
            } else {
              resolve({ notfound: true });
            }
          }, (err) => {
            console.log(err);
          });
      }
    });
  }
}
