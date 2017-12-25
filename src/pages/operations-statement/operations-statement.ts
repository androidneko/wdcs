import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OperationsStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operations-statement',
  templateUrl: 'operations-statement.html',
})
export class OperationsStatementPage {
  dataArray:any=["qeqwe","213123"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperationsStatementPage');
  }
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      return false;
    }
  }
  itemClicked(item){

  }
}
