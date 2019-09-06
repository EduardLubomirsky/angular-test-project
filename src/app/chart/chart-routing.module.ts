// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FullLayoutComponent } from '../shared/layout/full-layout/full-layout.component';
import { ChartComponent } from './chart/chart.component';

// Helpers
import { AuthGuard } from '../shared/helpers';

const routes: Routes = [
	{
		path: '',
		component: FullLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: ChartComponent },
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

export class ChartRoutingModule { }