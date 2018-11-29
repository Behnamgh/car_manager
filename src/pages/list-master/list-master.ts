import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

// import { Item } from '../../models/item';
import { DataProvider } from '../../providers/providers';
import { FuelListPage } from '../fuel-list/fuel-list';
import { ReportsPage } from '../reports/reports';
import { PartListPage } from '../part-list/part-list';
import { TranslateService } from '@ngx-translate/core';
import { AddPartPage } from '../add-part/add-part';
import { ItemCreatePage } from '../item-create/item-create';

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
    this.dataProvider.loadDatas().then(result => {
      let datas = result;

      if (datas) {
        datas.forEach(car => {
          if (car.parts) {
            car.parts.forEach(part => {
              part.notification = 0;
              if (part.list) {
                part.list.filter(item => !item.reminded && item.reminder_type == 'km').forEach(item => {
                  if (item.kilometre < car.maxKm)++part.notification;
                });
              }
              console.log(part);
            });
          }
        });
      }
      this.datas = datas
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidEnter() {
    this.loadData();

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
    console.log(';did load');

    this.loadData();
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addCar() {
    console.log('addCar');

    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.dataProvider.addData('datas', item).then(()=> {
          
          this.loadData();
        });
      }
      // console.log(item);

    })
    addModal.present();
  }
  addPart(index) {
    console.log('addPart');

    let addModal = this.modalCtrl.create(AddPartPage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.dataProvider.addPart(index, item).then(() => {

          this.loadData();
        });
      }
      // console.log(item);

    })
    addModal.present();
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
    console.log('openPart');

    this.navCtrl.push(PartListPage, {
      car: car,
      part: part
    });

  }
  openFuelList(car) {
    console.log('openFuelList');

    this.navCtrl.push(FuelListPage, {
      car: car
    });
  }

  openReport(car) {
    console.log('openReport');

    this.navCtrl.push(ReportsPage, {
      car: car
    });
  }
  public changeLanguage(language) {
    this.translate.use(language);
  }
}
