// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../shared/modules/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

// Components
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
      ProfileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
