import { Component,Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the BusinessItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'business-item',
  templateUrl: 'business-item.html'
})
export class BusinessItemComponent {
  // @Input() item:any;
  
  itemValue:any;
  childList=[];
  @Input()
  get item(){
    return this.itemValue;
  }
  set item(val){
    this.itemValue = val;
    let childList = [];
     var list = [];
     childList.push(list);
    for (let index = 0; index < val.childList.length; index++) {
      if (list.length == 4) {
        
           list=[];
           childList.push(list);
      }
      const element = val.childList[index];
      if(element.isSelected==true){
        list.push(element);
      }
      
    }
    if (childList[childList.length-1].length == 0) {
      childList.pop();
    }

    this.childList = childList;
  }
  text: string;

  constructor(private navCtrl:NavController) {
    console.log('Hello BusinessItemComponent Component');
    this.text = 'Hello World';
  }
  goDetails(item){
   if(item.menuName=="进货订单"){
     this.navCtrl.push("PurchaseOderPage");
   }else if(item.menuName == "我的商品"){
    this.navCtrl.push("MyProductListPage");
   }
   else{
     this.navCtrl.push("BuildingPage");
   }
  }
}
