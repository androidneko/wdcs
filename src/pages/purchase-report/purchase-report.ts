import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the PurchaseReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-report',
  templateUrl: 'purchase-report.html',
})
export class PurchaseReportPage extends BasePage {
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent: String = "";
  condition = { 
    storage: {whseId:"",whseName:"选择仓库"},
    provider: {merchantId:"",merName:"选择供应商"},
    bigCate: {
    "categoryChild": [],
    "categoryIconUrl": "",
    "createTime": "",
    "createUser": "",
    "customCategoryId": "",
    "customCategoryName": "",
    "customParentId": "",
    "merchantId": "",
    "pkid": "",
    "productLevel": "",
    "state": "",
    "status": ""
  },
  smallCate:{
    "categoryChild": [],
    "categoryIconUrl": "",
    "createTime": "",
    "createUser": "",
    "customCategoryId": "",
    "customCategoryName": "",
    "customParentId": "",
    "merchantId": "",
    "pkid": "",
    "productLevel": "",
    "state": "",
    "status": ""
  },
  createStartDate: "",
  createEndDate: "" };
  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseReportPage');
    this.sendPurchaseReportRequest(this.currentPage, null);
  }

  keydown(event) {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendPurchaseReportRequest(1,null);
      return false;
    }
  }

  //筛选按钮
  rightBtnClicked() {
    this.navCtrl.push("PrConditionChoosePage", {condition:JSON.parse(JSON.stringify(this.condition)),callback:condition=>{
      if (typeof (condition) != 'undefined') {
        this.searchContent = "";
        this.condition = condition;
        this.sendPurchaseReportRequest(1, null);
  
        console.log("收到回传数据:" + this.condition.createStartDate);
        //todo
      } else {
        console.log("回传数据出错");
      }
    }});
  }



  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendPurchaseReportRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendPurchaseReportRequest(this.currentPage+1, refresher);
  }

  sendPurchaseReportRequest(page: any, refresher: any) {
    let params =
      {
        "searchContent": this.searchContent,
        "buyerId": AppServiceProvider.getInstance().userinfo.USERID,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "otherMerchantId":""+this.condition.provider.merchantId,
        "createStartDate": this.condition.createStartDate,
        "createEndDate": this.condition.createEndDate,
        "orderClass":"00",
        "whseId":this.condition.storage.whseId,
        "productClass":this.condition.smallCate.customCategoryId!=null&&this.condition.smallCate.customCategoryId.length>0?this.condition.smallCate.customCategoryId:this.condition.bigCate.customCategoryId,
        "pageNum": "" + page,
        "pageSize": this.pageSize + "",
        "ACTION_NAME": "orderFacadeAPI|queryOrderReportList"
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
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.dataArray.push(element);
        }
        this.currentPage = page ;

        if (refresher != null) {
          refresher.complete();
        }

      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
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
