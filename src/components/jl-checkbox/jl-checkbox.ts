import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Generated class for the JlCheckboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-checkbox',
  templateUrl: 'jl-checkbox.html'
})
export class JlCheckboxComponent implements ControlValueAccessor{

  
  @Input() spaceClass:any;
  @Input() multiselectType:boolean=false;//是否是多选
  @Output()  selectedObj:EventEmitter<any> = new EventEmitter<any>() ;

  @Input() dataSrc:Array<any>=[];
  dataArray:Array<any>=[];
  private propagateChange: any = {};
  constructor() {
    console.log('Hello JlCheckboxComponent Component');
  }

  writeValue(obj: any): void {
      this.selectedObj = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  itemClick(item)
  {
    if(this.multiselectType)
    {
      //多选
      this.dataSrc.forEach(element => {
        if(element.value == item.value)
        {
          if(item.checked)
          {  
            element.checked = false;
            item.checked = false;
          }else
          {
            element.checked = true;
            item.checked = true;
          }
          this.addData(item);
        }
      });
    }else
    {
      this.dataSrc.forEach(element => {
        if(element.value == item.value)
        {
          element.checked = true;
          item.checked = true;
        }else{
          element.checked = false;
        }
      });
      this.selectedObj.emit(item);
    }
   
  }


  addData(item)
  {
    var index = this.dataArray.indexOf(item.value, 0);
    if(index > -1)
    {
      if(!item.checked)
      { 
         this.dataArray.splice(index, 1);
        }
    
    }else{
      if(item.checked)
      {
        this.dataArray.push(item);
      }
    }
  }
}
