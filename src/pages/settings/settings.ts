import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @ViewChild('pregnancyStatus') pregnancy_status_ele: any;
  @ViewChild('breedingTypes') breeding_types_ele: any;

  public pregnancy_status = [
    { name: 'Bình thường', description: 'Bình thường' },
    { name: 'Lốc thường', description: 'Lốc thường' },
    { name: 'Lốc mủ', description: 'Lốc mủ' },
    { name: 'Sảy thai', description: 'Sảy thai' },
  ]

  public breeding_types = [
    { name: 'Lên giống thường', description: 'Lên giống thường' },
    { name: 'Lên giống mủ', description: 'Lên giống mủ' },
    { name: 'Lên giống can thiệp', description: 'Lên giống can thiệp' },
    { name: 'Lên giống chậm', description: '' },
  ]


  public list_settings: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.list_settings = [
      { title: 'Trạng thái mang thai', compt: this.pregnancy_status_ele },
      { title: 'Trạng thái lên giống', compt: this.breeding_types_ele },
      { title: 'Trạng thái sức khỏe', compt: '' },
      { title: 'Danh sách bệnh', compt: '' },
      { title: 'Danh sách loại trang trại', compt: '' },
      { title: 'Danh sách loại thức ăn', compt: '' },
      { title: 'Danh sách nhóm thuốc', compt: '' },
      { title: 'Danh sách đơn vị thuốc', compt: '' },
      { title: 'Danh sách mã sản phẩm', compt: '' },
      { title: 'Danh sách loại chân', compt: '' },
      { title: 'Danh sách loại bộ phận sinh dục', compt: '' },
      { title: 'Danh sách lâm sàn', compt: '' },
      { title: 'Danh sách loại đánh dấu', compt: '' },
      { title: 'Danh sách phương pháp phối giống', compt: '' },
      { title: 'Danh sách lâm sàn', compt: '' },
      { title: 'Danh sách quyền', compt: '' },
      { title: 'Danh sách chức vụ', compt: '' },
    ]
  }

  scrollToView(element) {
    element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
