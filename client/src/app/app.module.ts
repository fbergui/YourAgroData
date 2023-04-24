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
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    AlertModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
