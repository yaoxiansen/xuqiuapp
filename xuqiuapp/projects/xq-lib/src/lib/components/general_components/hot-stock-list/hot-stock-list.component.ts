import { RequestService } from './../../../services/request.service';
import { HotStockInfo } from './../../../interfaces/hot-stock-info';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-hot-stock-list',
  templateUrl: './hot-stock-list.component.html',
  styleUrls: ['./hot-stock-list.component.css']
})
export class HotStockListComponent implements OnInit, OnDestroy {

  hotStockTabs: {name: string, type: number, active: boolean}[] = [
    {
      name: '全球',
      type: 10,
      active: true
    },
    {
      name: '沪深',
      type: 12,
      active: false
    },
    {
      name: '港股',
      type: 13,
      active: false
    },
    {
      name: '美股',
      type: 11,
      active: false
    }
  ]

  hotStockSortTime: number = 0;

  subscriptions: Subscription[] = [];

  stocks: HotStockInfo[];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.loadHotStocks(this.hotStockTabs[0].type);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  sortHotStocks(sort: number) {
    const activeTab = this.hotStockTabs.find(item => item.active);
    const subscription = this.requestService.fetchHotStocks({_type:activeTab.type, type: activeTab.type + sort}).subscribe({
      next: (res) => {this.stocks = res}
    });
    this.hotStockSortTime = sort;
    this.subscriptions.push(subscription);
  }

  loadHotStocks(type: number) {
    const subscription = this.requestService.fetchHotStocks({_type:type, type: type + this.hotStockSortTime}).subscribe({
      next: (res) => {this.stocks = res}
    });
    this.hotStockTabs.forEach(item => {
      if(item.type === type) {
        item.active = true;
      }else {
        item.active = false;
      }
    });
    this.subscriptions.push(subscription);
  }


}
