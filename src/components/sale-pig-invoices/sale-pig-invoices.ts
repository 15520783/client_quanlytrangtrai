import { Component, Input } from '@angular/core';
import { invoicesPig } from '../../common/entity';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sale-pig-invoices',
  templateUrl: 'sale-pig-invoices.html'
})
export class SalePigInvoicesComponent {

  @Input() invoices: Array<invoicesPig> = [];
  public roleInput: any;

  public mainAttribute = "invoiceNo";
  public attributes = [
    { name: "sourceName", label: 'Nguồn cung cấp' },
    { name: "destinationName", label: 'Nơi nhận' },
    { name: "importDateDisplay", label: 'Ngày nhập' },
    { name: "quantity", label: 'Tổng số heo' },
    { name: "totalWeight", label: 'Tổng trọng lượng' },
    { name: "statusName", label: 'Trạng thái' },
  ];
  
  public placeholderSearch: string = 'Tìm kiếm chứng từ'
  public filter_default: Array<string> = ["invoiceNo", "sourceName", "destinationName", "importDateDisplay", "quantity","totalWeight","statusName"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  public partners_util = {};
  public farms_util = {};

  constructor() {
  }

}
