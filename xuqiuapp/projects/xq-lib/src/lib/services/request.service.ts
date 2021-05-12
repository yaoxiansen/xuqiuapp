import { TypeAheadStock } from './../interfaces/type-ahead-stock';
import { Config } from './../configs/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TemplateParseResult } from '@angular/compiler';

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

  fetchNews(): Observable<any> {
    return this.httpClient.get(`${Config.host}${Config.fetech_news}`)
          .pipe(
            map((res) => {
              let items = res['items'];
              if(items) {
                items = items.map(item => {
                    let origin = item['original_status'];
                    let {id, user_id, title,description,user:{profile_image_url, screen_name: profile_name}, timeBefore: time_before} = origin;
                    profile_image_url = profile_image_url && profile_image_url.split(',').length >=2 && (profile_image_url.split(',')[1]);
                    return {id, user_id, title, description, profile_image_url, profile_name, time_before};
                })
              }
              return items;
            })
          );
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
