import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import { HotStockInfo } from './../interfaces/hot-stock-info';
import { TypeAheadStock } from './../interfaces/type-ahead-stock';
import { Config } from './../configs/config';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private loadingIcon = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  sendVerificationCode(data: any): Subscription {
    return this.httpClient.post(`${Config.host}${Config.send_verify_code}`, data).subscribe();
  }

  login(data: any): Subscription {
    return this.httpClient.post(`${Config.host}${Config.login}`, data).subscribe();
  }

  fetchNews(next_max_id: string): Observable<any> {
    return this.httpClient.get(`${Config.host}${Config.fetech_news}`, {params: {next_max_id}})
          .pipe(
            map((res: any) => {
              let {items, next_max_id} = res;
              if(items) {
                items = items.map(item => {
                    let origin = item['original_status'];
                    let {id, user_id, title,description,user:{profile_image_url, screen_name: profile_name}, timeBefore: time_before} = origin;
                    profile_image_url = profile_image_url && profile_image_url.split(',').length >=2 && (profile_image_url.split(',')[1]);
                    return {id, user_id, title, description, profile_image_url, profile_name, time_before};
                })
              }
              return {items, next_max_id};
            })
          );
  }

  fetchLiveNews(next_max_id: string): Observable<any> {
    return this.httpClient.get(`${Config.host}${Config.fetch_live_news}`, {params: {next_max_id}})
          .pipe(
            map((res: any) => {
              if(!res) {
                return null;
              }
              let {items, next_max_id} = res;
              if(items) {
                items = items.map(item => {
                  item['created_at'] = moment(item['created_at']).tz(Config.time_zone).format('hh:mm');
                  return item;
                })
              }
              return {items, next_max_id};
            })
          )
  }

  search(terms: string): Observable<TypeAheadStock[]> {
    const params = {
      q: terms
    }
    return this.httpClient.get(`${Config.host}${Config.type_ahead_query_stock}`, {params}).pipe(
        map(res => {
          return res && res['data'];
        })
    );
  }

  fetchHotStocks(temp): Observable<HotStockInfo[]> {
    const params = {
      ...temp
    }
    return this.httpClient.get(`${Config.host}${Config.fetch_hot_stocks}`, {params}).pipe(
        map(res => {
          return res && res['data'] && res['data']['items'];
        })
    );
  }

  showLoadingIcon() {
    this.loadingIcon.next(true);
  }

  hideLoadingIcon() {
    this.loadingIcon.next(false);
  }

  getLoadingIcon(): Observable<any> {
    return this.loadingIcon.asObservable();
  }
}
