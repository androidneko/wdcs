import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Generated class for the JlCounterInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-counter-input',
  templateUrl: 'jl-counter-input.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JlCounterInputComponent),
    multi: true
  }]
})
export class JlCounterInputComponent implements ControlValueAccessor{

  @Input() count:any=0;
  @Input() minCount = 0;
  @Input() maxCount:number = Number.MAX_VALUE;
  private propagateChange: any = {};
 
  constructor() {
    console.log('Hello JlRabtnComponent Component');
  }
  reduce(){
    console.log("减少");
    this.count--;
    if(this.count<this.minCount){
      this.count = this.minCount;
      this.propagateChange(this.count);//值传递
      return;
    }
    this.propagateChange(this.count);//值传递
   
    
  }
  add(){
    console.log("增加");
    this.count++;
    if(this.count>this.maxCount)
    {
      this.count = this.maxCount;
      this.propagateChange(this.count);//值传递
      return;
    }
    this.propagateChange(this.count);//值传递
  }
  onKey(event)
  {
    let val = this.count;
    var myreg = /^\d+$/;
    if(val==null|| val=="")
    {
      this.count = this.minCount;
      return;
    }
    if(!myreg.test(val))
    {

      var txt = val.replace(myreg,"").replace(".","");
      this.verifyNum(txt,event);
     
    }else{
      this.verifyNum(val,event);
    }
  }

  verifyNum(num,event)
  {
    var reg =  /^(0|[1-9][0-9]*)$/;
    if(!reg.test(num))
    {
      this.count = Number.parseInt(num);
    }else{
      if(Number.parseInt(num)>=this.maxCount)
      {
        this.count = this.maxCount;
      }else if(Number.parseInt(num)<this.minCount)
      {
        this.count = this.minCount;
      }else
      {
        this.count = Number.parseInt(num);
      }
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.count = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
   
  }
}
