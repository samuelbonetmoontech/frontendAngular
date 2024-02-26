// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';


const routes: Routes = [
  { path: "user-create", component: UserCreateComponent },
  { path: "user-edit", component: UserEditComponent },
  { path: "user-list", component: UserListComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'user-login'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

