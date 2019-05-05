import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG, API } from '../../common/const';
import { invoicesPig, invoicesProduct, invoicePigDetail, foodWareHouse, medicineWarehouse } from '../../common/entity';
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

  /**
   * Lấy danh sách chứng từ (gồm chứng từ heo và chứng từ cám,thuốc)
   */
  getAllInvoices() {
    return this.http
      .get(API.GET_ALL_INVOICES)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một chứng từ heo
   * @param objBody 
   */
  createPigInvoice(objBody: invoicesPig) {
    return this.http
      .post(API.CREATE_PIG_INVOICE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa  chứng từ heo
   * @param objBody 
   */
  removePigInvoice(objBody: invoicesPig) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_PIG_INVOICE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một chứng từ cám,thuốc
   * @param objBody 
   */
  createProductInvoice(objBody: invoicesProduct) {
    return this.http
      .post(API.CREATE_PRODUCT_INVOICE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa chứng từ cám, thuốc
   * @param objBody 
   */
  removeProductInvoice(objBody: invoicesProduct) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_PRODUCT_INVOICE, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy thông tin chi tiết của chứng từ heo
   * @param invoiceId 
   */
  getPigInvoiceDetail(invoiceId: string) {
    return this.http
      .get(API.GET_PIG_INVOICE_DETAIL_FROM_INVOICE.concat(invoiceId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Lấy thông tin chi tiết của 1 chứng từ cám
   * @param invoiceId 
   */
  getFoodWarehouse(invoiceId: string) {
    return this.http
      .get(API.GET_FOOD_WAREHOUSE_FROM_INVOICE.concat(invoiceId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  getMedicineWarehouse(invoiceId:string){
    return this.http
    .get(API.GET_MEDICINE_WAREHOUSE_FROM_INVOICE.concat(invoiceId))
    .timeout(CONFIG.DEFAULT_TIMEOUT)
    .toPromise();
  }
  
  /**
   * Xóa chi tiết của chứng từ heo
   * @param objBody 
   */
  removePigInvoiceDetail(objBody: invoicePigDetail) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_PIG_INVOICE_DETAIL, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới chi tiết của chứng từ heo
   * @param objBody 
   */
  createPigInvoiceDetail(objBody: invoicePigDetail) {
    return this.http
      .post(API.CREATE_PIG_INVOICE_DETAIL, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một chi tiết cho chứng từ cám
   * @param objBody 
   */
  createFoodWareHouse(objBody: foodWareHouse) {
    return this.http
      .post(API.CREATE_FOOD_WAREHOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một chi tiết cho chứng từ thuốc
   * @param objBody 
   */
  createMedicineWarehouse(objBody: medicineWarehouse) {
    return this.http
      .post(API.CREATE_MEDICINE_WAREHOUSE,objBody)
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
      .catch((err: Error) => {
        this.publishUpdateEvent();
        console.log('err_invoices_provider', err);
      })
  }

  publishUpdateEvent() {
    this.updated_flag = true;
    this.events.publish('updated');
  }
}
