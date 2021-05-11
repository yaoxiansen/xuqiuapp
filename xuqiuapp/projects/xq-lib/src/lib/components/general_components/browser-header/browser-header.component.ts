import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'lib-browser-header',
  templateUrl: './browser-header.component.html',
  styleUrls: ['./browser-header.component.css']
})
export class BrowserHeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  showLogin() {
    this.loginService.sendPopupLayer();
  }
}
