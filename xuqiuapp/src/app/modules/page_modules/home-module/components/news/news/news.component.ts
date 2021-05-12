import { NewsInfo } from 'xq-lib';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {

  @Input() news: NewsInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
