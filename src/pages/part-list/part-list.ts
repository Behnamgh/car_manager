import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PartRenewPage } from '../part-renew/part-renew';

/**
 * Generated class for the PartListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-part-list',
  templateUrl: 'part-list.html',
})
export class PartListPage {
  carNumber: number;
  partNumber: number;
  partData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private data: DataProvider) {
    this.carNumber = navParams.get('car');
    this.partNumber = navParams.get('part');
    // console.log(this.carNumber,this.partNumber  );
    this.partData = this.data.loadPart(this.carNumber, this.partNumber);

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PartListPage');
  }
  addPartRenew() {
    // console.log(this.carNumber);
    let addPartRenew = this.modalCtrl.create(PartRenewPage);
    addPartRenew.onDidDismiss(item => {
      if (item) {
        this.data.addPartRenew(this.carNumber, this.partNumber, item);
        // this.loadFuelList();
        console.log(item);
      }

    })
    addPartRenew.present();
  }
}
