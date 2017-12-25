import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the JlOrdersItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'jl-orders-item',
  templateUrl: 'jl-orders-item.html'
})
export class JlOrdersItemComponent {
  @Input() orderProdlist:any=[];
  @Input() totalAtm:any=0.00;
  @Output()  emptyProduct:EventEmitter<any> = new EventEmitter();
  constructor(public alertCtrl:AlertController) {
    console.log('Hello JlOrdersItemComponent Component');
  }
  //全部清空
  deleteClick(){
    console.log("删除按钮点击");
    let alert = this.alertCtrl.create({
      message:'是否清空商品?',
      buttons:[
          {
            text:'否',
            cssClass:"alertDialogClass_balck",
            handler:()=>{
              console.log("取消");
            }
          },
          {
            text:'是',
            cssClass:"alertDialogClass_normal",
            handler:()=>{
              console.log("确定");
              this.orderProdlist=[];
              this.emptyProduct.emit();
            }
          }
      ]
    });
    alert.present();
  }
}
