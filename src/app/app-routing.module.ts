import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-create', component: UserCreateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-edit/:id', component: UserEditComponent, /*canActivate: [AuthGuard]*/ }, 
  { path: 'user-list', component: UserListComponent, /*canActivate: [AuthGuard]*/},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
