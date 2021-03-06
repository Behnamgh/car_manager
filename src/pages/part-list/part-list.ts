import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PartRenewPage } from '../part-renew/part-renew';
import { Part } from '../../models/part.model';

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
  partData: Part;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public modalCtrl: ModalController, private data: DataProvider) {
    this.carNumber = navParams.get('car');
    this.partNumber = navParams.get('part');
    this.loadPartList();
  }

  ionViewDidLoad() {
  }
  addPartRenew() {
    let addPartRenew = this.modalCtrl.create(PartRenewPage);
    addPartRenew.onDidDismiss(item => {
      if (item) {
        this.data.addPartRenew(this.carNumber, this.partNumber, item).then(result => {
          let alertList = result;
          if (alertList.length) {
            let alert = this.alertCtrl.create();
            alert.setTitle('reminder');
            alertList.forEach(element => {

              alert.addInput({
                type: 'radio',
                label: element.name,
                value: element.value,
                checked: false
              });
            });

            alert.addButton('Cancel');
            alert.addButton({
              text: 'Ok',
              handler: (data: any) => {
                console.log('Radio data:', data);
                this.openPart(this.carNumber, data);
              }
            });

            alert.present();
          }

          this.loadPartList();
        });


      }
    })
    addPartRenew.present();
  }
  loadPartList() {
    this.data.loadPart(this.carNumber, this.partNumber).then(result => {
      this.partData = result
    });
  }
  disabled(i) {
    this.data.disablePartAlert(this.carNumber, this.partNumber, i).then(() => this.loadPartList());


  }
  delete(i) {
    console.log(i, 'NOT IMPLEMENTED');
  }
  openPart(car, part) {
    this.navCtrl.push(PartListPage, {
      car: car,
      part: part
    });

  }
}
