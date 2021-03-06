// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FullLayoutComponent } from '../shared/layout/full-layout/full-layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		component: FullLayoutComponent,
		children: [
			{ path: 'login', component:  LoginComponent },
			{ path: 'registration', component:  RegistrationComponent },
			{ path: 'reset-password', component: ResetPasswordComponent },
			{ path: '**', redirectTo: 'login' }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})

export class AuthRoutingModule { }