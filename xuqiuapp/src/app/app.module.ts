import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompHostDirective } from './directives/comp-host.directive';
import { LoginService } from 'xq-lib';
import { CommonModule } from '@angular/common';
import { GeneralModule } from 'xq-lib';

@NgModule({
  declarations: [
    AppComponent,
    CompHostDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GeneralModule,
    AppRoutingModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
