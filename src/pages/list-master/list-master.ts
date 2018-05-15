import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

// import { Item } from '../../models/item';
import { DataProvider } from '../../providers/providers';
// import { FuelListPage } from '../fuel-list/fuel-list';
// import { ReportsPage } from '../reports/reports';
// import { PartListPage } from '../part-list/part-list';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  // currentItems: Item[];
  datas: any = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private translate: TranslateService, private dataProvider: DataProvider) {
    // this.currentItems = this.items.query();
    this.loadData();
    {
      let lang = localStorage.getItem('lang');
      if (!lang) {
        lang = 'en';
        localStorage.setItem('lang', lang);
      }
      translate.setDefaultLang(lang);
      translate.use(lang);
    }

  }
  loadData() {
    this.datas = this.dataProvider.loadDatas();
    console.log(this.datas);

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidEnter() {
    {
      let lang = localStorage.getItem('lang');
      if (!lang) {
        lang = 'en';
        localStorage.setItem('lang', lang);
      }
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
    }
    console.log(this.translate.getDefaultLang());
    
    this.translate.get('SEARCH_TITLE').subscribe((res: string) => {
      console.log(res);
      //=> 'hello world'
    });
    // console.log('enter');
  }
  ionViewDidLoad() {
    // console.log('check');

  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addCar() {
    // let addModal = this.modalCtrl.create('ItemCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.dataProvider.addData('datas', item);
    //     this.loadData();
    //   }
    //   // console.log(item);

    // })
    // addModal.present();
  }
  addPart(index) {
    // let addModal = this.modalCtrl.create('ItemCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.dataProvider.addPart(index, item);
    //     this.loadData();
    //   }
    //   // console.log(item);

    // })
    // addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    // this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openPart(car, part) {
    // this.navCtrl.push(PartListPage, {
    //   car: car,
    //   part: part
    // });

  }
  openFuelList(car) {
    // this.navCtrl.push(FuelListPage, {
    //   car: car
    // });
  }

  openReport(car) {
    // this.navCtrl.push(ReportsPage, {
    //   car: car
    // });
  }
  public changeLanguage(language) {
    this.translate.use(language);
  }
}
