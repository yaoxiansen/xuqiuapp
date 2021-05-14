import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService, NewsInfo, GlobalService } from 'xq-lib';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.less']
})
export class NewListComponent implements OnInit, OnDestroy {


  loadTimes: number = 0;

  loading: boolean = false;

  next_max_id: number = -1;

  newsList: NewsInfo[];

  subscription: Subscription;

  constructor(public requestService: RequestService, public globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.loadNews(this, this.requestService.fetchNews(this.next_max_id.toString()));
  }

  ngOnDestroy(): void {
    this.subscription && (this.subscription.unsubscribe())
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
      this.globalService.onScrollEvent.call(this,this.globalService.loadNews.bind(this.globalService,this,
        (this.requestService.fetchNews(this.next_max_id.toString()))), this.loadTimes, this.loading);
  }

}
