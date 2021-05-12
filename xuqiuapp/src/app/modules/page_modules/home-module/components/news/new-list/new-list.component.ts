import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService, NewsInfo } from 'xq-lib';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.less']
})
export class NewListComponent implements OnInit, OnDestroy {


  newsList: NewsInfo[];

  subscriptions: Subscription[] = [];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.showLoadingIcon();
    this.requestService.fetchNews().subscribe({
      next: this.refineNews.bind(this)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  refineNews(res) {
    this.newsList = res;
    this.requestService.hideLoadingIcon();
  }

}
