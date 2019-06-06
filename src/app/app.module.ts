import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { HttpModule } from '../../node_modules/@angular/http';
import { AngularFireModule } from '@angular/fire';
import { TokenInterceptor } from './interceptor';
import { AngularFirestore, FirestoreSettingsToken } from 'angularfire2/firestore';
import { DatePipe } from '@angular/common';

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
import { EmployeeInformationPage } from '../pages/employee-information/employee-information';
import { TestInputPage } from '../pages/test-input/test-input';
import { FarmInputPage } from '../pages/farm-input/farm-input';
import { HouseInputPage } from '../pages/house-input/house-input';
import { EmployeeInputPage } from '../pages/employee-input/employee-input';
import { PigInputPage } from '../pages/pig-input/pig-input';
import { PigGroupInputPage } from '../pages/pig-group-input/pig-group-input';
import { WarehouseInformationPage } from '../pages/warehouse-information/warehouse-information';
import { WarehousesPage } from '../pages/warehouses/warehouses';
import { SettingsPage } from '../pages/settings/settings';
import { PartnersPage } from '../pages/partners/partners';
import { ActivitiesPage } from '../pages/activities/activities';
import { InvoicesPage } from '../pages/invoices/invoices';
import { ExternalPigInvoiceDetailPage } from '../pages/external-pig-invoice-detail/external-pig-invoice-detail';
import { FoodWarehouseInputPage } from '../pages/food-warehouse-input/food-warehouse-input';
import { FoodInvoiceDetailPage } from '../pages/food-invoice-detail/food-invoice-detail';
import { MedicineInvoiceDetailPage } from '../pages/medicine-invoice-detail/medicine-invoice-detail';
import { MedicineWarehouseInputPage } from '../pages/medicine-warehouse-input/medicine-warehouse-input';
import { InternalPigInvoiceDetailPage } from '../pages/internal-pig-invoice-detail/internal-pig-invoice-detail';
import { InputPigToInternalInvoicePage } from '../pages/input-pig-to-internal-invoice/input-pig-to-internal-invoice';
import { PigListSectionPage } from '../pages/pig-list-section/pig-list-section';
import { SpermInputPage } from '../pages/sperm_input/sperm_input';
import { SpermListPage } from '../pages/sperm-list/sperm-list';
import { MatingInputPage } from '../pages/mating-input/mating-input';
import { DatePlanPage } from '../pages/date-plan/date-plan';
import { HealthInputPage } from '../pages/health-input/health-input';
import { BreedingListPage } from '../pages/breeding-list/breeding-list';
import { PigSummaryPage } from '../pages/pig-summary/pig-summary';
import { MatingListPage } from '../pages/mating-list/mating-list';
import { MedicineWarehouseInformationPage } from '../pages/medicine-warehouse-information/medicine-warehouse-information';
import { BirthInputPage } from '../pages/birth-input/birth-input';
import { BirthListPage } from '../pages/birth-list/birth-list';
import { BirthChildDetailPage } from '../pages/birth-child-detail/birth-child-detail';
import { ChildPigInputPage } from '../pages/child-pig-input/child-pig-input';
import { ExportInternalPigInvoiceDetailPage } from '../pages/export-internal-pig-invoice-detail/export-internal-pig-invoice-detail';
import { ForwardingPigInvoiceListPage } from '../pages/forwarding-pig-invoice-list/forwarding-pig-invoice-list';
import { ImportInternalPigInvoiceInputPage } from '../pages/import-internal-pig-invoice-input/import-internal-pig-invoice-input';
import { FeedInputPage } from '../pages/feed-input/feed-input';
import { BreedingInputPage } from '../pages/breeding-input/breeding-input';
import { IssuePigListPage } from '../pages/issue-pig-list/issue-pig-list';
import { UsedMedicineInputPage } from '../pages/used-medicine-input/used-medicine-input';
import { SettingRolePage } from '../pages/setting-role/setting-role';
import { MedicineListPage } from '../pages/medicine-list/medicine-list';
import { DiseaseListPage } from '../pages/disease-list/disease-list';
import { MedicineWarehouseListPage } from '../pages/medicine-warehouse-list/medicine-warehouse-list';

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
import { SettingUtilComponent } from '../components/setting-util/setting-util';
import { SettingInputUtilComponent } from '../components/setting-input-util/setting-input-util';
import { InternalPigInvoicesComponent } from '../components/internal-pig-invoices/internal-pig-invoices';
import { ExternalPigInvoicesComponent } from '../components/external-pig-invoices/external-pig-invoices';
import { InvoiceInputUtilComponent } from '../components/invoice-input-util/invoice-input-util';
import { FoodInvoicesComponent } from '../components/food-invoices/food-invoices';
import { MedicineInvoicesComponent } from '../components/medicine-invoices/medicine-invoices';
import { BackdropComponent } from '../components/backdrop/backdrop';
import { OptionListPigSectionComponent } from '../components/option-list-pig-section/option-list-pig-section';
import { SalePigInvoicesComponent } from '../components/sale-pig-invoices/sale-pig-invoices';
import { NotFoundDataComponent } from '../components/not-found-data/not-found-data';
import { SchelduleDetailComponent } from '../components/scheldule-detail/scheldule-detail';
import { ListFabButtonPigComponent } from '../components/list-fab-button-pig/list-fab-button-pig';
import { ExportInternalPigInvoiceComponent } from '../components/export-internal-pig-invoice/export-internal-pig-invoice';

import { HideHeaderDirective } from '../directives/hide-header/hide-header';

//Native implement
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Firebase } from '@ionic-native/firebase';

import { Utils } from '../common/utils';
import { PigsProvider } from '../providers/pigs/pigs';
import { FarmsProvider } from '../providers/farms/farms';
import { IonicStorageModule } from '@ionic/storage';
import { SectionsProvider } from '../providers/sections/sections';
import { HousesProvider } from '../providers/houses/houses';
import { HighChartProvider } from '../providers/high-chart/high-chart';
import { PigGroupsProvider } from '../providers/pig-groups/pig-groups';
import { FilterProvider } from '../providers/filter/filter';
import { EmployeesProvider } from '../providers/employees/employees';
import { WarehousesProvider } from '../providers/warehouses/warehouses';
import { SettingsProvider } from '../providers/settings/settings';
import { UserProvider } from '../providers/user/user';
import { DeployDataProvider } from '../providers/deploy-data/deploy-data';
import { PartnerProvider } from '../providers/partner/partner';
import { InvoicesProvider } from '../providers/invoices/invoices';
import { ActivitiesProvider } from '../providers/activities/activities';
import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFireMessaging } from 'angularfire2/messaging';


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
  MedicineWarehouseListPage
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
    AngularFireModule.initializeApp( firebaseConfig),
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
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
