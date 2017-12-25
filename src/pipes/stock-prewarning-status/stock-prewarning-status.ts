import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StockPrewarningStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stockPrewarningStatus',
})
export class StockPrewarningStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    let max:number = value[0];
    let min:number = value[1];
    let available:number = value[2];
    if (available > max){
      return "积压";
    }
    if (available < min){
      return "紧张";
    }
    return "正常";
  }
}
