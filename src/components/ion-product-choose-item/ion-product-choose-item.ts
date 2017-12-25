import { Component,Input ,Output,EventEmitter} from '@angular/core';
import { ParseFloatPipe } from '../../pipes/parse-float/parse-float';

/**
 * Generated class for the IonProductChooseItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  providers:[ParseFloatPipe],
  selector: 'ion-product-choose-item',
  templateUrl: 'ion-product-choose-item.html'
})
export class IonProductChooseItemComponent {
  
  @Input() item:any;
  @Output() changeTotal: EventEmitter<any> = new EventEmitter();
  constructor() {
    console.log('Hello IonProductChooseItemComponent Component');
  }
  addCount(count){
    
  }
  jlclick(){
    
  }
  itemClicked(){
    this.changeTotal.emit();
  }
  valuechange(count){
    this.item.productNum = count;
    if(this.item.isSelected==true){
      this.changeTotal.emit();
    }
  }
  backClick(check){
    check.checked=!check.checked;
  }
}
