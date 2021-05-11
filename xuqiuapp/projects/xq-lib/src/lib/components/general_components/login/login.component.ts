import { LoginService } from './../../../services/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  applyingVerifyCode: boolean = false;

  user = new User('86', '', '',true);

  loginForm: FormGroup;

  count: number = 60;

  subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        telephone: new FormControl(this.user.telephone,[
          Validators.required,
          Validators.pattern(/^\d{11}$/)
        ]),
        code: new FormControl(this.user.code, [
          Validators.required
          ]
        ),
        areacode: new FormControl(this.user.areacode),
        remember_me: new FormControl()
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscrption => subscrption.unsubscribe);
  }

  closeLogin() {
    this.loginService.closePopupLayer();
  }

  applyVerifyCode() {
    const self = this;
    this.applyingVerifyCode = true;
    this.count = 10;
    (function counter(){
      self.count--;
      if(self.count < 0) {
        self.applyingVerifyCode = false;
        return;
      }
      setTimeout(counter, 1000);
    })();
    const subscription = this.loginService.sendVerificationCode({...this.loginForm.value});
    this.subscriptions.push(subscription);
  }

  login() {
    const subscription = this.loginService.login({...this.loginForm.value});
  }

  get telephone() {
    return this.loginForm.get('telephone');
  }

  get code() {
    return this.loginForm.get('code');
  }

  get areacode() {
    return this.areacode.get('areacode');
  }
}


class User {
  constructor(
              public areacode: string,
              public telephone: string, 
              public code: string,
              public remember_me: boolean){}  
}