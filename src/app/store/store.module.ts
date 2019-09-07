// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { StoreComponent } from './store/store.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  declarations: [
    StoreComponent,
    ProductItemComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    StoreRoutingModule
  ],
  providers: [
  ],
})
export class StoreModule { }
