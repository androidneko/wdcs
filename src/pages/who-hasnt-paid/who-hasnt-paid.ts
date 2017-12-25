import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the WhoHasntPaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-who-hasnt-paid',
  templateUrl: 'who-hasnt-paid.html',
})
export class WhoHasntPaidPage extends BasePage {
  totalAmt:number = 0.00;
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  condition: any = { client: {},createStartDate: "", createEndDate: "" };

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhoHasntPaidPage');
    this.sendWhoHasntPaidRequest(this.currentPage, null);
  }

  choosebtnClicked() {
    console.log("选择按钮点击");
    this.navCtrl.push("WhpConditionChoosePage", { condition: this.condition, selectionCallback: this.selectionCallback });
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.condition = condition;
      this.sendWhoHasntPaidRequest(1, null);
      console.log("收到回传数据:" + this.condition.createStartDate);
      //todo
    } else {
      console.log("回传数据出错");
    }
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendWhoHasntPaidRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendWhoHasntPaidRequest(this.currentPage+1, refresher);
  }

  sendWhoHasntPaidRequest(page: any, refresher: any) {
    let params =
      {
        "USER_ID":AppServiceProvider.getInstance().userinfo.USERID,
        "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "dataInfo": {
          merchantId:""+this.condition.client.merchantId,
          startTime:""+this.condition.createStartDate,
          endTime:""+this.condition.createEndDate,
          initiatorMerchantId:""+AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          direction:"1"//1,谁未付我钱  2，我未付谁钱
        },
        "length":this.pageSize,
        "start":this.dataArray.length,
        "ACTION_NAME":"finVeracityService|selectPayableMoney" 
      };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.dataArray = [];
        }
        let info = obj.ACTION_INFO;
        let list = info.data;
        this.totalAmt = info.foot[0];
        this.total = info.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.dataArray.push(element);
        }
        this.currentPage = page;

        if (refresher != null) {
          refresher.complete();
        }

      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }

    }, error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }
}
