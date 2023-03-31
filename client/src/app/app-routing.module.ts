import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './body/about/about.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ServicesPageComponent } from './body/services-page/services-page.component';

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
    path: 'login',
    component: FormUserComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
