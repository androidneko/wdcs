import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusinessEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-edit',
  templateUrl: 'business-edit.html',
})
export class BusinessEditPage {

  all:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.all = this.navParams.data.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessEditPage');
  }

  cancelBtnCliked(){
    console.log('cancelBtnCliked');
    this.navCtrl.pop();    
  }

  doneBtnCliked(){
    console.log('doneBtnCliked');
    //确定
    if (this.navParams.data.callback != null) {
      this.navCtrl.pop();
      this.navParams.data.callback(this.all);
    }   
  }
}
