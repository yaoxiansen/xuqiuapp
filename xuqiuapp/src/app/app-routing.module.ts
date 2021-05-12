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
  },
  {
    path: ':user_id/:id',
    loadChildren: () => import('./modules/page_modules/news-detail-module/news-detail.module').then(m => m.NewsDetailModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
