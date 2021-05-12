import { CommonModule } from '@angular/common';
import { ReportComponent } from './components/general_components/report/report.component';
import { BusinessComponent } from './components/general_components/business/business.component';
import { StockIndexSliderComponent } from './components/general_components/stock-index-slider/stock-index-slider.component';
import { BrowserHeaderComponent } from './components/general_components/browser-header/browser-header.component';
import { FooterComponent } from './components/general_components/footer/footer.component';
import { NgModule } from '@angular/core';
import { HotStockListComponent } from './components/general_components/hot-stock-list/hot-stock-list.component';
import { LoginComponent } from './components/general_components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockIndexComponent } from './components/general_components/stock-index-slider/stock-index/stock-index.component';
import { TypeAheadComponent } from './components/general_components/type-ahead/type-ahead.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    BrowserHeaderComponent,
    StockIndexSliderComponent,
    BusinessComponent,
    ReportComponent,
    HotStockListComponent,
    LoginComponent,
    StockIndexComponent,
    TypeAheadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    BrowserHeaderComponent,
    FooterComponent,
    StockIndexSliderComponent,
    BusinessComponent,
    ReportComponent,
    HotStockListComponent,
    LoginComponent,
    StockIndexComponent,
    TypeAheadComponent
  ]
})
export class GeneralModule { }
