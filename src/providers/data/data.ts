import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as moment from 'jalali-moment';
import { AlertController, NavController } from 'ionic-angular';
import { PartListPage } from '../../pages/part-list/part-list';



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
    // localStorage.setItem(key, JSON.stringify(value));
    this.storage.set(key, JSON.stringify(value));
  }
  async addData(key, value) {
    let jsonResult = JSON.parse(await this.storage.get(key));
      if (jsonResult) jsonResult.push(value);
      let data = jsonResult ? jsonResult : [value];
      this.storage.set(key, JSON.stringify(data));

  }
  async loadDatas(key: string = 'datas') {
    this.updateMaxKm();
    return JSON.parse(await this.storage.get('datas'));
  }
  async updateMaxKm() {

    let datas = JSON.parse(await this.storage.get('data'));
    let newDatas = [];
    if (datas && datas.length) {
      datas.forEach(car => {
        let max;
        max = car.Fuels && car.Fuels.length ? Math.max(...car.Fuels.map(fuel => parseInt(fuel.kilometre))) : 0;
        if (car.parts && car.parts.length) {
          car.parts.forEach(part => {
            let partMax;
            partMax = part.list && part.list.length ? Math.max(...part.list.map(p => parseInt(p.kilometre))) : 0;
            if (partMax > max) max = partMax;
          });
        }
        car['maxKm'] = max;
        newDatas.push(car);
      });
      this.setData('datas', newDatas);
    }
  }
  async loadCar(carNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    return result[carNumber];
  }
  async addPart(index, item) {
    let result = JSON.parse(await this.storage.get('datas'));
    let parts = result[index].parts;
    if (parts) {
      parts.push(item);
    } else {
      parts = [item]
    }
    result[index].parts = parts;
    this.setData('datas', result);
  }
  loadFuel() {

  }
  async addFuel(carNumber, item) {
    let result = JSON.parse(await this.storage.get('datas'));

    let Fuels = result[carNumber].Fuels;
    if (Fuels) {
      Fuels.push(item);
    } else {
      Fuels = [item]
    }
    result[carNumber].Fuels = Fuels;
    // // console.log(Fuels, result)
    this.setData('datas', result)
    // localStorage.setItem('datas', JSON.stringify(result));
  }
  async editFuel(carNumber, fuelNumber, item) {
    let result = JSON.parse(await this.storage.get('datas'));
    let Fuels = result[carNumber].Fuels;
    Fuels[fuelNumber] = item;
    result[carNumber].Fuels = Fuels;
    this.setData('datas', result);
  }
  async getFuelList(carNumber) {
    let result = JSON.parse(await this.storage.get('datas'));

    let list = result[carNumber].Fuels ? result[carNumber].Fuels : [];
    // // console.log(list);
    return list;
  }
  async removeAllFuels(carNumber) {
    let result = JSON.parse(await this.storage.get('datas'));

    let Fuels = result[carNumber].Fuels;
    if (Fuels) {
      Fuels = [];
    }
    result[carNumber].Fuels = Fuels;
    // // console.log(Fuels, result)
    this.setData('datas', result);
  }
  async getMaxKm(carNumber) {
    let list = await this.getFuelList(carNumber);
    // // console.log(list.length);

    return list.length ? Math.max(...list.map(fuel => parseInt(fuel.kilometre))) : 0;
  }
  async deleteFuel(carNumber, fuelNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    let Fuels = result[carNumber].Fuels;
    Fuels.splice(fuelNumber, 1);
    result[carNumber].Fuels = Fuels;
    // // console.log(Fuels, result)
    this.setData('datas', result);
  }
  async favoriteFuel(carNumber, fuelNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    let Fuels = result[carNumber].Fuels;
    Fuels[fuelNumber]['favorite'] = 'true';
    result[carNumber].Fuels = Fuels;
    // // console.log(Fuels, result)
    this.setData('datas', result);
  }
  async carReport(carNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    let list = result[carNumber].Fuels ? result[carNumber].Fuels : [];
    let report = { result: [], label: [] };
    report['result'] = [{
      data: [], label: result[carNumber]['name']
    }];
    list.reduce((acc, cur) => {
      console.log(cur.litr * 100 / (cur.kilometre - acc.kilometre));

      report['result'][0].data.push(cur.litr * 100 / (cur.kilometre - acc.kilometre));
      report['label'].push(moment(cur.date, 'jYYYY/jMM/jDD').diff(new Date(), "days"));
      return cur;
    })
    console.log('report', report);
    return report;
  }
  async loadPart(carNumber, partNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    let part = result[carNumber].parts[partNumber];
    return part;
  }
  async addPartRenew(carNumber, partNumber, item) {
    let result = JSON.parse(await this.storage.get('datas'));
    let part = result[carNumber].parts[partNumber]['list'];

    if (part) {
      item.reminded = this.checkReminder(part, item.kilometre);
      part.push(item);
    } else {
      item.reminded = false;
      part = [item]
    }
    result[carNumber].parts[partNumber]['list'] = part;
    let res = this.checkReminder2(carNumber, result[carNumber].parts, item.kilometre);
    console.log(res);
    this.setData('datas', result)
    return res;
  }
  checkReminder2(carNumber, parts, km) {
    let alertList = [];
    // console.log('inside', parts, km);

    parts.forEach((part, i) => {
      part.list.filter(item => !item.reminded && item.reminder_type == 'km');
      let o = part.list.some(element => {
        if (parseInt(km) > parseInt(element.kilometre) + parseInt(element.reminder_period)) {
          alertList.push({ name: part.name, value: i });

          return true;
        }
      });
    });

    return alertList;
  }

  async disablePartAlert(carNumber, partNumber, i) {
    let result = JSON.parse(await this.storage.get('datas'));
    let parts = result[carNumber].parts;
    if (parts[partNumber].list[i]['reminded']) {

      parts[partNumber].list[i]['reminded'] = !parts[partNumber].list[i]['reminded'];
    } else {

      parts[partNumber].list[i]['reminded'] = true;
    }
    result[carNumber].parts = parts;
    console.log(parts, result);
    this.setData('datas', result);
  }
  checkReminder(part, km) {
    part.filter(item => !item.reminded && item.reminder_type == 'km');
    // console.log(part);

    let o = part.some(element => {
      // console.log(parseInt(km), parseInt(element.kilometre) + parseInt(element.reminder_period));
      if (parseInt(km) > parseInt(element.kilometre) + parseInt(element.reminder_period)) {
        // console.log('notificationnnnn');
        return true;
      }
    });
    // console.log('o', o);

    return false;
  }
  summary(carList, count: number = 20, month: number = null) {

  }

}
