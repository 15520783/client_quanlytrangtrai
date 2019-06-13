import { API, CONFIG, KEY } from '../../common/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { foodWareHouse, invoicePigDetail, invoicesPig, invoicesProduct, medicineWarehouse, pig } from '../../common/entity';

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utils } from '../../common/utils';

export class invoices {
  invoicesPigs: Array<invoicesPig> = [];
  invoicesProducts: Array<invoicesProduct> = [];
}

@Injectable()
export class InvoicesProvider {

  constructor(
    public http: HttpClient,
    public events: Events,
    public util: Utils
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
   * Lấy danh sách chứng từ chuyển heo đến của trang trại
   */
  getAllForwardingPigInvoices() {
    return this.http
      .get<{ invoicesPig: Array<invoicesPig>, invoicePigDetail: Array<invoicePigDetail>, pigs:Array<pig> }>(API.GET_ALL_FORWARDING_PIG_INVOICE)
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
   * Tạo chứng từ nhập heo vào hệ thống
   * @param objBody 
   */
  createImportInternalPigInvoice(objBody:{invoicesPig:invoicesPig,invoicesPigUpdate:invoicesPig,pigsList:Array<pig>}){
    return this.http
    .post<{pigsList:Array<pig>,invoicesPig:invoicesPig,invoicePigDetailList:invoicePigDetail}>(API.CREATE_IMPORT_INTERNAL_PIG_INVOICE,objBody)
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
   * Cập nhật chứng từ heo
   * @param objBody 
   */
  updatePigInvoice(objBody: invoicesPig) {
    return this.http
      .put(API.UPDATE_PIG_INVOICE, objBody)
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
   * Cập nhật một chứng từ cám,thuốc
   * @param objBody 
   */
  updateProductInvoice(objBody:invoicesProduct){
    return this.http
    .put(API.UPDATE_PRODUCT_INVOICE,objBody)
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

  getMedicineWarehouse(invoiceId: string) {
    return this.http
      .get(API.GET_MEDICINE_WAREHOUSE_FROM_INVOICE.concat(invoiceId))
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa chi tiết của chứng từ nhập heo ngoài hệ thống
   * @param objBody 
   */
  removeExternalImportPigInvoiceDetail(objBody: invoicePigDetail) {
    const options = {
      headers: new HttpHeaders(),
      body: objBody
    };
    return this.http
      .delete(API.DELETE_EXTERNAL_IMPORT_PIG_INVOICE_DETAIL, options)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Xóa chi tiết chừng từ heo
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
   * Tạo mới chi tiết của chứng từ heo (trong trường hợp tạo mới heo hoặc cập nhật lại heo)
   * @param objBody 
   */
  // createPigInvoiceDetail(objBody: invoicePigDetail) {
  //   return this.http
  //     .post(API.CREATE_PIG_INVOICE_DETAIL, objBody)
  //     .timeout(CONFIG.DEFAULT_TIMEOUT)
  //     .toPromise();
  // }
  createPigInvoiceDetail(objBody: { pigs: any, invoicesPig: invoicesPig }) {
    return this.http
      .post<{ invoicePigDetail: invoicePigDetail, pigs: pig }>(API.CREATE_PIG_INVOICE_DETAIL, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
      // .then((response) => {
      //   if (response && response.pigs && response.invoicePigDetail) {
      //     this.util.getKey(KEY.PIGS).then((pigs: Array<pig>) => {
      //       pigs.push(response.pigs);
      //       this.util.setKey(KEY.PIGS, pigs);
      //     })
      //   }
      //   return response;
      // })
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
   * Cập nhật một chi tiết cho chứng từ cám
   * @param objBody 
   */
  updateFoodWareHouse(objBody: foodWareHouse) {
    return this.http
      .put(API.UPDATE_FOOD_WAREHOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Tạo mới một chi tiết cho chứng từ thuốc
   * @param objBody 
   */
  createMedicineWarehouse(objBody: medicineWarehouse) {
    return this.http
      .post(API.CREATE_MEDICINE_WAREHOUSE, objBody)
      .timeout(CONFIG.DEFAULT_TIMEOUT)
      .toPromise();
  }

  /**
   * Cập nhật một chi tiết cho chứng từ thuốc
   * @param objBody 
   */
  updateMedicineWarehouse(objBody: medicineWarehouse) {
    return this.http
      .put(API.UPDATE_MEDICINE_WAREHOUSE, objBody)
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
