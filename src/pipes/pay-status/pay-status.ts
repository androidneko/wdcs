import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PayStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'payStatus',
})
export class PayStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value:any, ...args):any {
    // return value.toLowerCase();
     let payStatus = String(value);
    if (payStatus == "01") {
      return "已付款";
    }else{
      return "未付款";
    }

  }
}
