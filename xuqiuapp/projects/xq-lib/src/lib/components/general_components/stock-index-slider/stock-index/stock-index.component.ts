import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stock } from './../../../../interfaces/stock';
import { MinuteQuoteParam } from './../../../../interfaces/minute-quote-param';
import { StockService } from './../../../../services/stock.service';

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

  time_out_load_svg: any;

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
    clearTimeout(this.time_out_load_svg);
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
      this.time_out_load_svg && (clearTimeout(this.time_out_load_svg));
      this.time_out_load_svg = setTimeout(() => {
        subscription.unsubscribe();
        this.loadSvg();
      }, 10000);
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
