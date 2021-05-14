import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {}

  onScrollEvent(callback, loadTimes, loading) {
    const height = 'innerHeight' in window ? window.innerHeight: document.documentElement.offsetHeight;
      const body = document.body;
      const documentElement = document.documentElement;
      const maxHeight = Math.max(body.scrollHeight, body.offsetHeight, documentElement.clientHeight, documentElement.scrollHeight, documentElement.offsetHeight);
      if(height + window.pageYOffset >= maxHeight - 40 && loadTimes < 3 && !loading) {
        callback();
      }
  }

  loadNews(self, newsObservable$) {
    self.subscription = newsObservable$.subscribe({
      next: (res) => this.refineNews.call(self, self, res)
    });
    self.loadTimes++;
    self.loading = true;
    self.requestService.showLoadingIcon();
  }

  refineNews(self, res) {
    console.log('self', self);
    console.log('res', res);
    let {items, next_max_id} = res;
    if(!self.newsList) {
      self.newsList = items;
    }else {
      self.newsList = self.newsList.concat(items);
    }
    self.next_max_id = next_max_id;
    self.loading = false;
    self.requestService.hideLoadingIcon();
  }
}
