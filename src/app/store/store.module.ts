// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

// Components
import { StoreComponent } from './store/store.component';

@NgModule({
  declarations: [
    StoreComponent
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
