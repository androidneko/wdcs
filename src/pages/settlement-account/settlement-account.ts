import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { BasePage } from '../base/base';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the SettlementAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settlement-account',
  templateUrl: 'settlement-account.html',
})
export class SettlementAccountPage extends BasePage {
  dataArray:Array<any> =[];
  searchContent:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public mtoast: ToastController,private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettlementAccountPage');
    this.sendRequest(null);
  }

  itemClick(item)
  {
    var callback = this.navParams.get("callback");
    //var item :any={name:"聚联账户"}
    callback(item);
    this.navCtrl.pop();
  }
  onkey(event)
  {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendRequest(null);
      return false;
    }
  }


  sendRequest(refresher: any) {
    let params =
      {
        "dataInfo":
        {
          "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          "content":this.searchContent
        },
        "ACTION_NAME":"finSettlementAccService|findAcc"
      };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        this.dataArray =  obj.ACTION_INFO.data;
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    }, error => {
      this.toast(error);
    }, refresher == null);
  }

}
