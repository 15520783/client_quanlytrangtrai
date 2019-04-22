import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarehousesPage } from './warehouses';

@NgModule({
  declarations: [
    WarehousesPage,
  ],
  imports: [
    IonicPageModule.forChild(WarehousesPage),
  ],
})
export class WarehousesPageModule {}
