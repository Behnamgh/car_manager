import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Settings, DataProvider } from '../../providers/providers';

import { PopoverController } from 'ionic-angular';
import { ReportFilterPage } from '../report-filter/report-filter';


/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  usageData: Array<any> = [];
  usageLabels: Array<any> = [];
  carNumber: number;
  lineChartOptions: any = {
    responsive: true,
    fill: true
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';
  constructor(public navCtrl: NavController, public navParams: NavParams, settings: Settings, public dataProvider: DataProvider, public popoverCtrl: PopoverController) {
    this.carNumber = navParams.get('car');

    settings.getValue('chart').then(res => {
      this.lineChartType = res ? res : 'line';
    });
    this.usageData = this.dataProvider.carReport(this.carNumber)['result'];
    // this.usageData = [{
    //   label: 'Average User',
    //   data: [
    //     [{ x: 0, y: 10 }, { x: 10, y: 3 }],
    //     [{ x: 0, y: 2 }, { x: 5, y: 7 }]
    //   ]
    // }];
    // this.usageLabels = [-3,-2,-1];
    this.usageLabels = this.dataProvider.carReport(0)['label'];
    // console.log(this.usageData);

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReportsPage');

  }


  randomize() {
    this.lineChartType = this.lineChartType == 'line' ? 'bar' : 'line';
  }

  // events
  chartClicked(e: any) {
    // console.log(e);
  }

  chartHovered(e: any) {
    // console.log(e);
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ReportFilterPage);
    popover.present({
      ev: myEvent
    });
  }
}
