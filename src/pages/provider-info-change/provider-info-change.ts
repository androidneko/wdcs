import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProviderInfoChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-info-change',
  templateUrl: 'provider-info-change.html',
})
export class ProviderInfoChangePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderInfoChangePage');
  }
  compeletCliked(){
    console.log("完成");
  }

}
