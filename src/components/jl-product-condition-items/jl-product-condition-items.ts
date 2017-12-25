import { BuildingPage } from './../../pages/building/building';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the JlProductConditionItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-product-condition-items',
  templateUrl: 'jl-product-condition-items.html'
})
export class JlProductConditionItemsComponent {
  @Input() orderProdlist:any=[];
  @Input() totalAtm:any=0.00;
  @Output()  emptyProduct:EventEmitter<any> = new EventEmitter();
  constructor( public alertCtrl:AlertController,public navCtrl:NavController) {
    console.log('Hello JlProductConditionItemsComponent Component');
    
  }
  deleteClick(){
    console.log("删除按钮点击");
    let alert = this.alertCtrl.create({
      title:'是否清空商品?',
      buttons:[
          {
            text:'否',
            handler:()=>{
              console.log("取消");
            }
          },
          {
            text:'是',
            handler:()=>{
              console.log("取消");
              this.orderProdlist=[];
              this.emptyProduct.emit();
            }
          }
      ]
    });
    alert.present();
  }
  click(){
    this.navCtrl.push(BuildingPage);
  }
}
 