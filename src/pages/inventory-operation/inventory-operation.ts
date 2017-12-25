import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InventoryOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-operation',
  templateUrl: 'inventory-operation.html',
})
export class InventoryOperationPage {
  gaming: string = "n64";
  petData: any;
  type: any;
  reMark:String;
  dataArray:Array<any> = ["123","456","789","789","789","789","789","789","789"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.petData = [
      { text: 'Bird', value: 'bird' },
      { text: 'Cat', value: 'cat' },
      { text: 'Dog', value: 'dog' },
      { text: 'Honey Badger', value: 'honeybadger' },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryOperationPage');
  }
  selectChange()
  {

  }
}
