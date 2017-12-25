import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-payer',
  templateUrl: 'order-payer.html',
})
export class OrderPayerPage {
  dataArray:Array<any>=["123","234"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayerPage');
  }

  onkey(evebt)
  {

  }
  itemClick(item)
  {
    var callback = this.navParams.get("callback");
    var item :any={name:"张三"}
    callback(item);
    this.navCtrl.pop();
  }
}
