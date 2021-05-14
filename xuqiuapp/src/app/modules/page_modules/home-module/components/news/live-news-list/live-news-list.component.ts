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

  newsList: LiveNewsInfo[];

  loadTimes: number = 0;

  next_max_id: number = -1;

  loading: boolean = false;

  subscription: Subscription;

  constructor(public requestService: RequestService,
              public globalService: GlobalService) { }

  ngOnInit(): void {
    const now = Date.now();
    this.dayMonth = {
      day: moment(now).tz(Config.time_zone).format('DD'),
      month: this.months[moment(now).tz(Config.time_zone).format('MM')]
    }
    this.globalService.loadNews(this,this.requestService.fetchLiveNews(this.next_max_id.toString()));
  }

  ngOnDestroy(): void {
    this.subscription && (this.subscription.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
      this.globalService.onScrollEvent.call(this,this.globalService.loadNews.bind(this.globalService, this, this.requestService.fetchLiveNews(this.next_max_id.toString())), this.loadTimes, this.loading);
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