import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';
import { ListMasterPage } from '../pages/list-master/list-master';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { PipesModule } from '../pipes/pipes.module';
import { DataProvider, Settings } from '../providers/providers';

import { ChartsModule } from 'ng2-charts';


import { IonicStorageModule, Storage } from '@ionic/storage';
import { FuelListPage } from '../pages/fuel-list/fuel-list';
import { FuelCreatePage } from '../pages/fuel-create/fuel-create';
import { AddPartPage } from '../pages/add-part/add-part';
import { Camera } from '@ionic-native/camera';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { PartListPage } from '../pages/part-list/part-list';
import { PartRenewPage } from '../pages/part-renew/part-renew';
import { ReportsPage } from '../pages/reports/reports';
import { ReportFilterPage } from '../pages/report-filter/report-filter';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutorialPage,
    TabsPage,
    ListMasterPage,
    SearchPage,
    SettingsPage,
    FuelListPage,
    FuelCreatePage,
    AddPartPage,
    ItemCreatePage,
    PartListPage,
    PartRenewPage,
    ReportsPage,
    ReportFilterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TutorialPage,
    TabsPage,
    ListMasterPage,
    SearchPage,
    SettingsPage,
    FuelListPage,
    FuelCreatePage,
    AddPartPage,
    ItemCreatePage,
    PartListPage,
    PartRenewPage,
    ReportsPage,
    ReportFilterPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    PipesModule,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider]
})
export class AppModule { }
