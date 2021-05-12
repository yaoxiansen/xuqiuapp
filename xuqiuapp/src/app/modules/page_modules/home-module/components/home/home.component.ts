import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { CompHostDirective } from 'src/app/directives/comp-host.directive';
import { LiveNewsListComponent } from './../news/live-news-list/live-news-list.component';
import { NewListComponent } from './../news/new-list/new-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild(CompHostDirective, {static: true}) appCompHost: CompHostDirective;

  components: CompObj[] = [
    {
      component: NewListComponent,
      title: '雪球热帖',
      active: true
    },
    {
      component: LiveNewsListComponent,
      title: '7×24',
      active: false
    },
  ];

  constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent(this.components[0]);
  }

  loadComponent(comp: CompObj) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp.component);
    const viewContainerRef = this.appCompHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
    this.components.forEach(comp => comp.active = false);
    comp.active = true;
  }
}

interface CompObj {
  component: any;
  title: string;
  active: boolean;
}
