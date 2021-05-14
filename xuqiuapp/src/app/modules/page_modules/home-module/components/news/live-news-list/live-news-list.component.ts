import { Config, RequestService, GlobalService } from 'xq-lib';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-news-list',
  templateUrl: './live-news-list.component.html',
  styleUrls: ['./live-news-list.component.less']
})
export class LiveNewsListComponent implements OnInit,OnDestroy {

  months = {
    '01': '一月',
    '02': '二月',
    '03': '三月',
    '04': '四月',
    '05': '五月',
    '06': '六月',
    '07': '七月',
    '08': '八月',
    '09': '九月',
    '10': '十月',
    '11': '十一月',
    '12': '十二月'
  }

  dayMonth: {day: string, month: string};

  liveNews: LiveNewsInfo[];

  loadTimes: number = 0;

  next_max_id: number = -1;

  loading: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(public requestService: RequestService,
              public globalService: GlobalService) { }

  ngOnInit(): void {
    const now = Date.now();
    this.dayMonth = {
      day: moment(now).tz(Config.time_zone).format('DD'),
      month: this.months[moment(now).tz(Config.time_zone).format('MM')]
    }
    this.loadLiveNews();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
      this.globalService.onScrollEvent.call(this,this.loadLiveNews.bind(this), this.loadTimes, this.loading);
  }

  loadLiveNews() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.splice(0, this.subscriptions.length);
    const subscription = this.requestService.fetchLiveNews(this.next_max_id.toString()).subscribe({
      next: this.loadMoreLiveNews.bind(this)
    });
    this.subscriptions.push(subscription);
    this.requestService.showLoadingIcon();
    this.loadTimes++;
    this.loading = true;
  }

  loadMoreLiveNews(res) {
    let {items, next_max_id} = res;
    this.next_max_id = next_max_id;
    if(!this.liveNews) {
      this.liveNews = items;
    }else {
      this.liveNews = this.liveNews.concat(items);
    }
    this.liveNews = this.liveNews.concat(items);
    this.requestService.hideLoadingIcon();
    this.loading = false;
  }

}

interface LiveNewsInfo {
  created_at: string;
  id: number;
  mark: number;
  reply_count: number;
  share_count: number;
  status_id: number;
  target: string;
  text: string;
  view_count: number;
}