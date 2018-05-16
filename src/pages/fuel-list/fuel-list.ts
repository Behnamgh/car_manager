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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataProvider: DataProvider) {
    this.carNumber = navParams.get('car');
    // console.log(this.carNumber);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FuelListPage');
    this.loadFuelList();
  }
  addFuel() {
    console.log(this.carNumber);
    let addFuel = this.modalCtrl.create(FuelCreatePage, { carNumber: this.carNumber });
    addFuel.onDidDismiss(item => {
      if (item) {
        // console.log(item.date);
        
        this.dataProvider.addFuel(this.carNumber, item);
        this.loadFuelList();
      }
      // console.log(item);

    })
    addFuel.present();
  }
  loadFuelList() {
    this.fuelList = this.dataProvider.getFuelList(this.carNumber);
  }
  favorite(i) {
    this.dataProvider.favoriteFuel(this.carNumber, i);
    this.loadFuelList();
  }

  delete(i) {
    this.dataProvider.deleteFuel(this.carNumber, i);
    this.loadFuelList();
  }
  reorderItems(indexes) {
    // console.log(indexes);
    let element = this.fuelList[indexes.from];
    this.fuelList.splice(indexes.from, 1);
    this.fuelList.splice(indexes.to, 0, element);
  }

}
