import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API } from '../../common/const';
import { invoicesPig, invoicesProduct, invoicePigDetail } from '../../common/entity';
import { Events } from 'ionic-angular';


export class invoices {
  invoicesPigs: Array<invoicesPig> = [];
  invoicesProducts: Array<invoicesProduct> = [];
}

@Injectable()
export class InvoicesProvider {

  constructor(
    public http: HttpClient,
    public events: Events
  ) {
  }

  public updated_flag: boolean = false;
  public invoices: invoices;

  getAllInvoices() {
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .get(CONFIG.SERVER_API.concat(API.GET_ALL_INVOICES), { headers: headers })
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createPigInvoice(objBody: invoicesPig) {
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .post(CONFIG.SERVER_API.concat(API.CREATE_PIG_INVOICE), objBody, { headers: headers })
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  getPigInvoiceDetail(invoiceId:string){
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
    .get(CONFIG.SERVER_API.concat(API.GET_PIG_INVOICE_DETAIL_FROM_INVOICE).concat(invoiceId),{headers})
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
  
  createPigInvoiceDetail(objBody:invoicePigDetail){
    let headers = new HttpHeaders().set('Authorization', CONFIG.ACCESS_KEY);
    return this.http
      .post(CONFIG.SERVER_API.concat(API.CREATE_PIG_INVOICE_DETAIL),objBody,{headers:headers})
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  sync() {
    this.getAllInvoices()
      .then((data: invoices) => {
        if (data) {
          this.invoices = data;
          this.publishUpdateEvent();
        }
      })
      .catch((err:Error)=>{
        this.publishUpdateEvent();
        console.log('err_invoices_provider', err);
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
