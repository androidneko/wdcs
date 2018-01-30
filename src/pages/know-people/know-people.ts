import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the KnowPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-know-people',
  templateUrl: 'know-people.html',
})
export class KnowPeoplePage extends BasePage {
  contactName:String="";
  telNo:String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactPage');
  }
  add(){
    console.log('保存');
    if (this.contactName.length == 0) {
      this.toast("请输入知情者名称");
      return;
    }
    if (this.telNo.length == 0) {
      this.toast("请输入联系方式");
      return;
    }
    if (this.navParams.data.callback!=null) {
      let contact={contactName:this.contactName,telNo:this.telNo};
      this.navParams.data.callback(contact);
      this.navCtrl.pop();
    }
  }

}
