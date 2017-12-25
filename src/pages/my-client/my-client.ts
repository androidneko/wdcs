import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { BasePage } from './../base/base';
import { AppGlobal, AppServiceProvider } from './../../providers/app-service/app-service';
import { MyRecommendPage } from './../my-recommend/my-recommend';
import { SettingPage } from './../setting/setting';
import { FeedbackPage } from './../feedback/feedback';
import { MessageListPage } from './../message-list/message-list';
import { PersonalInfoPage } from './../personal-info/personal-info';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { MyQrcodePage } from '../my-qrcode/my-qrcode';
import { Events } from 'ionic-angular/util/events';


/**
 * Generated class for the MyClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-client',
  templateUrl: 'my-client.html',
})
export class MyClientPage extends BasePage{
  badgecount:any=2;
  headerImageUrl:string = "http://n.sinaimg.cn/news/1_img/upload/cf3881ab/w1200h674/20171208/1Lw0-fypnsip0186049.jpg";
  name:string = "匿名用户";
  company:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private net:TyNetworkServiceProvider,public events:Events) {
  
    super(navCtrl,navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyClientPage');
    let userInfo = AppServiceProvider.getInstance().userinfo;
    this.name = userInfo.USER_NAME;
    this.sendRequest();
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

  enterTabbarClicked(){
    this.events.publish('enterFirstTabbar');
  }
  feedbackClicked(){
    console.log('点击意见反馈');
    this.navCtrl.push(FeedbackPage);
  }

  aboutUsClick(){
    this.navCtrl.push(AboutPage);
  }

  myQRcodeClick(){
    console.log('点击收款码');
    this.navCtrl.push(MyQrcodePage);
  }

  myRecommendClick(){
    console.log('click my recommend');
    this.navCtrl.push(MyRecommendPage);
  }



  sendRequest(){
    let params = {
      "userId": AppServiceProvider.getInstance().userinfo.USERID,
      "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "ACTION_NAME":"merUserApi|viewMerUser"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg=>{
      console.log(msg);
      let obj = JSON.parse(msg);
      if(obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed || obj.ACTION_RETURN_CODE==null){

        if(obj.ACTION_INFO.data.picUrl != null)
        {
          this.headerImageUrl = obj.ACTION_INFO.data.picUrl;
        }
        this.company = obj.ACTION_INFO.data.cellPhone;
        
      }
      console.log(obj);
    },error => {

    }, true);
  }

}


