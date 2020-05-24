import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestScheduleComponent } from './request-schedule/request-schedule.component';
import { RequestResultComponent } from './request-result/request-result.component';
import { TechnicalAddComponent } from './technical-add/technical-add.component';
import { JWTInterceptorService } from './helpers/jwtinterceptor.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestDetailComponent,
    RequestAddComponent,
    RequestScheduleComponent,
    RequestResultComponent,
    TechnicalAddComponent,
    LoginComponent,
    UserComponent,
    RequestComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
