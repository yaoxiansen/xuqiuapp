import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade/trade.component';
import { TradeRoutingModule } from './trade-routing.module';



@NgModule({
  declarations: [
    TradeComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule
  ],
  exports: [
    TradeComponent
  ]
})
export class TradeModule { }
