import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TydatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tydate',
})
export class TydatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, format:string,...args):any {
    let Dates = new Date( value );
    let year: number = Dates.getFullYear();
    let month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    let day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    let h = Dates.getHours();
    let m = Dates.getMinutes();
    let s = Dates.getHours();
    return format.replace("yyyy",this.pad(year,4)+"").replace("MM",this.pad(month,2)+"").replace("dd",this.pad(day,2)+"").replace("HH",this.pad(h,2)+"").replace("mm",this.pad(m,2)+"").replace("ss",this.pad(s,2)+"");
  }
  pad(num, n) {
    let  y='00000000000000000000000000000'+num; //爱几个0就几个，自己够用就行
    return y.substr(y.length-n);
 }
}
