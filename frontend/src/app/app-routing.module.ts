import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import {InstitutionComponent} from './institution/institution.component';
import {FolderComponent} from './folder/folder.component'
import {TemplateComponent} from './template/template.component'
import {AuthGuard} from './guards/auth.guard'

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'folder/:id', component: FolderComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'institution', component : InstitutionComponent},
  {path:'template/:templateid', component: TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
