import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/providers';
import { FuelCreatePage } from '../fuel-create/fuel-create';

/**
 * Generated class for the FuelListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fuel-list',
  templateUrl: 'fuel-list.html',
})
export class FuelListPage {
  carNumber: number;
  fuelList: any = [];
  mode: boolean = true;
  totalLiter: number;
  lastKm: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataProvider: DataProvider) {
    this.carNumber = navParams.get('car');
    // console.log(this.carNumber);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FuelListPage');
    this.loadFuelList();
  }
  addFuel() {
    let addFuel = this.modalCtrl.create(FuelCreatePage, { carNumber: this.carNumber });
    addFuel.onDidDismiss(item => {
      if (item) {
        this.dataProvider.addFuel(this.carNumber, item).then(() => this.loadFuelList());
      }
    })
    addFuel.present();
  }
  loadFuelList() {
    this.dataProvider.getFuelList(this.carNumber).then(result => {
      this.fuelList = result;

      if (this.fuelList.length) {
        this.lastKm = this.fuelList.reduce((prev, current) => {
          return (prev.kilometre > current.kilometre) ? prev : current;
        });

        if (this.fuelList.length > 1) this.totalLiter = this.fuelList.reduce((prev, current) => {
          return { litr: parseInt(prev.litr) + parseInt(current.litr) };
        });
        if (this.fuelList.length == 1) this.totalLiter = this.fuelList[0];

      } else {
        this.lastKm = 0;
        this.totalLiter = 0;
      }
    });
  }
  favorite(i) {
    this.dataProvider.favoriteFuel(this.carNumber, i).then(() => this.loadFuelList());
  }
  edit(i) {
    let addFuel = this.modalCtrl.create(FuelCreatePage, { carNumber: this.carNumber, data: this.fuelList[i] });
    addFuel.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.dataProvider.editFuel(this.carNumber, i, item).then(() => this.loadFuelList());
      }
    })
    addFuel.present();
  }
  delete(i) {
    this.dataProvider.deleteFuel(this.carNumber, i).then(() => this.loadFuelList());

  }
  reorderItems(indexes) {
    // console.log(indexes);
    let element = this.fuelList[indexes.from];
    this.fuelList.splice(indexes.from, 1);
    this.fuelList.splice(indexes.to, 0, element);
  }

}
