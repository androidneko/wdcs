import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProductStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'productStatus',
})
export class ProductStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let payStatus = String(value);
    if (payStatus == "1") {
      return "已上架";
    }
    else {
      return "未上架";
    }
  }
}
