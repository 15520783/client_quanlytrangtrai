import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardingPigInvoiceListPage } from './forwarding-pig-invoice-list';

@NgModule({
  declarations: [
    ForwardingPigInvoiceListPage,
  ],
  imports: [
    IonicPageModule.forChild(ForwardingPigInvoiceListPage),
  ],
})
export class ForwardingPigInvoiceListPageModule {}
