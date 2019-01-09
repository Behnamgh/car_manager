import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

/**
 * Generated class for the MiladiPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'miladiPipe',
})
export class MiladiPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'jYYYY/jMM/jDD');
    return MomentDate.locale('en').format('YYYY/MM/DD');
  }
}
