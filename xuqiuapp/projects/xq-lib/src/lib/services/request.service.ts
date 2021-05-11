import { Config } from './../configs/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  sendVerificationCode(data: any): Subscription {
    return this.httpClient.post(`${Config.host}${Config.send_verify_code}`, data).subscribe();
  }

  login(data: any): Subscription {
    return this.httpClient.post(`${Config.host}${Config.login}`, data).subscribe();
  }
}
