import { NavController } from 'ionic-angular';
import { Component,Input,Output, EventEmitter} from '@angular/core';


/**
 * Generated class for the JlProductItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-product-item',
  templateUrl: 'jl-product-item.html'
})
export class JlProductItemComponent {

  @Input() item:any;
  @Output() itemEvent = new EventEmitter();
  constructor(public navCtrl:NavController) {
    console.log('Hello JlProductItemComponent Component');
    
  }
  itemClick(){
    this.itemEvent.emit(JSON.parse(JSON.stringify(this.item)));

  }

}
