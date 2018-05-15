import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as moment from 'jalali-moment';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {

  }
  setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    // this.storage.set(key, value);
  }
  addData(key, value) {

    let result = JSON.parse(localStorage.getItem(key));
    if (result) result.push(value);
    let data = result ? result : [value];
    localStorage.setItem(key, JSON.stringify(data));
  }
  loadDatas(key: string = 'datas') {
    return JSON.parse(localStorage.getItem(key));
  }
  loadCar(carNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    return result[carNumber];
  }
  addPart(index, item) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let parts = result[index].parts;
    if (parts) {
      parts.push(item);
    } else {
      parts = [item]
    }
    result[index].parts = parts;
    localStorage.setItem('datas', JSON.stringify(result));
  }
  loadFuel() {

  }
  addFuel(carNumber, item) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let Fuels = result[carNumber].Fuels;
    if (Fuels) {
      Fuels.push(item);
    } else {
      Fuels = [item]
    }
    result[carNumber].Fuels = Fuels;
    // console.log(Fuels, result)
    localStorage.setItem('datas', JSON.stringify(result));
  }
  getFuelList(carNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let list = result[carNumber].Fuels ? result[carNumber].Fuels : [];
    // console.log(list);
    return list;
  }
  removeAllFuels(carNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let Fuels = result[carNumber].Fuels;
    if (Fuels) {
      Fuels = [];
    }
    result[carNumber].Fuels = Fuels;
    // console.log(Fuels, result)
    localStorage.setItem('datas', JSON.stringify(result));
  }
  getMaxKm(carNumber) {
    let list = this.getFuelList(carNumber);
    // console.log(list.length);

    return list.length ? Math.max(...list.map(fuel => parseInt(fuel.kilometre))) : 0;
  }
  deleteFuel(carNumber, fuelNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let Fuels = result[carNumber].Fuels;
    Fuels.splice(fuelNumber, 1);
    result[carNumber].Fuels = Fuels;
    // console.log(Fuels, result)
    localStorage.setItem('datas', JSON.stringify(result));
  }
  favoriteFuel(carNumber, fuelNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let Fuels = result[carNumber].Fuels;
    Fuels[fuelNumber]['favorite'] = 'true';
    result[carNumber].Fuels = Fuels;
    // console.log(Fuels, result)
    localStorage.setItem('datas', JSON.stringify(result));
  }
  carReport(carNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let list = result[carNumber].Fuels ? result[carNumber].Fuels : [];
    let report = [];
    report['result'] = [{ data: list.map(item => parseInt(item.kilometre)), label: result[carNumber]['name'] }];
    report['label'] = list.map(item => moment(item.date, 'jYYYY/jMM/jDD').diff(new Date(), "days"));
    // console.log(list);
    return report;
  }
  loadPart(carNumber, partNumber) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let part = result[carNumber].parts[partNumber];
    return part;
  }
  addPartRenew(carNumber, partNumber, item) {
    let result = JSON.parse(localStorage.getItem('datas'));
    let part = result[carNumber].parts[partNumber]['list'];
    item.reminded = this.checkReminder(part, item.kilometre);

    if (part) {
      part.push(item);
    } else {
      part = [item]
    }
    result[carNumber].parts[partNumber]['list'] = part;
    localStorage.setItem('datas', JSON.stringify(result));
  }
  checkReminder(part, km) {
    part.filter(item => !item.reminded && item.reminder_type == 'km');
    console.log(part);

    let o = part.some(element => {
      console.log(parseInt(km), parseInt(element.kilometre) + parseInt(element.reminder_period));
      if (parseInt(km) < parseInt(element.kilometre) + parseInt(element.reminder_period)) {
        console.log('notificationnnnn');
        return true;
      }
    });
    console.log('o', o);

    return false;
  }
  summary(carList, count: number = 20, month: number = null) {

  }

}
