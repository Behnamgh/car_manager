import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

/**
 * Generated class for the JalaliPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'jalaliPipe',
})
export class JalaliPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY/MM/DD');
    return MomentDate.locale('fa').format('jYYYY/jMM/jDD');
  }
}
