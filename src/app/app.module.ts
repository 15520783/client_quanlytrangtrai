import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SectionsPage } from '../pages/sections/sections';
import { PigsPage } from '../pages/pigs/pigs';
import { FarmsPage } from '../pages/farms/farms';

import { HeaderComponent } from '../components/header/header';
import { ExpandableComponent } from '../components/expandable/expandable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';

import {Utils} from '../common/utils';

const Pages = [
  LoginPage,
  HomePage,
  FarmsPage,
  SectionsPage,
  PigsPage
]

const Components = [
  ExpandableComponent,
  HeaderComponent
]

@NgModule({
  declarations: [
    MyApp,
    ...Pages,
    ...Components
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      menuType:'push',
      tabsPlacement: 'top',
      iconMode: 'ios',
      activator:'ripple'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...Pages,
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HeaderColor ,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils
  ]
})
export class AppModule {}
