// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
	declarations: [
        LoginComponent,
        RegistrationComponent,
        ResetPasswordComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule
	],
	providers: [
	],
})
export class AuthModule { }