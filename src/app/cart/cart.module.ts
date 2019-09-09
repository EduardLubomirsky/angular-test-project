// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { CartComponent } from './cart/cart.component';

@NgModule({
	declarations: [
		CartComponent
	],
	imports: [
		CommonModule,
		CartRoutingModule,
		SharedModule
	]
})
export class CartModule { }
