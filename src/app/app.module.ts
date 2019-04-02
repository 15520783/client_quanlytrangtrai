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
import { PigViewPage } from '../tabs/pig-view/pig-view';

import { HeaderComponent } from '../components/header/header';
import { ExpandableComponent } from '../components/expandable/expandable';

//Native implement
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Toast } from '@ionic-native/toast';

import {Utils} from '../common/utils';
import { PigsProvider } from '../providers/pigs/pigs';
import { FarmsProvider } from '../providers/farms/farms';
import { IonicStorageModule } from '@ionic/storage';
import { SectionsProvider } from '../providers/sections/sections';
import { HousesProvider } from '../providers/houses/houses';
import { PigInfomationPage } from '../pages/pig-infomation/pig-infomation';


const Pages = [
  LoginPage,
  HomePage,
  FarmsPage,
  SectionsPage,
  PigsPage,
  PigViewPage,
  PigInfomationPage
]

const Components = [
  ExpandableComponent,
  HeaderComponent
]

const Providers = [
  PigsProvider,
  FarmsProvider,
  SectionsProvider,
  HousesProvider,
]

@NgModule({
  declarations: [
    MyApp,
    ...Pages,
    ...Components
  ],
  imports: [
    IonicStorageModule.forRoot(),
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
    Toast,
    StatusBar,
    SplashScreen,
    HeaderColor ,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    ...Providers,
  ]
})
export class AppModule {}
