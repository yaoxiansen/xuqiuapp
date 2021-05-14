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
}
