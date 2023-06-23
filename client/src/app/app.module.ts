import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { AboutComponent } from './body/about/about.component';
import { ServicesPageComponent } from './body/services-page/services-page.component';
import { FooterComponent } from './footer/footer.component';
import { FormUserComponent } from './form-user/form-user.component';
import { LoginComponent } from './form-user/login/login.component';
import { SigninComponent } from './form-user/signin/signin.component';
import { RedirectComponent } from './form-user/redirect/redirect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SensorsComponent } from './dashboard/sensors/sensors.component';
import { FieldsListComponent } from './dashboard/fields-list/fields-list.component';
import { FieldItemComponent } from './dashboard/fields-list/field-item/field-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatIntlTelInputComponent } from "ngx-mat-intl-tel-input";
import { _AbstractConstructor, _Constructor } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { GoogleMapsModule } from '@angular/google-maps'
import { Observable, map } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,HeaderComponent, BodyComponent, HomeComponent, AboutComponent, ServicesPageComponent, FooterComponent,
    FormUserComponent, LoginComponent, SigninComponent, RedirectComponent,
    DashboardComponent, SensorsComponent, FieldsListComponent, FieldItemComponent,
  ],
  imports: [
    HttpClientModule, BrowserModule, NgbModule, AppRoutingModule, FormsModule, ReactiveFormsModule, AlertModule,
    BrowserAnimationsModule, NgxMatIntlTelInputComponent,NgChartsModule,GoogleMapsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
