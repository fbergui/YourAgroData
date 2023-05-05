import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import {HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import { MatFormFieldControl } from '@angular/material/form-field';
import { CanUpdateErrorState, ErrorStateMatcher, _AbstractConstructor, _Constructor } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatMenu } from '@angular/material/menu';
import { RedirectComponent } from './form-user/redirect/redirect.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    AboutComponent,
    ServicesPageComponent,
    FooterComponent,
    FormUserComponent,
    LoginComponent,
    SigninComponent,
    RedirectComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    AlertModule,
    BrowserAnimationsModule,
    NgxMatIntlTelInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
