// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ChartRoutingModule } from './chart-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { ChartComponent } from './chart/chart.component';



@NgModule({
	declarations: [
		ChartComponent
	],
	imports: [
		CommonModule,
		ChartRoutingModule,
		SharedModule
	],
	providers: [
	],
})
export class ChartModule { }
