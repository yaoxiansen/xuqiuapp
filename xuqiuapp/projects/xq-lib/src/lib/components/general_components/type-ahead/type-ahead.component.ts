import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TypeAheadStock } from './../../../interfaces/type-ahead-stock';
import { RequestService } from './../../../services/request.service';

@Component({
  selector: 'lib-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.css']
})
export class TypeAheadComponent implements OnInit, OnDestroy {

  searchTerm = new Subject<String>();

  stocks: TypeAheadStock[];

  subscriptions: Subscription[] = [];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    let searchResult$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(terms => terms && terms.trim().length > 2),
      switchMap((term: string) => {
        return this.requestService.search(term);
      })
    )
    this.subscriptions.push(searchResult$.subscribe(
      {
        next: this.handleSearchResult.bind(this)
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  handleSearchResult(res) {
    this.stocks = res;
  }
}
