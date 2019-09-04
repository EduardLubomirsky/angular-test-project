// Vendors
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componets
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
