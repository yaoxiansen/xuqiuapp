import { HomeRoutingModule } from './home-routing.module';
import { GeneralModule } from 'xq-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner/banner.component';
import { NewListComponent } from './components/news/new-list/new-list.component';
import { NewsComponent } from './components/news/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CompHostDirective } from 'src/app/directives/comp-host.directive';
import { LiveNewsListComponent } from './components/news/live-news-list/live-news-list.component';


@NgModule({
  declarations: [
    BannerComponent,
    NewListComponent,
    NewsComponent,
    HomeComponent,
    LoadingComponent,
    CompHostDirective,
    LiveNewsListComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
