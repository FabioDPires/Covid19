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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { StatsComponent } from './stats/stats.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminGuardService } from './admin-guard.service';
import { TechGuardService } from './tech-guard.service';

import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'request-details/:id',
    component: RequestDetailComponent,
    canActivate: [AuthGuardService, TechGuardService],
  },
  {
    path: 'request-add',
    component: RequestAddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'technical-add',
    component: TechnicalAddComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'admin-add',
    component: AdminAddComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'user-add',
    component: UserAddComponent,
  },
  {
    path: 'requests',
    component: RequestComponent,
    canActivate: [AuthGuardService, TechGuardService],
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'user-password/:id',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
