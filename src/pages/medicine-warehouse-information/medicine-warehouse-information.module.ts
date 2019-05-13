import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineWarehouseInformationPage } from './medicine-warehouse-information';

@NgModule({
  declarations: [
    MedicineWarehouseInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineWarehouseInformationPage),
  ],
})
export class MedicineWarehouseInformationPageModule {}
