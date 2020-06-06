import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestAddComponent } from './request-add/request-add.component';
import { TechnicalAddComponent } from './technical-add/technical-add.component';
import { JWTInterceptorService } from './helpers/jwtinterceptor.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';
import { UserAddComponent } from './user-add/user-add.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserHistoricComponent } from './user-historic/user-historic.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestDetailComponent,
    RequestAddComponent,
    TechnicalAddComponent,
    LoginComponent,
    UserComponent,
    RequestComponent,
    UserAddComponent,
    AdminAddComponent,
    NavbarComponent,
    UserHistoricComponent,
    UserProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
  ],
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
