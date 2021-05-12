import { Subscription } from 'rxjs';
import { RequestService } from 'xq-lib';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  subscriptins: Subscription[] = [];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    const subscription = this.requestService.getLoadingIcon().subscribe((data) => {
      this.loading = data;
    });
    this.subscriptins.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptins.forEach(subscription => subscription.unsubscribe());
  }  

}
