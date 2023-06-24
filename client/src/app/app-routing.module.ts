import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ServicesPageComponent } from './body/services-page/services-page.component';
import { LoginComponent } from './form-user/login/login.component';
import { SigninComponent } from './form-user/signin/signin.component';
import { RedirectComponent } from './form-user/redirect/redirect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FieldsListComponent } from './dashboard/fields-list/fields-list.component';
import { SensorsComponent } from './dashboard/sensors/sensors.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BodyComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'services', component: ServicesPageComponent },
      ]
  },
  {
    path: 'form',
    component: FormUserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'signin', component: SigninComponent },
      { path: 'redirect/:email', component: RedirectComponent },
      ]
  },
  { path: 'dashboard/:id', component: DashboardComponent,
    children: [
      {path: 'fields', component: FieldsListComponent},
      {path: 'sensors', component: SensorsComponent},
      {path: '', redirectTo: 'fields', pathMatch: 'full'},
    ],


  }



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
