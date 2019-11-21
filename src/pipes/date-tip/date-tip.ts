import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DateTipPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateTip',
})
export class DateTipPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (!value){
      return '日期未知';
    }
    let date = new Date(value);
    let timestamp = date.getTime();
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;
    let year = day * 365;
    let now = new Date().getTime();
    let diffValue = now - timestamp;
    let result;
    if (diffValue < 0) {
        return;
    }
    let yearC = diffValue / year;
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC+"") + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC+"") + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC+"") + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC+"") + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC+"") + "小时前";
    } else if (minC >= 10) {
        result = "" + parseInt(minC+"") + "分钟前";
    } else
        result = "刚刚";
    return result;
  }
}
