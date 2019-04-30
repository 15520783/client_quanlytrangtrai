import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  public section_type:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform) {
    this.section_type =  [
      {
        id: 1,
        name: "Khu cách ly",
        function: [
          { name: "Danh sách chứng từ nhập heo" },
          { name: "Lên giống" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 2,
        name: "Khu nọc",
        function: [
          { name: "Nhập heo" },
          { name: "Khai thác tinh heo" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 3,
        name: "Khu phối",
        function: [
          { name: "Nhập heo" },
          { name: "Phối giống" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 4,
        name: "Khu mang thai",
        function: [
          { name: "Nhập heo" },
          { name: "Phối giống" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 5,
        name: "Khu đẻ",
        function: [
          { name: "Nhập heo" },
          { name: "Phối giống" },
          { name: "Cai sữa heo nái" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 6,
        name: "Khu cai sữa",
        function: [
          { name: "Nhập heo" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 7,
        name: "Khu hậu bị",
        function: [
          { name: "Nhập heo" },
          { name: "Đánh giá Offtest heo con" },
          { name: "Chuyển(xuất) heo" }
        ],
      },
      {
        id: 8,
        name: "Khu chờ bán",
        function: [
          { name: "Lên danh sách chờ bán" },
          { name: "Xuất bán heo" }
        ],
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

}
