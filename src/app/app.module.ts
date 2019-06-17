import { AngularFirestore, FirestoreSettingsToken } from 'angularfire2/firestore';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { ActivitiesPage } from '../pages/activities/activities';
import { ActivitiesProvider } from '../providers/activities/activities';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { AngularFireModule } from '@angular/fire';
import { BackdropComponent } from '../components/backdrop/backdrop';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BirthChildDetailPage } from '../pages/birth-child-detail/birth-child-detail';
import { BirthInputPage } from '../pages/birth-input/birth-input';
import { BirthListPage } from '../pages/birth-list/birth-list';
import { BreedingInputPage } from '../pages/breeding-input/breeding-input';
import { BreedingListPage } from '../pages/breeding-list/breeding-list';
import { BrowserModule } from '@angular/platform-browser';
import { ChildPigInputPage } from '../pages/child-pig-input/child-pig-input';
import { DatePipe } from '@angular/common';
import { DatePlanPage } from '../pages/date-plan/date-plan';
import { DeployDataProvider } from '../providers/deploy-data/deploy-data';
import { DiseaseListPage } from '../pages/disease-list/disease-list';
import { EmployeeInformationPage } from '../pages/employee-information/employee-information';
import { EmployeeInputPage } from '../pages/employee-input/employee-input';
import { EmployeeListComponent } from '../components/employee-list/employee-list';
import { EmployeePage } from '../pages/employee/employee';
import { EmployeesProvider } from '../providers/employees/employees';
import { ExpandableComponent } from '../components/expandable/expandable';
import { ExportInternalPigInvoiceComponent } from '../components/export-internal-pig-invoice/export-internal-pig-invoice';
import { ExportInternalPigInvoiceDetailPage } from '../pages/export-internal-pig-invoice-detail/export-internal-pig-invoice-detail';
import { ExternalPigInvoiceDetailPage } from '../pages/external-pig-invoice-detail/external-pig-invoice-detail';
import { ExternalPigInvoicesComponent } from '../components/external-pig-invoices/external-pig-invoices';
import { FarmComponent } from '../components/farm/farm';
import { FarmInfomationPage } from '../pages/farm-infomation/farm-infomation';
import { FarmInputPage } from '../pages/farm-input/farm-input';
import { FarmsPage } from '../pages/farms/farms';
import { FarmsProvider } from '../providers/farms/farms';
import { FcmProvider } from '../providers/fcm/fcm';
import { FeedInputPage } from '../pages/feed-input/feed-input';
import { FilterProvider } from '../providers/filter/filter';
import { Firebase } from '@ionic-native/firebase';
import { FoodInvoiceDetailPage } from '../pages/food-invoice-detail/food-invoice-detail';
import { FoodInvoicesComponent } from '../components/food-invoices/food-invoices';
import { FoodWarehouseInputPage } from '../pages/food-warehouse-input/food-warehouse-input';
import { ForwardingPigInvoiceListPage } from '../pages/forwarding-pig-invoice-list/forwarding-pig-invoice-list';
import { FullCalendarModule } from 'ng-fullcalendar';
import { HeaderColor } from '@ionic-native/header-color';
import { HeaderComponent } from '../components/header/header';
import { HealthInputPage } from '../pages/health-input/health-input';
import { HideHeaderDirective } from '../directives/hide-header/hide-header';
import { HighChartProvider } from '../providers/high-chart/high-chart';
import { HomePage } from '../pages/home/home';
import { HouseInfomationPage } from '../pages/house-infomation/house-infomation';
import { HouseInputPage } from '../pages/house-input/house-input';
import { HousesProvider } from '../providers/houses/houses';
import { HttpModule } from '../../node_modules/@angular/http';
import { ImportInternalPigInvoiceInputPage } from '../pages/import-internal-pig-invoice-input/import-internal-pig-invoice-input';
import { InputDateComponent } from '../components/input-date/input-date';
import { InputPigToInternalInvoicePage } from '../pages/input-pig-to-internal-invoice/input-pig-to-internal-invoice';
import { InputSelectComponent } from '../components/input-select/input-select';
import { InputSelectTargetComponent } from '../components/input-select-target/input-select-target';
import { InputTextComponent } from '../components/input-text/input-text';
import { InternalPigInvoiceDetailPage } from '../pages/internal-pig-invoice-detail/internal-pig-invoice-detail';
import { InternalPigInvoicesComponent } from '../components/internal-pig-invoices/internal-pig-invoices';
import { InvoiceInputUtilComponent } from '../components/invoice-input-util/invoice-input-util';
import { InvoicesPage } from '../pages/invoices/invoices';
import { InvoicesProvider } from '../providers/invoices/invoices';
import { IonicStorageModule } from '@ionic/storage';
import { IssuePigListComponent } from '../components/issue-pig-list/issue-pig-list';
import { IssuePigListPage } from '../pages/issue-pig-list/issue-pig-list';
import { ListFabButtonPigComponent } from '../components/list-fab-button-pig/list-fab-button-pig';
import { LoginPage } from '../pages/login/login';
import { MatingInputPage } from '../pages/mating-input/mating-input';
import { MatingListPage } from '../pages/mating-list/mating-list';
import { MedicineInvoiceDetailPage } from '../pages/medicine-invoice-detail/medicine-invoice-detail';
import { MedicineInvoicesComponent } from '../components/medicine-invoices/medicine-invoices';
import { MedicineListPage } from '../pages/medicine-list/medicine-list';
import { MedicineWarehouseInformationPage } from '../pages/medicine-warehouse-information/medicine-warehouse-information';
import { MedicineWarehouseInputPage } from '../pages/medicine-warehouse-input/medicine-warehouse-input';
import { MedicineWarehouseListPage } from '../pages/medicine-warehouse-list/medicine-warehouse-list';
import { MyApp } from './app.component';
import { NotFoundDataComponent } from '../components/not-found-data/not-found-data';
import { OptionListPigSectionComponent } from '../components/option-list-pig-section/option-list-pig-section';
import { PartnerProvider } from '../providers/partner/partner';
import { PartnersPage } from '../pages/partners/partners';
import { PigGroupInformationPage } from '../pages/pig-group-information/pig-group-information';
import { PigGroupInputPage } from '../pages/pig-group-input/pig-group-input';
import { PigGroupListComponent } from '../components/pig-group-list/pig-group-list';
import { PigGroupsPage } from '../pages/pig-groups/pig-groups';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { PigInfomationPage } from '../pages/pig-infomation/pig-infomation';
import { PigInputPage } from '../pages/pig-input/pig-input';
import { PigListComponent } from '../components/pig-list/pig-list';
import { PigListSectionPage } from '../pages/pig-list-section/pig-list-section';
import { PigReviewIndexPage } from '../pages/pig-review-index/pig-review-index';
import { PigSummaryPage } from '../pages/pig-summary/pig-summary';
import { PigViewPage } from '../tabs/pig-view/pig-view';
import { PigsPage } from '../pages/pigs/pigs';
import { PigsProvider } from '../providers/pigs/pigs';
import { ReviewOffsetPigPage } from '../pages/review-offset-pig/review-offset-pig';
import { SalePigInvoiceDetailPage } from '../pages/sale-pig-invoice-detail/sale-pig-invoice-detail';
import { SalePigInvoicesComponent } from '../components/sale-pig-invoices/sale-pig-invoices';
import { ScheduleInputPage } from '../pages/schedule-input/schedule-input';
import { SchelduleDetailComponent } from '../components/scheldule-detail/scheldule-detail';
import { SectionInfomationPage } from '../pages/section-infomation/section-infomation';
import { SectionInputPage } from '../pages/section-input/section-input';
import { SectionsPage } from '../pages/sections/sections';
import { SectionsProvider } from '../providers/sections/sections';
import { SettingInputUtilComponent } from '../components/setting-input-util/setting-input-util';
import { SettingRolePage } from '../pages/setting-role/setting-role';
import { SettingUtilComponent } from '../components/setting-util/setting-util';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsProvider } from '../providers/settings/settings';
import { SpermInputPage } from '../pages/sperm_input/sperm_input';
import { SpermListPage } from '../pages/sperm-list/sperm-list';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TestInputPage } from '../pages/test-input/test-input';
import { Toast } from '@ionic-native/toast';
import { TokenInterceptor } from './interceptor';
import { UsedMedicineInputPage } from '../pages/used-medicine-input/used-medicine-input';
import { UserAccountListPage } from '../pages/user-account-list/user-account-list';
import { UserInputPage } from '../pages/user-input/user-input';
import { UserProvider } from '../providers/user/user';
import { Utils } from '../common/utils';
import { WarehouseInformationPage } from '../pages/warehouse-information/warehouse-information';
import { WarehouseListPage } from '../pages/warehouse-list/warehouse-list';
import { WarehousesPage } from '../pages/warehouses/warehouses';
import { WarehousesProvider } from '../providers/warehouses/warehouses';

class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    // do something with the error
    console.log(err);
  }
}

const Pages = [
  LoginPage,
  HomePage,
  FarmsPage,
  SectionsPage,
  PigsPage,
  WarehousesPage,
  PartnersPage,
  SettingsPage,
  PigViewPage,
  PigInfomationPage,
  EmployeeInformationPage,
  FarmInfomationPage,
  PigGroupInformationPage,
  SectionInfomationPage,
  PigReviewIndexPage,
  HouseInfomationPage,
  WarehouseInformationPage,
  PigGroupsPage,
  EmployeePage,
  TestInputPage,
  FarmInputPage,
  HouseInputPage,
  EmployeeInputPage,
  PigGroupInputPage,
  ActivitiesPage,
  InvoicesPage,
  ExternalPigInvoiceDetailPage,
  InternalPigInvoiceDetailPage,
  PigGroupListComponent,
  EmployeeListComponent,
  PigListComponent,
  SettingUtilComponent,
  SettingInputUtilComponent,
  InvoiceInputUtilComponent,
  PigInputPage,
  FoodWarehouseInputPage,
  FoodInvoiceDetailPage,
  MedicineInvoiceDetailPage,
  MedicineWarehouseInputPage,
  InputPigToInternalInvoicePage,
  SpermInputPage,
  BreedingInputPage,
  PigListSectionPage,
  SpermListPage,
  MatingInputPage,
  BreedingListPage,
  DatePlanPage,
  HealthInputPage,
  MedicineWarehouseInformationPage,
  PigSummaryPage,
  MatingListPage,
  BirthInputPage,
  BirthListPage,
  BirthChildDetailPage,
  ChildPigInputPage,
  ExportInternalPigInvoiceDetailPage,
  ForwardingPigInvoiceListPage,
  ImportInternalPigInvoiceInputPage,
  FeedInputPage,
  IssuePigListPage,
  UsedMedicineInputPage,
  SettingRolePage,
  DiseaseListPage,
  MedicineListPage,
  MedicineWarehouseListPage,
  WarehouseListPage,
  UserAccountListPage,
  UserInputPage,
  SalePigInvoiceDetailPage,
  ScheduleInputPage,
  ReviewOffsetPigPage,
  SectionInputPage
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
  PigListComponent,
  SettingUtilComponent,
  SettingInputUtilComponent,
  InvoiceInputUtilComponent,
  InternalPigInvoicesComponent,
  ExternalPigInvoicesComponent,
  SalePigInvoicesComponent,
  FoodInvoicesComponent,
  MedicineInvoicesComponent,
  BackdropComponent,
  OptionListPigSectionComponent,
  NotFoundDataComponent,
  SchelduleDetailComponent,
  ListFabButtonPigComponent,
  ExportInternalPigInvoiceComponent,
  IssuePigListComponent,
]

const Providers = [
  PigsProvider,
  FarmsProvider,
  SectionsProvider,
  HousesProvider,
  HighChartProvider,
  PigGroupsProvider,
  FilterProvider,
  EmployeesProvider,
  WarehousesProvider,
  SettingsProvider,
  UserProvider,
  DeployDataProvider,
  PartnerProvider,
  InvoicesProvider,
  FcmProvider,
  ActivitiesProvider,
]

const Directives = [
  HideHeaderDirective
]

export const firebaseConfig = {
  apiKey: "AIzaSyAqu86bK9NlWrXtzrcIOkaGhaXrPabnqtk",
  authDomain: "client-quanlitrangtrai.firebaseapp.com",
  databaseURL: "https://client-quanlitrangtrai.firebaseio.com",
  projectId: "client-quanlitrangtrai",
  storageBucket: "client-quanlitrangtrai.appspot.com",
  messagingSenderId: "408745267986",
  appId: "1:408745267986:web:2c72be0dbcb6fe6e"
};

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
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      tabsPlacement: 'top',
      iconMode: 'ios',
      activator: 'ripple'
    }),
    FullCalendarModule,
    HttpModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...Pages,
    ...Components,
    MyApp,
  ],
  providers: [
    AngularFireMessaging,
    AngularFirestore,
    Firebase,
    { provide: FirestoreSettingsToken, useValue: {} },
    Toast,
    StatusBar,
    SplashScreen,
    HeaderColor,
    BarcodeScanner,
    // { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: MyErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Utils,
    ...Providers,
    DatePipe,

  ]
})
export class AppModule { }


