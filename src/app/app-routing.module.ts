import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { RegisterComponent } from './components/register/register.component';


  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user-create', component: UserCreateComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'user-edit/:id', component: UserEditComponent },
    { path: 'user-list', component: UserListComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/login', pathMatch: 'full' } 
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

