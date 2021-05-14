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

  subscriptions: Subscription[] = [];

  constructor(public requestService: RequestService, public globalService: GlobalService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
      this.globalService.onScrollEvent.call(this,this.loadNews.bind(this), this.loadTimes, this.loading);
  }


  loadNews() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.splice(0, this.subscriptions.length);
    const subscription = this.requestService.fetchNews(String(this.next_max_id)).subscribe({
      next: this.refineNews.bind(this)
    });
    this.subscriptions.push(subscription);
    this.requestService.showLoadingIcon();
    this.loadTimes++;
    this.loading = true;
  }

  refineNews(res) {
    let {items, next_max_id} = res;
    if(!this.newsList) {
      this.newsList = items;
    }else {
      this.newsList = this.newsList.concat(items);
    }
    this.next_max_id = next_max_id;
    this.requestService.hideLoadingIcon();
    this.loading = false;
  }

}
