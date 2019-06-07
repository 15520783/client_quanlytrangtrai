import { Component } from '@angular/core';
import { issuesPigs, usedMedicine } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { Utils } from '../../common/utils';
import { FilterProvider } from '../../providers/filter/filter';
import { SettingsProvider } from '../../providers/settings/settings';
import { VARIABLE, MESSAGE, CONFIG } from '../../common/const';
import { DiseaseListPage } from '../../pages/disease-list/disease-list';
import { UsedMedicineInputPage } from '../../pages/used-medicine-input/used-medicine-input';

@Component({
  selector: 'issue-pig-list',
  templateUrl: 'issue-pig-list.html'
})
export class IssuePigListComponent {

  public isSelectMode: boolean = false;

  public issues: Array<issuesPigs> = [];
  public selectedFarm: string;
  public selectedSection: string;

  public breed: any = {};
  public gender: any = {};
  public employees: any = {};
  public issueObjectKey: any = {};
  public houses: any = {};
  public breedFilter: any = [];

  public mainAttribute = "pigCode";

  public attributes = [
    { name: 'symptom', label: 'Vấn đề' },
    { name: 'dateDisplay', label: 'Ngày ghi nhận' },
    { name: "breedName", label: 'Giống' },
    { name: "farmName", label: 'Trang trại' },
    { name: "houseName", label: 'Nhà' },
    { name: "sectionName", label: 'Khu' },
    { name: "genderName", label: 'Giới tính' },
    { name: "employeeName", label: 'Người ghi nhận' },
    { name: "description", label: 'Ghi chú' },
    { name: "healthStatusName", label: 'Trạng thái sức khỏe' }
  ];

  public placeholderSearch: string = 'Tìm kiếm ghi nhận vấn đề heo'
  public filter_default: Array<string> = ["symptom", "pigCode", "breedName", "farmName", "sectionName", "houseName", "statusName", "birthdayDisplay", "description"];

  public page_Idx: number = 1;
  public page_Total: number = 0;
  public rows: Array<any> = [];

  protected searchControl: FormControl = new FormControl();
  protected searchTerm: string = '';

  public visible_items: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public deployData: DeployDataProvider,
    public util: Utils,
    public filterProvider: FilterProvider,
    public settingProvider: SettingsProvider,
    public platform: Platform,
    public modalCtrl: ModalController
  ) {
    this.init();

    VARIABLE.gender.forEach(gender => {
      this.gender[gender.value] = gender;
    })

    if (this.navParams.data.issues) {
      this.issues = this.navParams.data.issues;
      this.setFilteredItems();
    }

    if (this.navParams.data.selectedFarm && this.navParams.data.selectedSection) {
      this.selectedFarm = this.navParams.data.selectedFarm;
      this.selectedSection = this.navParams.data.selectedSection;
    }
  }

  init() {
    this.issueObjectKey = this.deployData.get_object_list_key_of_issues();
    this.breed = this.deployData.get_object_list_key_of_breeds();
    this.houses = this.deployData.get_object_list_key_of_house();
    this.employees = this.deployData.get_object_list_key_of_employees();
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
    if (this.issues.length) {
      this.issues.forEach((issue) => {
        issue['pigCode'] = issue.pig.pigCode ? issue.pig.pigCode : '';
        issue['symptom'] = issue.issue.symptom ? issue.issue.symptom : '';
        issue['breedName'] = this.breed[issue.pig.breedId] ? this.breed[issue.pig.breedId].name + ' ' + this.breed[issue.pig.breedId].symbol : '';
        issue['sectionName'] = issue.pig.house.section.name;
        issue['houseName'] = issue.pig.house.name;
        issue['farmName'] = issue.pig.house.section.farm.name;
        issue['dateDisplay'] = this.util.convertDate(issue.date);
        issue['genderName'] = this.gender[issue.pig.gender] ? this.gender[issue.pig.gender].name : '';
        issue['employeeName'] = issue.employee.name ? issue.employee.name : '';
        issue['healthStatusName'] = issue.pig.healthStatus.name;
      })
      this.filterProvider.input = this.issues;
      this.filterProvider.searchText = searchItem;
      this.filterProvider.searchWithText = this.filter_default;
      this.filterProvider.searchWithRange = {}
      return this.filterProvider.filter();
    }
    return [];
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


  /**
  * Hiển thị danh sách gợi ý
  */
  showForecast() {
    if (this.selectedFarm && this.selectedSection) {
      this.util.openBackDrop();
      return this.settingProvider.getForecastedDiseases(this.selectedFarm, this.selectedSection)
        .then((diseases) => {
          this.util.closeBackDrop();
          if (diseases) {
            let forecastDiseases = [];
            diseases.forEach(disease => {
              disease.disease['tiLe'] = disease.tiLe;
              forecastDiseases.push(disease.disease);
            })

            let modal = this.modalCtrl.create(DiseaseListPage,
              {
                diseases: forecastDiseases,
                titleHeader: 'Danh sách gợi ý chuẩn đoán bệnh'
              });
            return modal.present();
          }
        })
        .catch((err: Error) => {
          this.util.closeBackDrop();
          this.util.showToast(MESSAGE[CONFIG.LANGUAGE_DEFAULT].ERROR_OCCUR)
          console.log(err);
          return err;
        })
    }
  }

  resolveIssuePigs() {
    let issues = [];
    let groupByIssuesId = this.util.groupBy(this.issues, issuePig => issuePig.issue.id);

    Array.from(groupByIssuesId.keys()).map(String).forEach((e) => {
      issues.push(this.issueObjectKey[e]);
    });

    let callback = (data: Array<usedMedicine>) => {
      if (data) {
        // this.getAllIssuePigs()
        //   .then((issuesPigs) => {
        //     this.issues = this.issue_groupBySection.get(this.selectedSection) ? this.issue_groupBySection.get(this.selectedSection) : [];
        //     this.setFilteredItems();
        //   })
        this.navCtrl.pop().then(()=>{
          this.navCtrl.pop();
        });
        this.navParams.get('callback')(data);
      }
    }

    this.navCtrl.push(UsedMedicineInputPage,
      {
        farmId: this.selectedFarm,
        sectionId: this.selectedSection,
        groupByIssues: groupByIssuesId,
        issues: issues,
        callback: callback
      });
  }


}


