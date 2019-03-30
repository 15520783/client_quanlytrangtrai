import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ExpandableComponent } from '../components/expandable/expandable';
import { FarmsPage } from '../pages/farms/farms';
import { HeaderComponent } from '../components/header/header';
import { SectionsPage } from '../pages/sections/sections';

const Pages = [
  LoginPage,
  HomePage,
  FarmsPage,
  SectionsPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
