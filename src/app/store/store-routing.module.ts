// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FullLayoutComponent } from '../shared/layout/full-layout/full-layout.component';
import { StoreComponent } from './store/store.component';

// Helpers
import { AuthGuard } from '../shared/helpers';

const routes: Routes = [
	{
		path: '',
		component: FullLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component:  StoreComponent},
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

export class StoreRoutingModule { }