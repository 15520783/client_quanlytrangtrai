import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternalPigInvoiceDetailPage } from './internal-pig-invoice-detail';

@NgModule({
  declarations: [
    InternalPigInvoiceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InternalPigInvoiceDetailPage),
  ],
})
export class InternalPigInvoiceDetailPageModule {}
