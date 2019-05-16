import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pig } from '../../common/entity';
import { PigsProvider } from '../../providers/pigs/pigs';

@IonicPage()
@Component({
  selector: 'page-pig-review-index',
  templateUrl: 'pig-review-index.html',
})
export class PigReviewIndexPage {

  @Input() public pig: pig;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pigProvider: PigsProvider
  ) {
    if (this.navParams.data) {
      this.pig = this.navParams.data;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PigReviewIndexPage');
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.pigProvider.ViewIndexChart(this.pig, document.getElementById('chartReview'));    
  }
}
