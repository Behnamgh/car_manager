import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ListMasterPage } from '../list-master/list-master';
import { SearchPage } from '../search/search';
import { SettingsPage } from '../settings/settings';

// import { Tab1Root, Tab2Root, Tab3Root } from '../pages';

// import { DataProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ListMasterPage;
  tab2Root: any = SearchPage;
  tab3Root: any = SettingsPage;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });
  }
}
