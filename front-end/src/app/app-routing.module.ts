import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserFormComponent} from './user-form/user-form.component'
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent },
  { path: '**', redirectTo: '/' } //redirect to dashboard component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
