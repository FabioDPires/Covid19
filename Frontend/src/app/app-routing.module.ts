import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestResultComponent } from './request-result/request-result.component';
import { RequestScheduleComponent } from './request-schedule/request-schedule.component';
import { TechnicalAddComponent } from './technical-add/technical-add.component';
import { AuthGuardService } from './helpers/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'request-details/:id',
    component: RequestDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-add',
    component: RequestAddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-schedule/:id',
    component: RequestScheduleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'request-result/:id',
    component: RequestResultComponent,
  },
  {
    path: 'technical-add',
    component: TechnicalAddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
