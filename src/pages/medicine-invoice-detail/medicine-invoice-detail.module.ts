import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineInvoiceDetailPage } from './medicine-invoice-detail';

@NgModule({
  declarations: [
    MedicineInvoiceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineInvoiceDetailPage),
  ],
})
export class MedicineInvoiceDetailPageModule {}
