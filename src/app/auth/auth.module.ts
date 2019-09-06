// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
        LoginComponent,
        RegistrationComponent
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