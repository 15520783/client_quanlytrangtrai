import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events } from 'ionic-angular';
import { EmployeesProvider } from '../../providers/employees/employees';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  @ViewChild('pregnancyStatus') pregnancy_status_ele: any;
  @ViewChild('breedingTypes') breeding_types_ele: any;
  @ViewChild('slider') slider: Slides;


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
  // public settings = [
  //   {
  //     placeholderSearch: 'Tìm kiếm nhân viên',
  //     filter_default: ["name", "address", "email", "birthday"],
  //     attributes: ["name", "address", "email", "birthday"],
  //     mainAttribute: 'name',
  //     data: this.employeeProvider.employees
  //   },
  //   {
  //     placeholderSearch: 'Tìm kiếm trạng thái mang thai',
  //     filter_default: ["name", "description"],
  //     attributes: ["name", "description"],
  //     mainAttribute: 'name',
  //     data: this.pregnancy_status,
  //   },
  //   {
  //     placeholderSearch: 'Tìm kiếm loại lên giống',
  //     filter_default: ["name", "address", "email", "birthday"],
  //     attributes: ["name", "address", "email", "birthday"],
  //     mainAttribute: 'name',
  //     data: this.breeding_types
  //   }
  // ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public employeeProvider: EmployeesProvider,
    public events: Events,
    public renderer: Renderer
  ) {

    this.list_settings = [
      {
        title: 'Trạng thái mang thai',
        placeholderSearch: 'Tìm kiếm trạng thái mang thai',
        filter_default: ["name", "description"],
        attributes: ["name", "description"],
        mainAttribute: 'name',
        data: this.pregnancy_status,
        create(e) {
          if (e)
            console.log('handle active');
        },
        edit(e) {
          if (e) console.log(e);
        }
      },
      {
        title: 'Trạng thái lên giống',
        placeholderSearch: 'Tìm kiếm loại lên giống',
        filter_default: ["name", "address", "email", "birthday"],
        attributes: ["name", "address", "email", "birthday"],
        mainAttribute: 'name',
        data: this.breeding_types,
        create(e) {
          if (e)
            console.log('handle active');
        },
        edit(e) {
          if (e) console.log(e);
        }
      },
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

  ngAfterViewInit() {
    if (this.slider)
      this.slider.autoHeight = true;
    console.log('ngAfterViewInit FarmInfomationPage');
    // this.events.publish('viewEmployee:open');

    let element: any = document.getElementsByClassName('setting-util-component');
    for (let i = 0; i < element.length; i++) {
      this.renderer.setElementStyle(element[i], 'height', 90 + 'vH');
    }
  }

  ionViewDidLoad() {
    // this.slider.lockSwipes(true);
    console.log('ionViewDidLoad SettingsPage');



  }

  scrollToView(idx: number) {
    this.slider.slideTo(idx);
    // element.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
