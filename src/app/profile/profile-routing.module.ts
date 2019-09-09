// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FullLayoutComponent } from '../shared/layout/full-layout/full-layout.component';

// Helpers
import { AuthGuard } from '../shared/helpers';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: '',
		component: FullLayoutComponent,
		canActivate: [AuthGuard],
		children: [
            { path: '', component:  ProfileComponent},
            { path: '**', redirectTo: ''}
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

export class ProfileRoutingModule { }