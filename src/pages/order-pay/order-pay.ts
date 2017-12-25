import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-pay',
  templateUrl: 'order-pay.html',
})
export class OrderPayPage {
  merchantname:String="";//商户名称
  totalMoney:String="0";//总金额
  realMoney:String="0";//真实金额
  order:any;
  orderway:any;
  oderDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayPage');
    let data = this.navParams.data;
    console.log(data);
    let oderDetail = data.oderDetail;

    this.merchantname = oderDetail.sellMerchantName;
    this.totalMoney = oderDetail.totalAmt/100.0+"";
    this.realMoney = oderDetail.payableAmt/100.0+"";
  }

}
