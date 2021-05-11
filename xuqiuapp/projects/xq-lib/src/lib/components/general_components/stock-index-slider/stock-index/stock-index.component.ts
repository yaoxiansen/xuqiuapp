import { MinuteQuoteParam } from './../../../../interfaces/minute-quote-param';
import { StockService } from './../../../../services/stock.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stock } from './../../../../interfaces/stock';

@Component({
  selector: 'lib-stock-index',
  templateUrl: './stock-index.component.html',
  styleUrls: ['./stock-index.component.css']
})
export class StockIndexComponent implements OnInit, OnDestroy {

  @Input() stock: Stock;

  @Output() stockChange = new EventEmitter<Stock>();

  @Input() svgRect: {width: string, height: string};

  svg_path_last_close: string;

  svg_path_minute: string;

  subscriptions: Subscription[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    if(this.svgRect.width === '80') {
      this.svg_path_last_close = 'M0 20 L80 20';
    }else {
      this.svg_path_last_close = 'M0 35 L140 35';
    }
    this.loadSvg();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  get color() {
    if(this.stock.chg > 0) {
      return 'stock_slider_gain';
    }else {
      return 'stock_slider_slip';
    }
  }

  loadSvg() {
    const quote_param: MinuteQuoteParam = {
      width: Number(this.svgRect.width),
      max: this.stock.max,
      symbol: this.stock.symbol
    }
    const subscription = this.stockService.getStockIndexMinuteQuote(quote_param).subscribe({
        next: this.updateStock.bind(this)
      }
    );
    this.subscriptions.push(subscription);
    if(this.stock.market_status !== '休市') {
      setTimeout(() => {
        subscription.unsubscribe();
        this.loadSvg();
      }, 60000);
    }
  }

  updateStock(res) {
    const {items,svg_path_minute} = res;
    if(!items || !items.length) {
      return;
    }
    Object.assign(this.stock, items[items.length -1 ]);
    this.svg_path_minute = svg_path_minute;
    this.stockChange.emit(this.stock);
  }

}
