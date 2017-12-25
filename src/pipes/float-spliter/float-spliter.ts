import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FloatSpliterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'floatSpliter',
})
export class FloatSpliterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string,index:string, ...args):string {
    if (typeof (value) == 'undefined' || null == value || "" == value || "null" == value || "NULL" == value){
      if ("0" == index){
        return "0";
      }else {
        return "00";
      }
    }

    let valueStr = String(value);
    let arr = valueStr.split(".");
    if ("0" == index){
      return arr[0];
    }else {
      if (arr.length < 2){
        return "00";
      }else {
        if (arr[1].length < 2){
          return arr[1]+"0";
        }
        return arr[1];
      }
    }
  }
}
