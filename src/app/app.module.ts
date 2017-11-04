import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CompanyService} from "../services/company.service";
import {HttpModule} from "@angular/http";
import {CompaniesPage} from "../pages/companies/companies";
import {CompanyDetailsPage} from "../pages/company-details/company-details";
import {NavigationPage} from "../pages/navigation/navigation";
import {TagService} from "../services/tag.service";
import {TagsPage} from "../pages/tags/tags";

@NgModule({
  declarations: [
    MyApp,
    CompaniesPage,
    CompanyDetailsPage,
    NavigationPage,
    TagsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios-transition'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CompaniesPage,
    CompanyDetailsPage,
    NavigationPage,
    TagsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompanyService,
    TagService
  ]
})
export class AppModule {}
