import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { TechnicalAddComponent } from './technical-add/technical-add.component';
import { AuthGuardService } from './helpers/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { RequestComponent } from './request/request.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { UserHistoricComponent } from './user-historic/user-historic.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'history/:id',
    component: UserHistoricComponent,
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
    path: 'technical-add',
    component: TechnicalAddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin-add',
    component: AdminAddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-add',
    component: UserAddComponent,
  },
  {
    path: 'requests',
    component: RequestComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
