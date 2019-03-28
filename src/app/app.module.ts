import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ComponentsModule } from '../components/components.module';
import { ExpandableComponent } from '../components/expandable/expandable';

const Pages = [
  LoginPage,
  HomePage,
  ListPage
]

const Components = [
  ExpandableComponent
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
