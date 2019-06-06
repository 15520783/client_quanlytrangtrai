import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { pig, section, house, issuesPigs, issues, usedMedicine } from '../../common/entity';
import { FormControl } from '@angular/forms';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { VARIABLE, MESSAGE, CONFIG } from '../../common/const';
import { Utils } from '../../common/utils';
import { PigsProvider } from '../../providers/pigs/pigs';
import { FilterProvider } from '../../providers/filter/filter';
import { SettingsProvider } from '../../providers/settings/settings';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { UsedMedicineInputPage } from '../used-medicine-input/used-medicine-input';


@IonicPage()
@Component({
  selector: 'page-issue-pig-list',
  templateUrl: 'issue-pig-list.html',
})
export class IssuePigListPage {


  @Input() sectionTypeId: string = '';
  public issue_groupBySection: any;

  public issues: Array<issuesPigs> = [];

  public breed: any = {};
  public gender: any = {};
  public employees: any = {};
  public houses: any = {};
  public issueObjectKey: any = {};

  public sections: Array<any> = [];



  public farms: any = [];
  public selectedFarm: any;
  public selectedSection: any;

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

  public placeholderSearch: string = 'Tìm kiếm ghi nhận lên giống'
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
    public pigProvider: PigsProvider,
    public filterProvider: FilterProvider,
    public settingProvider: SettingsProvider,
    public activitiesProvider: ActivitiesProvider,
    public platform: Platform
  ) {

    this.breed = this.deployData.get_object_list_key_of_breeds();
    this.houses = this.deployData.get_object_list_key_of_house();

    VARIABLE.gender.forEach(gender => {
      this.gender[gender.value] = gender;
    })

    if (this.navParams.data.sectionType) {
      this.sectionTypeId = this.navParams.data.sectionType.id;
    }

    this.getAllIssuePigs().then((issues) => {
      this.init();
    });



  }

  init() {
    this.issueObjectKey = this.deployData.get_object_list_key_of_issues();
    this.employees = this.deployData.get_object_list_key_of_employees();
    this.farms = this.deployData.get_farm_list_for_select();
    this.selectedFarm = this.farms[0].value;
    this.sections = this.deployData.get_sections_of_farm(this.selectedFarm);
    this.sections.forEach((section: any) => {
      section.value = section.id
    })

    if (this.sections.length) {
      this.selectedSection = this.sections[0].value;
      this.sections[0].selected = true;
      this.issues = this.issue_groupBySection.get(this.selectedSection) ? this.issue_groupBySection.get(this.selectedSection) : [];
      this.setFilteredItems();
    }
  }

  changeFarm(res) {
    this.selectedFarm = res.valueId;
    this.sections = this.deployData.get_sections_of_farm(res.valueId);
    this.sections.forEach((section: any) => {
      section.value = section.id
      section.selected = false;
    })
    if (this.sections.length) {
      this.selectedSection = this.sections[0].value;
      this.sections[0].selected = true;
      this.issues = this.issue_groupBySection.get(this.selectedSection) ? this.issue_groupBySection.get(this.selectedSection) : [];
      this.setFilteredItems();
    } else {
      this.sections = [];
    }
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


  getIssuePig(farmId, sectionId) {
    this.util.openBackDrop();
    return this.activitiesProvider.getIssuePigOfSection(farmId, sectionId)
      .then((issues) => {
        if (issues) {
          this.issues = issues;
        }
        this.util.closeBackDrop();
        return issues;
      })
      .catch((err) => {
        this.util.closeBackDrop();
        console.log(err);
      })
  }


  getAllIssuePigs() {
    this.util.openBackDrop();
    return this.activitiesProvider.getIssuePigOfFarms()
      .then((issues) => {
        if (issues) {
          this.issue_groupBySection = this.util.groupBy(issues, issue => issue.pig.house.section.id);
        }
        this.util.closeBackDrop();
        return issues;
      })
      .catch((err) => {
        this.util.closeBackDrop();
        console.log(err);
      })
  }


  selectSection(section) {
    this.sections.forEach((e) => {
      e.selected = false;
    })
    section.selected = true;
    this.selectedSection = section.id;
    this.issues = this.issue_groupBySection.get(this.selectedSection) ? this.issue_groupBySection.get(this.selectedSection) : [];
    this.setFilteredItems();

  }


  resolveIssuePigs() {
    let issues = [];
    let groupByIssuesId = this.util.groupBy(this.issues, issuePig => issuePig.issue.id);

    Array.from(groupByIssuesId.keys()).map(String).forEach((e) => {
      issues.push(this.issueObjectKey[e]);
    });

    let callback = (data: Array<usedMedicine>) => {
      if(data){
        this.getAllIssuePigs()
        .then((issuesPigs)=>{
          this.issues = this.issue_groupBySection.get(this.selectedSection) ? this.issue_groupBySection.get(this.selectedSection) : [];
          this.setFilteredItems();
        })
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
