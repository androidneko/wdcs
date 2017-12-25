import { Component ,ViewChild} from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the BusinessItemEcharsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'business-item-echars',
  templateUrl: 'business-item-echars.html'
})
export class BusinessItemEcharsComponent {
  @ViewChild(Slides) slides: Slides;
  charsArray:Array<any>=[{title:"本月应付款",detail:"26681.00",isFirst:true},{title:"本月应收款",detail:"26681.00"},{title:"本月销售收入（元）",detail:"26681.00"}];
  
  constructor() {

    console.log('Hello BusinessItemEcharsComponent Component');
  }
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    let kk = this.charsArray[currentIndex];
    if (kk!=null&&kk.callback!=null) {
      kk.callback();
    }
    console.log('Current index is', currentIndex);
  }
 
}
