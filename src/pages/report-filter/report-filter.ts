import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ReportFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-report-filter',
  templateUrl: 'report-filter.html',
})
export class ReportFilterPage {
  dateAgo: any = {
    upper: 0,
    lower: -30
  }
  chart = 'line';
  count = 20;

  constructor(public viewCtrl: ViewController) { }

  close() {
  }
  applyFilter(){
    console.log('apply filter');
    this.viewCtrl.dismiss({chart:this.chart?'bar':'line',count:this.count,dateAgo:this.dateAgo});
    
  }

}
