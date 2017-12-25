import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-customer',
  templateUrl: 'select-customer.html',
})
export class SelectCustomerPage {
  dataArray: Array<any> = ["12312", "123123"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCustomerPage');
  }
  addBtnCliked() {
    var callback = this.navParams.get("callback");
    callback("ffff22222");
    this.navCtrl.pop();
  }
}
