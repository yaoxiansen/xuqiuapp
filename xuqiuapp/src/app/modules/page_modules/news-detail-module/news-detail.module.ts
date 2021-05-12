import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsDetailRoutingModule } from './news-detail-routing.module';



@NgModule({
  declarations: [
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    NewsDetailRoutingModule
  ]
})
export class NewsDetailModule { }
