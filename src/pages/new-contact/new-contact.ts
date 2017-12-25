import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';

/**
 * Generated class for the NewContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage  extends BasePage {
  contactName:String="";
  telNo:String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewContactPage');
  }
  saveBtnCliked(){
    console.log('保存');
    if (this.contactName.length == 0) {
      this.toast("请输入用户名");
      return;
    }
    if (this.telNo.length == 0) {
      this.toast("请输入联系方式");
      return;
    }
    if (this.navParams.data.callback!=null) {
      let contact={contactName:this.contactName,telNo:this.telNo,defaultOrNot:"0"};
      this.navParams.data.callback(contact);
      this.navCtrl.pop();
    }
  }
}
