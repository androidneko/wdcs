import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the IHavntPaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-i-havnt-paid',
  templateUrl: 'i-havnt-paid.html',
})
export class IHavntPaidPage extends BasePage {
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
    console.log('ionViewDidLoad IHavntPaidPage');
    this.sendIHavntPaidRequest(this.currentPage, null);
  }

  choosebtnClicked() {
    console.log("选择按钮点击");
    this.navCtrl.push("IhpConditionChoosePage", { condition: JSON.parse(JSON.stringify(this.condition)), selectionCallback: this.selectionCallback });
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.condition = condition;
      this.sendIHavntPaidRequest(1, null);
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
    this.sendIHavntPaidRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendIHavntPaidRequest(this.currentPage+1, refresher);
  }

  sendIHavntPaidRequest(page: any, refresher: any) {
    let params =
      {
        "dataInfo": {
          endTime:""+this.condition.createEndDate,
          merchantId:""+this.condition.provider.merchantId,
          initiatorMerchantId:""+AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          startTime:""+this.condition.createStartDate,
          direction:"2"//1,谁未付我钱  2，我未付谁钱
        },
        "length":this.pageSize,
        "start":page==1?0:this.dataArray.length,
        "USER_ID": AppServiceProvider.getInstance().userinfo.USER_ID,
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

       

      } else {
        this.total=0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
      }

    }, error => {
      this.total=0;
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }
}
