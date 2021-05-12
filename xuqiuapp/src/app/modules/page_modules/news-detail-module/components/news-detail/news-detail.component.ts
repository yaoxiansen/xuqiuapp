import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.less']
})
export class NewsDetailComponent implements OnInit {

  user_id: string;

  id: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
