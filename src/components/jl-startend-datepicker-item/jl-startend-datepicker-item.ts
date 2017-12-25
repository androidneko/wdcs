import { Component,Input,Output,EventEmitter} from '@angular/core';

/**
 * Generated class for the JlStartendDatepickerItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-startend-datepicker-item',
  templateUrl: 'jl-startend-datepicker-item.html'
})
export class JlStartendDatepickerItemComponent {

  createStartDateValue:string="";
  createEndDateValue:string="";
  @Output() createStartDateChange = new EventEmitter();
  @Output() createEndDateChange = new EventEmitter();
  @Input() format:string="YYYY-MM-DD";
  @Input()
  get createStartDate(){
    return this.createStartDateValue;
  }
  set createStartDate(val){
    this.createStartDateValue = val;
    this.createStartDateChange.emit(this.createStartDateValue);
  }
  @Input()
  get createEndDate(){
    return this.createEndDateValue;
  }
  set createEndDate(val){
    this.createEndDateValue = val;
    this.createEndDateChange.emit(this.createEndDateValue);
  }

  constructor() {
    console.log('Hello JlStartendDatepickerItemComponent Component');
   
  }

}
