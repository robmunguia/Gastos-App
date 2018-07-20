import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';

const routes: Routes = [
  {
        path: '',
        component: DashboardComponent,
        children: dashBoardRoutes
    },
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
