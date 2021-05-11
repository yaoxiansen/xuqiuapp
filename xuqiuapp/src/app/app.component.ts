import { CompHostDirective } from './directives/comp-host.directive';
import { LoginService } from 'xq-lib';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'xuqiuapp';

  @ViewChild(CompHostDirective, {static: true}) appCompHost: CompHostDirective;

  subscriptions: Subscription[] = [];

  showDialogLogin: boolean = false;

  constructor(public loginService: LoginService,
              public componentFactoryResolver: ComponentFactoryResolver) { 
  }


  ngOnInit(): void {
    const subscription = this.loginService.getPopupLayer().subscribe((params) => {
      const {show} = params;
      this.showDialogLogin = show;
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }

}
