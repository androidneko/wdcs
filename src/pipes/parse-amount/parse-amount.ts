import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ParseAmountPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'parseAmount',
})
export class ParseAmountPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  transform(value: any, ...args) {
    if (typeof (value) == 'undefined' || null == value){
      return "0.00";
    }
    let keep:number = value[1];
    let header:String = "0";
    let num:String = String(value[0]);

    if ("undefined" == num ||"null" == num ||"NULL" == num || "" == num || null == num){
      let padding:String = "";
      for (var i = 0; i < keep; i++){
        padding = padding + "0";
      }
      return header + "." + padding;
    }else {
      let arr:String[] = num.split(".");
      if (keep <= 0){
        return  arr[0];
      }else {
        let tail:String = arr[1] == null ? "" : arr[1];
        let len:number = tail == null? 0 : tail.length;
        if (len == keep){
          return num;
        }else if(len > keep) {
          tail = tail.substring(0,keep);
          return arr[0]+"."+tail;
        }else {
          let padding:String = "";
          for (var j = 0; j < keep - len; j++){
            padding = padding + "0";
          }
          return arr[0]+"."+tail+padding;
        }
      }
    }
  }
}
