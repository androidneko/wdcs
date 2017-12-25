import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrbCodeResultProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrb-code-result-product-detail',
  templateUrl: 'qrb-code-result-product-detail.html',
})
export class QrbCodeResultProductDetailPage {
  count:any = 0;
  item:any = {};
  imgArray=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.data.item!=null) {
      this.item = navParams.data.item;
      if (navParams.data.item.proIconDetail!=null&&navParams.data.item.proIconDetail.length>5) {
        let strArray:Array<string> = navParams.data.item.proIconDetail.split(",");
        if (strArray!=null) {
          for (let index = 0; index < strArray.length; index++) {
            const element = strArray[index];
            this.imgArray[index]=element;
          }
        }
    
      }
    }
  }
  valuechange(count){
    this.item.productNum = count;
  }
  clickRong(){
    console.log("我要融资");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QrbCodeResultProductDetailPage');
  }

  comfirmClick(){
    console.log("确认按钮点击");
    if (this.navParams.data.callback!=null) {
      this.navParams.data.callback(this.item);
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
    }
  }
  resetClick(){
    console.log("重置按钮点击");
    this.item.productNum=1;
  }
}
