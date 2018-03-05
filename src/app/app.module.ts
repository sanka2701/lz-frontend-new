import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpLoaderFactory } from './app.translate.factory';
import { MaterialModule } from './shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventTopComponent } from './components/event-top/event-top.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {RegisterComponent} from './components/register/register.component';
import {ApiService} from './services/api.service';
import {UserService} from './services/user.service';
import {HttpTokenInterceptor} from './shared/interceptors/http.token.interceptor';
import {JwtService} from './services/jwt.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventTopComponent},
  {path: 'login', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    EventTopComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    ApiService,
    UserService,
    JwtService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
