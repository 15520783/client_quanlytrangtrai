import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { issues, issuesPigs } from '../../common/entity';

import { Component } from '@angular/core';
import { DeployDataProvider } from '../../providers/deploy-data/deploy-data';
import { KEY } from '../../common/const';
import { Utils } from '../../common/utils';

@IonicPage()
@Component({
  selector: 'page-health-input',
  templateUrl: 'health-input.html',
})
export class HealthInputPage {

  public credentialsForm1: FormGroup;
  public credentialsForm2: FormGroup;
  public submitAttempt: boolean = false;
  public updateMode: boolean = false;

  public issuePig = new issuesPigs();
  public issuesList: Array<issues> = [
    new issues()
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public util: Utils,
    public deployData: DeployDataProvider,
    public platform: Platform
  ) {
    if (this.navParams.data.pig) {
      this.issuePig.pig = this.navParams.data.pig;
    }
    this.init();

    this.credentialsForm1 = this.formBuilder.group({
      id: this.issuePig.id,
      date: [this.issuePig.date, Validators.compose([Validators.required])],
      pigId: this.issuePig.pig.id,
      employee: this.issuePig.employee,
      description: [this.issuePig.description, Validators.compose([Validators.maxLength(1000)])],
      images: this.issuePig.images,
      status: this.issuePig.status
    });

    this.credentialsForm2 = this.formBuilder.group({});

    this.issuesList.forEach((e, idx) => {
      this.credentialsForm2
        .addControl(
          'issueId' + idx, this.formBuilder.control(e.id, Validators.compose([Validators.required])));
    });
  }

  ionViewDidLoad() {
  }

  public issues: Array<{ name: string, value: string }> = [];

  init() {
    this.util.getKey(KEY.EMPID).then((employeeId) => {
      this.issuePig.employee.setID(employeeId);
    })
    this.issues = this.deployData.get_issues_list_for_select();
  }

  add_issue() {
    let new_issue = new issues();
    this.issuesList.push(new_issue);
    this.credentialsForm2
      .addControl(
        'issueId' + (this.issuesList.length - 1), this.formBuilder.control(new_issue.id, Validators.compose([Validators.required])));
  }


  remove_issue(idx) {
    // this.issuesList.splice(idx, 1);
    // this.credentialsForm2.value['issueId' + idx].setValue('');
    this.credentialsForm2.removeControl('issueId' + idx);
  }

  changeIssue(e, idx) {
    console.log(this.credentialsForm2.value);
    let count = 0;
    let attrs = Object.keys(this.credentialsForm2.value);
    attrs.forEach((attr) => {
      if (this.credentialsForm2.value[attr] == e.valueId) {
        console.log(this.credentialsForm2.value[attr] == e.valueId);
        count++;
      }
    })

    if (count > 1) {
      this.util.showToastInform('Vấn đề đã được nhập.')
      this.credentialsForm2.controls['issueId' + idx].setValue('');
    }
  }

  onSubmit() {
    this.submitAttempt = true;
    console.log(this.credentialsForm1.value);
    if (this.credentialsForm1.valid && this.credentialsForm2.valid) {
      Object.keys(this.credentialsForm1.value).forEach((attr) => {
        this.issuePig[attr] = this.credentialsForm1.value[attr];
      });

      Object.keys(this.credentialsForm2.value).forEach((attr, idx) => {
        this.issuesList[idx].id = this.credentialsForm2.value[attr];
      })

      let issueListParams = this.issuesList.filter((issuePig) => {
        return issuePig.id ? true : false;
      })

      this.navParams.get('callback')({
        issuePig: this.issuePig,
        issueList: issueListParams
      })
    }
  }
}
