// Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'src/app/auth/auth.module#AuthModule'
  },
  {
    path: 'chart',
    loadChildren: 'src/app/chart/chart.module#ChartModule'
  },
  {
    path: 'store',
    loadChildren: 'src/app/store/store.module#StoreModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
