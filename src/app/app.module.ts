import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SectionsPage } from '../pages/sections/sections';
import { PigsPage } from '../pages/pigs/pigs';
import { FarmsPage } from '../pages/farms/farms';
import { PigViewPage } from '../tabs/pig-view/pig-view';
import { FarmInfomationPage } from '../pages/farm-infomation/farm-infomation';
import { PigInfomationPage } from '../pages/pig-infomation/pig-infomation';
import { PigReviewIndexPage } from '../pages/pig-review-index/pig-review-index';
import { SectionInfomationPage } from '../pages/section-infomation/section-infomation';
import { HouseInfomationPage } from '../pages/house-infomation/house-infomation';
import { PigGroupsPage } from '../pages/pig-groups/pig-groups';
import { EmployeePage } from '../pages/employee/employee';
import { PigGroupInformationPage } from '../pages/pig-group-information/pig-group-information';
import { DatePlanPage } from '../pages/date-plan/date-plan';
import { EmployeeInformationPage } from '../pages/employee-information/employee-information';
import { TestInputPage } from '../pages/test-input/test-input';
import { FarmInputPage } from '../pages/farm-input/farm-input';

import { HeaderComponent } from '../components/header/header';
import { ExpandableComponent } from '../components/expandable/expandable';
import { FarmComponent } from '../components/farm/farm';
import { EmployeeListComponent } from '../components/employee-list/employee-list';
import { PigGroupListComponent } from '../components/pig-group-list/pig-group-list';
import { InputTextComponent } from '../components/input-text/input-text';
import { InputSelectComponent } from '../components/input-select/input-select';
import { InputDateComponent } from '../components/input-date/input-date';
import { InputSelectTargetComponent } from '../components/input-select-target/input-select-target';
import { PigListComponent } from '../components/pig-list/pig-list';

import { HideHeaderDirective } from '../directives/hide-header/hide-header';

//Native implement
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Toast } from '@ionic-native/toast';

import { Utils} from '../common/utils';
import { PigsProvider } from '../providers/pigs/pigs';
import { FarmsProvider } from '../providers/farms/farms';
import { IonicStorageModule } from '@ionic/storage';
import { SectionsProvider } from '../providers/sections/sections';
import { HousesProvider } from '../providers/houses/houses';
import { HighChartProvider } from '../providers/high-chart/high-chart';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { FilterProvider } from '../providers/filter/filter';
import { EmployeesProvider } from '../providers/employees/employees';




const Pages = [
  LoginPage,
  HomePage,
  FarmsPage,
  SectionsPage,
  PigsPage,
  PigViewPage,
  PigInfomationPage,
  FarmInfomationPage,
  SectionInfomationPage,
  PigReviewIndexPage,
  HouseInfomationPage,
  PigGroupsPage,
  EmployeePage,
  PigGroupInformationPage,
  DatePlanPage,
  EmployeeInformationPage,
  TestInputPage,
  FarmInputPage,
  PigGroupListComponent,
  EmployeeListComponent,
  PigListComponent
]

const Components = [
  ExpandableComponent,
  HeaderComponent,
  FarmComponent,
  EmployeeListComponent,
  PigGroupListComponent,
  InputTextComponent,
  InputDateComponent,
  InputSelectComponent,
  InputSelectTargetComponent,
  PigListComponent
]

const Providers = [
  PigsProvider,
  FarmsProvider,
  SectionsProvider,
  HousesProvider,
  HighChartProvider,
  PigGroupsProvider,
  FilterProvider,
  EmployeesProvider
]

const Directives = [
  HideHeaderDirective
]

@NgModule({
  declarations: [
    MyApp,
    ...Pages,
    ...Components,
    ...Directives
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
    FullCalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...Pages,
    MyApp,
  ],
  providers: [
    Toast,
    StatusBar,
    SplashScreen,
    HeaderColor ,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    ...Providers,
    PigGroupsProvider,
    FilterProvider,
    EmployeesProvider
  ]
})
export class AppModule {}
