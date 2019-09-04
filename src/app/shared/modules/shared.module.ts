// Vendors
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { FullLayoutComponent } from '../layout/full-layout/full-layout.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		FullLayoutComponent,
	],
	imports: [
		RouterModule,
		CommonModule,
	],
	exports: [
	],
	providers: [
	]
})

export class SharedModule {
}

