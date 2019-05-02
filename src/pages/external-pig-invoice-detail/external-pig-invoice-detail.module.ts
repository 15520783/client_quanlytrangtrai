import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExternalPigInvoiceDetailPage } from './external-pig-invoice-detail';

@NgModule({
  declarations: [
    ExternalPigInvoiceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExternalPigInvoiceDetailPage),
  ],
})
export class ExternalPigInvoiceDetailPageModule {}
