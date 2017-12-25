import { FeedbackPage } from './../feedback/feedback';
import { AboutPage } from './../about/about';
import { MessageListPage } from './../message-list/message-list';
import { SettingPage } from './../setting/setting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonalInfoPage } from '../personal-info/personal-info';

/**
 * Generated class for the MyClientManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-client-manager',
  templateUrl: 'my-client-manager.html',
})
export class MyClientManagerPage {

  headerImageUrl:string = "assets/imgs/1.jpg";
  name:string = "匿名用户";
  company:string = "账号";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyClientManagerPage');
  }


  messageBtnCliked(){
    console.log("消息按钮点击");
    this.navCtrl.push(MessageListPage);
  }
  settingBtnCliked(){
    console.log("设置按钮点击");
    this.navCtrl.push(SettingPage);
  }

  headerCellClicked(){
    this.navCtrl.push(PersonalInfoPage);
  }

  feedbackClicked(){
    console.log('点击意见反馈');
    this.navCtrl.push(FeedbackPage);
  }

  aboutUsClick(){
    this.navCtrl.push(AboutPage);
    console.log('点击了关于我们');
  }



}
