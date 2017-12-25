import { Component ,Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the JlDatePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-date-picker',
  templateUrl: 'jl-date-picker.html'
})
export class JlDatePickerComponent {

  constructor() {
    console.log('Hello JlDatePickerComponent Component');
  }

  @Input() datepicker:any;
  @Input() format:string="YYYY-MM-DD";
  
  //startDate双向绑定定义开始
  @Output() startDateChange : EventEmitter<any> = new EventEmitter();
  @Input()
  get startDate(){
    return this.datepicker.start;
  }
  set startDate(val){
    this.datepicker.start = val;
    this.startDateChange.emit(this.datepicker.start);
  }
  //startDate双向绑定定义结束

  //endDate双向绑定定义开始
  @Output() endDateChange : EventEmitter<any> = new EventEmitter();
  @Input()
  get endDate(){
    return this.datepicker.end;
  }
  set endDate(val){
    this.datepicker.end = val;
    this.endDateChange.emit(this.datepicker.end);
  }
  //endDate双向绑定定义开始

}
