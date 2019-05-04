import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodInvoiceDetailPage } from './food-invoice-detail';

@NgModule({
  declarations: [
    FoodInvoiceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodInvoiceDetailPage),
  ],
})
export class FoodInvoiceDetailPageModule {}
