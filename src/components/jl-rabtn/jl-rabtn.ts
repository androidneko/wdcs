import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the JlRabtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-rabtn',
  templateUrl: 'jl-rabtn.html'
})
export class JlRabtnComponent {

  text: string;
  @Input() count:any=0;
  @Input() minCount = 0;
  @Input() maxCount:number = 999999999999;
  @Output() valuechange: EventEmitter<any> = new EventEmitter();
  @Output() addCount:EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello JlRabtnComponent Component');
    this.text = 'Hello World';
  }
  reduce(event){
   
    console.log("减少");
    this.count--;
    if(this.count<this.minCount){
      this.count = this.minCount;
      return;
    }
  
    this.addCount.emit(-1);
    this.valuechange.emit(this.count);
  }
  add(event){
    console.log("增加");
    this.count++;
    if(this.count>this.maxCount)
    {
      this.count = this.maxCount;
      return;
    }
    this.addCount.emit(1);
    this.valuechange.emit(this.count);
   
  }
  blur(){
    console.log("change");
    // this.valuechange.emit(this.count);
    if (this.count==""||this.count<this.minCount) {
      this.count = this.minCount;
      this.valuechange.emit(this.count)
    }
   
  }
  onKey(event)
  {
    let val = event.target.value;
    var myreg = /[^0-9-]+/;
    if(val==null|| val=="")
    {
      // this.count = this.minCount;
      
      this.valuechange.emit(this.count)
      return;
    }
    if(myreg.test(val))
    {
      var txt = val.replace(myreg,"");
      event.target.value=txt;
    }else
    this.valuechange.emit(this.count);
  }


}
