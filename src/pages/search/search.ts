import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { Item } from '../../models/item';
import { DataProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
    this.data = dataProvider.loadDatas();

  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    console.log(this.data);
    
    this.currentItems = this.data ? this.data.filter(i => i.name.includes(val)):[];
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item) {
    // this.navCtrl.push('ItemDetailPage', {
    //   item: item
    // });
  }

}
