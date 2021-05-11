import { AuthGuard } from './auth/auth.guard';
import { CanActivate } from '@angular/router';
import { HomeModule } from './modules/page_modules/home-module/home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/page_modules/home-module/home.module').then(m => m.HomeModule)
  },
  {
    path: 'trade',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/page_modules/trade-module/trade.module').then(m => m.TradeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
