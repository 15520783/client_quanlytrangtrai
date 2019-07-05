import { CONFIG, MESSAGE, VARIABLE } from '../../common/const';
import { Component, Input, ViewChild } from '@angular/core';
import { Content, Events, IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { invoicePigDetail, invoicesPig, pig } from '../../common/entity';

import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { FilterProvider } from '../../providers/filter/filter';
import { FormControl } from '@angular/forms';
import { ImportInternalPigInvoiceInputPage } from '../import-internal-pig-invoice-input/import-internal-pig-invoice-input';
import { InvoicesProvider } from '../../providers/invoices/invoices';
import { PigListComponent } from '../../components/pig-list/pig-list';
import { PigsProvider } from '../../providers/pigs/pigs';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-forwarding-pig-invoice-list',
  templateUrl: 'forwarding-pig-invoice-list.html',
})
export class ForwardingPigInvoiceListPage {

  @ViewChild('contentExternalInvoice') content: Content;
  @Input() invoices: Array<invoicesPig> = [];
  public invoicesDetails: Array<invoicePigDetail> = [];
  public pigBelongs: Array<pig>;

  public roleInput: any;

  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "exportDateDisplay", label: 'Ngày xuất' },
    { name: "quantity", label: 'Tổng số heo' },
    { name: "totalWeight", label: 'Tổng trọng lượng' },
    { name: "statusName", label: 'Trạng thái', usingBadge: true },
    { name: "createBy", label: 'Người lập' }
  ];

  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "quantity", "totalWeight", "statusName", "createBy"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  public farms_util = {};
  public pig_util = {};


  constructor(
    public filterProvider: FilterProvider,
    public util: Utils,
    public navCtrl: NavController,
    public events: Events,
    public deployData: DeployDataProvider,
    public invoiceProvider: InvoicesProvider,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public pigProvider: PigsProvider,
    public userProvider: UserProvider
  ) {
    this.farms_util = this.deployData.get_object_list_key_of_farm();
    this.pig_util = this.deployData.get_object_list_key_of_pig();

    this.getForwardingPigInvoice().then((invoices) => {
      this.setFilteredItems();
    });
  }

  public setFilteredItems() {
    setTimeout(() => {
      this.rows = this.filterItems(this.searchTerm);
      this.page_Total = this.rows.length % 50 === 0 ? parseInt(this.rows.length / 50 + '') : parseInt(this.rows.length / 50 + 1 + '');
      this.page_Idx = 1;
      this.visible_items = this.rows.slice(0, 50);
      if (document.getElementById('content'))
        document.getElementById('content').scrollTop = 0;
    }, 200);
  }

  public filterItems(searchItem) {
    this.invoices.forEach((invoice) => {
      invoice['sourceName'] = this.farms_util[invoice.sourceId].name;
      invoice['destinationName'] = this.farms_util[invoice.destinationId].name;
      invoice['exportDateDisplay'] = this.util.convertDate(invoice.exportDate);
      invoice['createBy'] = invoice.employee ? invoice.employee.name : '';
      switch (invoice.status) {
        case VARIABLE.INVOICE_STATUS.FORWARDING: {
          invoice['statusName'] = 'Đang chuyển heo'; break;
        }
        default: {
          invoice['statusName'] = 'Không xác định'; break;
        }
      }
      switch (invoice.status) {
        case VARIABLE.INVOICE_STATUS.COMPLETE: {
          invoice['color'] = 'secondary';
          break;
        }

        case VARIABLE.INVOICE_STATUS.PROCCESSING: {
          invoice['color'] = 'main';
          break;
        }

        case VARIABLE.INVOICE_STATUS.FORWARDING: {
          invoice['color'] = 'warning';
          break;
        }

        default: {
          invoice['color'] = 'danger';
          break;
        }
      }
    })
      ;
    this.filterProvider.input = this.invoices;
    this.filterProvider.searchText = searchItem;
    this.filterProvider.searchWithText = this.filter_default;

    this.filterProvider.searchWithRange = {}
    return this.filterProvider.filter().sort((a: invoicesPig, b: invoicesPig) =>
      (new Date(a.importDate) > new Date(b.importDate)) ? -1 : 1
    );
  }

  loadData(infiniteScroll) {
    setTimeout(() => {
      let start = 50 * this.page_Idx + 1;
      let end = start + 50;
      this.page_Idx++;

      this.visible_items.push.apply(this.visible_items, this.rows.slice(start, end));
      infiniteScroll.complete();
    }, 800);
  }


  getForwardingPigInvoice() {
    this.util.openBackDrop();
    return this.invoiceProvider.getAllForwardingPigInvoices()
      .then((invoices) => {
        if (invoices) {
          this.invoices = invoices.invoicesPig;
          this.invoicesDetails = invoices.invoicePigDetail;
          this.pigBelongs = invoices.pigs;
        }
        this.util.closeBackDrop();
      })
      .catch((err) => {
        console.log(err);
        this.util.closeBackDrop().then(() => {
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR);
        })
      })
  }




  viewAndCreateInvoice(item: invoicesPig) {
    let pigIdBelongInvoice: any = [];
    this.invoicesDetails.forEach((detail) => {
      if (detail.invoice.id == item.id) {
        pigIdBelongInvoice.push(detail.objectId);
      }
    });
    let pigs = [];
    this.pigBelongs.forEach((pig) => {
      if (pigIdBelongInvoice.includes(pig.id)) {
        pig.breedId = pig.breed.id;
        pig.houseId = pig.house.id;
        pig.statusId = pig.status.id;
        pigs.push(pig);
      }
    })

    let subscribe = (res: any) => {
      console.log(pigs);

      let callback = (data: { houseId: string, sectionId: string, invoice: invoicesPig }) => {
        if (data) {
          item.status = VARIABLE.INVOICE_STATUS.COMPLETE;

          pigs = pigs.filter(pig => {
            return !pig.notActive ? true : false;
          });

          pigs.forEach((pig) => {
            pig.house.id = data.houseId;
            pig.house.section.id = data.sectionId;
            pig.house.section.farm.id = data.invoice.destinationId;
            let currentStatus = this.deployData.get_status_by_id(pig.statusId);
            let previousStatus = this.deployData.get_status_pig_by_status_code(currentStatus.previousStatus);
            pig.status = previousStatus;
          })

          let destination = this.deployData.get_farm_by_id(data.invoice.destinationId);
          let des_manager = this.deployData.get_employee_by_id(data.invoice.destinationManager);
          data.invoice.sourceManagerName = item.sourceManagerName;
          data.invoice.sourceAddress = item.sourceAddress;
          if (destination) {
            data.invoice.destinationAddress = destination.name;
            data.invoice.destinationManager = destination.manager;
          }
          if (des_manager) {
            data.invoice.destinationManagerName = des_manager.name;
          }
          data.invoice.quantity = pigs.length;

          let params = {
            invoicesPig: data.invoice,
            pigsList: pigs,
            invoicesPigUpdate: item
          }

          this.invoiceProvider.createImportInternalPigInvoice((params))
            .then((data) => {
              if (data) {
                data.pigsList.forEach(e => {
                  this.pigProvider.updatedPig(e);
                });
                let idx = this.invoices.findIndex(invoice => invoice.id == item.id);
                if (idx > -1) {
                  this.invoices.splice(idx, 1);
                  idx = this.visible_items.findIndex(invoice => invoice.id == item.id);
                  this.visible_items.splice(idx, 1);
                }
              }
              this.navCtrl.pop().then(() => {
                this.navCtrl.pop().then(() => {
                  this.navCtrl.pop().then(() => {
                    // this.events.publish('invoicesPage:sync');
                    this.navParams.get('callback')(data.invoicesPig);
                  });
                });
              })
            })
            .catch((err) => { })
        }
      };

      this.navCtrl.push(ImportInternalPigInvoiceInputPage, {
        sourceId: item.sourceId,
        destinationId:item.destinationId,
        vehicleNumber: item.vehicleNumber,
        callback: callback
      });
    }

    this.navCtrl.push(PigListComponent, {
      pigs: pigs,
      viewMode: true,
      FooterButtons: [{
        label: 'Lập phiếu nhập',
        color: 'secondary',
        callback: subscribe
      }]
    });
  }
}
