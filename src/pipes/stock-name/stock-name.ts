import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StockNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stockName',
})
export class StockNamePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == null || value=="") {
      return "暂存位";
    }else {
      return value;
    }
  }
}
