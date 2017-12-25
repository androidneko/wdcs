import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the IHavePaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-i-have-paid',
  templateUrl: 'i-have-paid.html',
})
export class IHavePaidPage extends BasePage {
  totalAmt:number = 0.00;
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  condition: any = { provider: {merName:"",merchantId:""},orderProdList:[], createStartDate: "", createEndDate: "" };

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IHavePaidPage');
    this.sendPayHistoryRequest(this.currentPage, null);
  }

  choosebtnClicked() {
    console.log("选择按钮点击");
    this.navCtrl.push("IhpConditionChoosePage", { condition: JSON.parse(JSON.stringify(this.condition)), selectionCallback:  
      (condition) => {
      if (typeof (condition) != 'undefined') {
        this.condition = condition;
        this.sendPayHistoryRequest(1, null);
  
        // this.toastShort("收到回传数据:" + this.condition.createStartDate);
        console.log("收到回传数据:" + this.condition.createStartDate);
        //todo
      } else {
        console.log("回传数据出错");
      }
    } });
  }




  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendPayHistoryRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendPayHistoryRequest(this.currentPage+1, refresher);
  }

  sendPayHistoryRequest(page: any, refresher: any) {
    let params =
      {
        "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "otherMerchantId":this.condition.provider.merchantId,
        "createStartDate": this.condition.createStartDate,
        "createEndDate": this.condition.createEndDate,
        "orderClass":"00",
        "pageNum": "" + page,
        "pageSize": this.pageSize + "",
        "orderProdList":this.condition.orderProdList,
        "ACTION_NAME": "paymentFacadeAPI|queryPaymentList"
      };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.dataArray = [];
        }
        let info = obj.ACTION_INFO;
        let list = info.data;
        this.total = info.recordsTotal;
        this.totalAmt = info.countTotalAmt;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.dataArray.push(element);
        }
        this.currentPage = page;

      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
      }

    }, error => {
      this.toast(error);
      this.total=0;
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }
}
