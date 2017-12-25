import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StockStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args):any {
    let payStatus = String(value);
    if (payStatus == "01") {
      return "已入库";
    }else if(payStatus=="02"){
      return "部分入库"
    }
    else{
      return "未入库";
    }

  }
}
