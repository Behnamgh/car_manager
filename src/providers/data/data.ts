import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as moment from 'jalali-moment';
import { AlertController, NavController } from 'ionic-angular';
import { PartListPage } from '../../pages/part-list/part-list';
import { Car } from '../../models/car.model';
import { PartChange } from '../../models/partChange.model';
import { Part } from '../../models/part.model';
import { Fuel } from '../../models/fuel.model';



/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {

  }
  setData(key, value: Car[]) {
    // localStorage.setItem(key, JSON.stringify(value));
    this.storage.set(key, JSON.stringify(value));
  }
  async addData(key, value: Car): Promise<void> {
    let jsonResult = JSON.parse(await this.storage.get(key));
    if (jsonResult) jsonResult.push(value);
    let data = jsonResult ? jsonResult : [value];
    this.storage.set(key, JSON.stringify(data));

  }
  async loadDatas(key: string = 'datas'): Promise<Car[]> {
    this.updateMaxKm();
    return JSON.parse(await this.storage.get('datas'));
  }
  async updateMaxKm(): Promise<void> {

    let datas = JSON.parse(await this.storage.get('data'));
    let newDatas = [];
    if (datas && datas.length) {
      datas.forEach(car => {
        let max;
        max = car.fuels && car.fuels.length ? Math.max(...car.fuels.map(fuel => parseInt(fuel.kilometre))) : 0;
        if (car.parts && car.parts.length) {
          car.parts.forEach(part => {
            let partMax;
            partMax = part.list && part.list.length ? Math.max(...part.list.map(p => parseInt(p.kilometre))) : 0;
            if (partMax > max) max = partMax;
          });
        }
        car.maxKm = max;
        newDatas.push(car);
      });
      this.setData('datas', newDatas);
    }
  }
  async loadCar(carNumber: number): Promise<Car> {
    let result = JSON.parse(await this.storage.get('datas'));
    return result[carNumber];
  }
  async addPart(index, item: Part): Promise<void> {
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
  async addFuel(carNumber: number, item: Fuel): Promise<void> {
    let result = JSON.parse(await this.storage.get('datas'));

    let fuels = result[carNumber].fuels;
    if (fuels) {
      fuels.push(item);
    } else {
      fuels = [item]
    }
    result[carNumber].fuels = fuels;
    // // console.log(fuels, result)
    this.setData('datas', result)
    // localStorage.setItem('datas', JSON.stringify(result));
  }
  async editFuel(carNumber: number, fuelNumber: number, item: Fuel): Promise<void> {
    let result = JSON.parse(await this.storage.get('datas'));
    let fuels = result[carNumber].fuels;
    fuels[fuelNumber] = item;
    result[carNumber].fuels = fuels;
    this.setData('datas', result);
  }
  async getFuelList(carNumber: number): Promise<Fuel[]> {
    let result = JSON.parse(await this.storage.get('datas'));

    let list = result[carNumber].fuels ? result[carNumber].fuels : [];
    // // console.log(list);
    return list;
  }
  async removeAllfuels(carNumber): Promise<void> {
    let result = JSON.parse(await this.storage.get('datas'));

    let fuels = result[carNumber].fuels;
    if (fuels) {
      fuels = [];
    }
    result[carNumber].fuels = fuels;
    // // console.log(fuels, result)
    this.setData('datas', result);
  }
  async getMaxKm(carNumber): Promise<number> {
    let list = await this.getFuelList(carNumber);
    return list.length ? Math.max(...list.map(fuel => fuel.kilometre)) : 0;
  }
  async deleteFuel(carNumber, fuelNumber): Promise<void> {
    let result = JSON.parse(await this.storage.get('datas'));
    let fuels = result[carNumber].fuels;
    fuels.splice(fuelNumber, 1);
    result[carNumber].fuels = fuels;
    // // console.log(fuels, result)
    this.setData('datas', result);
  }
  async favoriteFuel(carNumber, fuelNumber): Promise<void> {
    let result = JSON.parse(await this.storage.get('datas'));
    let fuels = result[carNumber].fuels;
    fuels[fuelNumber]['favorite'] = 'true';
    result[carNumber].fuels = fuels;
    // // console.log(fuels, result)
    this.setData('datas', result);
  }
  async carReport(carNumber) {
    let result = JSON.parse(await this.storage.get('datas'));
    let list = result[carNumber].fuels ? result[carNumber].fuels : [];
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
  async loadPart(carNumber, partNumber): Promise<Part> {
    let result = JSON.parse(await this.storage.get('datas'));
    let part = result[carNumber].parts[partNumber];
    return part;
  }
  async addPartRenew(carNumber: number, partNumber: number, item: PartChange): Promise<any> {
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
  checkReminder2(carNumber, parts, km): Array<any> {
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

  async disablePartAlert(carNumber, partNumber, i): Promise<void> {
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
  checkReminder(part, km): boolean {
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
