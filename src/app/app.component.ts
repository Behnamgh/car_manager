import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';


import { HomePage } from '../pages/home/home';
import { FirstRunPage } from '../pages/pages';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;

  constructor(private translate: TranslateService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.rootPage = localStorage.getItem('skip') == 'true' ? TabsPage : TutorialPage;
    storage.set('data', JSON.stringify([
      {
          "profilePic": "",
          "name": "206 Black",
          "about": "Behnam",
          "Fuels": [
              {
                  "name": "eyd ",
                  "location": "velenjak",
                  "date": "1397-01-01T22:04:75Z",
                  "litr": "50",
                  "kilometre": "120111",
                  "favorite": "true"
              },
              {
                  "name": "sizdah be dar",
                  "location": "jordan",
                  "date": "1397-01-13T22:04:69Z",
                  "litr": "33",
                  "kilometre": "121250"
              },
              {
                  "name": "akhare farvardin",
                  "location": "pido",
                  "date": "1397-01-31T22:04:79Z",
                  "litr": "22",
                  "kilometre": "121350"
              },
              {
                  "name": "ghable safar",
                  "location": "karaj",
                  "date": "1397-02-04T23:05:95Z",
                  "litr": "40",
                  "kilometre": "121650"
              },
              {
                  "name": "bade safar",
                  "location": "tehran",
                  "date": "1397-02-14T23:05:52Z",
                  "litr": "33",
                  "kilometre": "122000"
              }
          ],
          "parts": [
              {
                  "profilePic": "",
                  "name": "roghan",
                  "about": "time",
                  "list": [
                      {
                          "name": "modiriat",
                          "location": "unja ke gham nis",
                          "date": "1397-02-22T20:05:39",
                          "kilometre": "100",
                          "reminder_type": "km",
                          "reminder_period": "100"
                      },
                      {
                          "name": "zendan",
                          "location": "se rag",
                          "date": "1397-02-22T20:05:30",
                          "kilometre": "1200",
                          "reminder_type": "DATE",
                          "reminder_period": "9000000"
                      },
                      {
                          "name": "test",
                          "location": "oonja",
                          "date": "1397-02-22T21:05:57",
                          "kilometre": "150",
                          "reminder_type": "km",
                          "reminder_period": "100",
                          "reminded": false
                      },
                      {
                          "name": "a",
                          "location": "a",
                          "date": "1397-02-22T21:05:20",
                          "kilometre": "200",
                          "reminder_type": "km",
                          "reminder_period": "100",
                          "reminded": false
                      },
                      {
                          "name": "w",
                          "location": "e",
                          "date": "1397-02-22T21:05:38",
                          "kilometre": "250",
                          "reminder_type": "km",
                          "reminder_period": "100",
                          "reminded": false
                      },
                      {
                          "name": "asd",
                          "location": "asdasd",
                          "date": "1397-02-22T21:05:84",
                          "kilometre": "300",
                          "reminder_type": "km",
                          "reminder_period": "100",
                          "reminded": false
                      }
                  ]
              }
          ]
      },
      {
          "profilePic": "",
          "name": "Besturn White",
          "about": "Yegane"
      },
      {
          "profilePic": "",
          "name": "Samand White",
          "about": "baba"
      }
  ]));
    // localStorage.setItem('datas','[{"profilePic":"","name":"206 Black","about":"Behnam","Fuels":[{"name":"eyd ","location":"velenjak","date":"1397-01-01T22:04:75Z","litr":"50","kilometre":"120111","favorite":"true"},{"name":"sizdah be dar","location":"jordan","date":"1397-01-13T22:04:69Z","litr":"33","kilometre":"121250"},{"name":"akhare farvardin","location":"pido","date":"1397-01-31T22:04:79Z","litr":"22","kilometre":"121350"},{"name":"ghable safar","location":"karaj","date":"1397-02-04T23:05:95Z","litr":"40","kilometre":"121650"},{"name":"bade safar","location":"tehran","date":"1397-02-14T23:05:52Z","litr":"33","kilometre":"122000"}],"parts":[{"profilePic":"","name":"roghan","about":"time","list":[{"name":"modiriat","location":"unja ke gham nis","date":"1397-02-22T20:05:39","kilometre":"100","reminder_type":"km","reminder_period":"100"},{"name":"zendan","location":"se rag","date":"1397-02-22T20:05:30","kilometre":"1200","reminder_type":"DATE","reminder_period":"9000000"},{"name":"test","location":"oonja","date":"1397-02-22T21:05:57","kilometre":"150","reminder_type":"km","reminder_period":"100","reminded":false},{"name":"a","location":"a","date":"1397-02-22T21:05:20","kilometre":"200","reminder_type":"km","reminder_period":"100","reminded":false},{"name":"w","location":"e","date":"1397-02-22T21:05:38","kilometre":"250","reminder_type":"km","reminder_period":"100","reminded":false},{"name":"asd","location":"asdasd","date":"1397-02-22T21:05:84","kilometre":"300","reminder_type":"km","reminder_period":"100","reminded":false}]}]},{"profilePic":"","name":"Besturn White","about":"Yegane"},{"profilePic":"","name":"Samand White","about":"baba"}]');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();

  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');


    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

  }
}

