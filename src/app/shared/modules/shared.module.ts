// Vendors
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { FullLayoutComponent } from '../layout/full-layout/full-layout.component';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		FullLayoutComponent,
	],
	imports: [
		RouterModule,
		CommonModule,
		MaterialModule
	],
	exports: [
		MaterialModule
	],
	providers: [
	]
})

export class SharedModule {
}

