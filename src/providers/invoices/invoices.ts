import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API } from '../../common/const';
import { invoicesPig, invoicesProduct, invoicePigDetail, foodWareHouse } from '../../common/entity';
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
    return this.http
      .get(API.GET_ALL_INVOICES)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createPigInvoice(objBody: invoicesPig) {
    return this.http
      .post(API.CREATE_PIG_INVOICE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  removePigInvoice(objBody:invoicesPig){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
    .delete(API.DELETE_PIG_INVOICE,options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  createProductInvoice(objBody:invoicesProduct){
    return this.http
    .post(API.CREATE_PRODUCT_INVOICE,objBody)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();    
  }

  removeProductInvoice(objBody:invoicesProduct){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
    .delete(API.DELETE_PRODUCT_INVOICE,options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  getPigInvoiceDetail(invoiceId:string){
    return this.http
    .get(API.GET_PIG_INVOICE_DETAIL_FROM_INVOICE.concat(invoiceId))
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  getFoodWarehouse(invoiceId:string){
    return this.http
    .get(API.GET_FOOD_WAREHOUSE_FROM_INVOICE.concat(invoiceId))
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }

  removePigInvoiceDetail(objBody:invoicePigDetail){
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
    .delete(API.DELETE_PIG_INVOICE_DETAIL,options)
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
  
  createPigInvoiceDetail(objBody:invoicePigDetail){
    return this.http
      .post(API.CREATE_PIG_INVOICE_DETAIL,objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  createFoodWareHouse(objBody:foodWareHouse){
    return this.http
      .post(API.CREATE_FOOD_WAREHOUSE,objBody)
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
