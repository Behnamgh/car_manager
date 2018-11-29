import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import * as moment from 'jalali-moment';
import { PartListPage } from '../part-list/part-list';

/**
 * Generated class for the PartRenewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-part-renew',
  templateUrl: 'part-renew.html',
})
export class PartRenewPage {

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  yearVal = [moment().jYear(), moment().jYear() - 1];
  carData: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      name: [''],
      location: [''],
      date: [moment().format('jYYYY-jMM-jDDTHH:MM:SS'), Validators.required],
      kilometre: [, [Validators.required]],
      reminder_type: ['km', [Validators.required]],
      reminder_period: ['50', [Validators.required]],
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartRenewPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; };
    this.viewCtrl.dismiss(this.form.value);
  }

  openPart(car, part) {
    this.navCtrl.push(PartListPage, {
      car: car,
      part: part
    });

  }

}
