import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { ParseAmountPipe } from '../../pipes/parse-amount/parse-amount';

/**
 * Generated class for the WhoHasPaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe,ParseAmountPipe],
  selector: 'page-who-has-paid',
  templateUrl: 'who-has-paid.html',
})
export class WhoHasPaidPage extends BasePage {
  totalAmt:number = 0.00;
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  condition: any = { client: {}, product: [], createStartDate: "", createEndDate: "" };
  

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivingHistoryPage');
    this.sendReceivingHistoryRequest(this.currentPage, null);
  }

  choosebtnClicked() {
    console.log("选择按钮点击");
    this.navCtrl.push("WhpConditionChoosePage", { condition: this.condition, selectionCallback: this.selectionCallback });
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.condition = condition;
      this.sendReceivingHistoryRequest(1, null);

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
    this.sendReceivingHistoryRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendReceivingHistoryRequest(this.currentPage+1, refresher);
  }

  sendReceivingHistoryRequest(page: any, refresher: any) {
    let params =
    {
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "otherMerchantId":this.condition.client.merchantId,
      "orderProdList":this.condition.orderProdList,
      "createStartDate": this.condition.createStartDate,
      "createEndDate": this.condition.createEndDate,
      "orderClass":"01",
      "pageNum": "" + page,
      "pageSize": this.pageSize + "",
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
