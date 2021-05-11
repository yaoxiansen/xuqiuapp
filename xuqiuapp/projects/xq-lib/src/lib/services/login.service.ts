import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogined: boolean = false;

  redirectUrl: string;

  private subject = new Subject<any>();

  constructor(private requestService: RequestService) { }

  sendPopupLayer(): void {
      this.subject.next({show: true});
  }

  getPopupLayer(): Observable<any> {
      return this.subject.asObservable();
  }

  closePopupLayer(): void {
      this.subject.next({show: false});
  }

  sendVerificationCode(params): Subscription {
    const {areacode,telephone} = params;
    return this.requestService.sendVerificationCode({areacode,telephone});
  }

  login(params): Subscription {
    return this.requestService.login(params);
  }
}
