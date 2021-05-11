import { StockService } from './../../../services/stock.service';
import { Subscription } from 'rxjs';
import { Svg } from './../../../interfaces/svg';
import { Stock } from './../../../interfaces/stock';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'lib-stock-index-slider',
  templateUrl: './stock-index-slider.component.html',
  styleUrls: ['./stock-index-slider.component.css']
})
export class StockIndexSliderComponent implements OnInit, OnDestroy {

  activeMarket: string;

  activePoint: number = 0;

  activeStocks: Stock[];

  activeSvgStyle: {width: string, height: string}[] = [
    {width: '80', height: '32.8'},
    {width: '140', height: '57.4'},
    {width: '140', height: '57.4'}
  ];

  stocks: Stock[] = [
    {symbol: 'SH000001', max: 242},
    {symbol: 'SZ399001', max: 242},
    {symbol: 'SZ399006', max: 242},
    {symbol: 'SH000688', max: 242},
    {symbol: 'HKHSI', max: 332},
    {symbol: 'HKHSCEI', max: 332},
    {symbol: 'HKHSCCI', max: 332},
    {symbol: '.DJI', max: 391},
    {symbol: '.IXIC', max: 391},
    {symbol: '.INX', max: 391}
  ];

  subscriptions: Subscription[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getAllStockIndexList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  calcActivePoint(point?: number) {
    if(point > 2) {
      point = 0;
    }
    if(point < 0) {
      point = 2;
    }
    if(typeof point == 'undefined') {
      const time = Number(moment().tz('Asia/Shanghai').format('hh'));
      point = time >= 6 && time <15 ? 0 : time >= 15 && time <19 ? 1: 2;
    }
    this.activePoint = point;
  }

  getAllStockIndexList() {
    const symbol = this.stocks.map(stock => stock.symbol).join(',');
    const subscription = this.stockService.getAllStockIndexList(symbol).subscribe({
      next: this.setActiveStocks.bind(this)
    });
    this.subscriptions.push(subscription);
  }

  getSvg(index: string,svg: Svg) {

  }

  setActiveStocks(res) {
    this.calcActivePoint();
    res.forEach((item, index) => {
      Object.assign(this.stocks[index],item);
    });
    this.activateStocks();
  }

  activateStocks() {
    switch(this.activePoint) {
      case 0: 
          this.activeStocks = this.stocks.slice(0, 4);
          break;
      case 1:
          this.activeStocks = this.stocks.slice(4, 7);
          break;
      default:
          this.activeStocks = this.stocks.slice(7, 10);
    }
  }

  stockChange($event) {
    let stock = this.stocks.find((stock) => $event.symbol === stock.symbol)
    Object.assign(stock, $event);
  }

  loopStockSlider(point: number) {
    this.calcActivePoint(point);
    this.activateStocks();
  }
}
