import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDetailComponent } from './request-detail/request-detail.component';

const routes: Routes = [
  {
    path: 'request-details/:id',
    component: RequestDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
