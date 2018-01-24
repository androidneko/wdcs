import { Component } from '@angular/core';

/**
 * Generated class for the PhotoItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
import {Input,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'photo-item',
  templateUrl: 'photo-item.html'
})
export class PhotoItemComponent {

  text: string;
  itemValue:any;
  inputSetValue:string = "";
  @Input() state="1";

  @Output() itemChange = new EventEmitter();
  @Input()
  get item(){
    return this.itemValue;
  }
  set item(val){
    this.itemValue = val;
    this.inputSetValue = val.picName;
    this.itemChange.emit(this.itemValue);
  }
  get  inputSet(){
    return this.inputSetValue;
  }
  set inputSet(val){
    this.inputSetValue = val;
    this.itemValue.picName = val;
    this.itemChange.emit(this.itemValue);
  }

  constructor() {
    console.log('Hello PhotoItemComponent Component');
    this.text = 'Hello World';
  }

}
