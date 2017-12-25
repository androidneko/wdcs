import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectWarehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-warehouse',
  templateUrl: 'select-warehouse.html',
})
export class SelectWarehousePage {
  dataArray:Array<any>=["12312","123123"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectWarehousePage');
  }

  addBtnCliked()
  {
    
  }
}
