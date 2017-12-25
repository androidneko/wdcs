import { Events } from 'ionic-angular/util/events';

import { ModifyPwdPage } from './../modify-pwd/modify-pwd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  cacheSize:string = '10.8';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController,public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logoutButtonPress(){
    console.log('logout press');
    // this.navCtrl.setRoot(LoginPage);
    this.events.publish('logoutNotification');
  }

  enterModifyPwd(){
    this.navCtrl.push(ModifyPwdPage);
  }

  cleanCacheButtonClick(){
    let alert = this.alert.create({
      title:'确定要清除数据？',
      buttons:[{
        text:'取消'
      },{
        text:'确定',
        handler:()=>{
          console.log('confirm');
          
        }
      }]
    });

    alert.present();
  }

}
