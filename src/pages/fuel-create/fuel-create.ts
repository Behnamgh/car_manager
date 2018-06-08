import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import * as moment from 'jalali-moment';
/**
 * Generated class for the FuelCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fuel-create',
  templateUrl: 'fuel-create.html',
})
export class FuelCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  maxDate: string;
  yearVal = [moment().jYear(), moment().jYear() - 1];
  carData: object;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public dataProvider: DataProvider) {
    let carNumber = navParams.get('carNumber');
    let data = navParams.get('data');
    this.carData = this.dataProvider.loadCar(carNumber);
    
    let MIN = dataProvider.getMaxKm(carNumber) + 1;
    // console.log(MIN);
    
    if(data){
      console.log(data);
      this.form = formBuilder.group({
        name: [data.name],
        location: [data.location],
        date: [data.date, Validators.required],
        litr: [data.litr, [Validators.min(0), Validators.required]],
        kilometre: [data.kilometre, [Validators.required]],
      });
      
    }else{
      
      this.form = formBuilder.group({
        name: [''],
        location: [''],
        date: [moment().format('jYYYY-jMM-jDDTHH:MM:SS'), Validators.required],
        litr: ['', [Validators.min(0), Validators.required]],
        kilometre: [, [Validators.min(MIN), Validators.required]],
      });
    }

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FuelCreatePage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; };
    this.viewCtrl.dismiss(this.form.value);
  }
}
