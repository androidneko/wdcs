import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the SalesReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-report',
  templateUrl: 'sales-report.html',
})
export class SalesReportPage extends BasePage {
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent: String = "";
  condition: any = { client: {}, storage: {}, bigCate:  {
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
    smallCate:
    {
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
   }, createStartDate: "", createEndDate: "" };
  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesReportPage');
    this.sendSalesReportRequest(this.currentPage, null);
  }

  keydown(event) {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendSalesReportRequest(1,null);
      return false;
    }
  }

  rightBtnClicked() {
    this.navCtrl.push("SrConditionChoosePage", {condition:JSON.parse(JSON.stringify(this.condition)),selectionCallback:this.selectionCallback});
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.searchContent = "";
      this.condition = condition;
      this.sendSalesReportRequest(1, null);

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
    this.sendSalesReportRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendSalesReportRequest(this.currentPage+1, refresher);
  }

  sendSalesReportRequest(page: any, refresher: any) {
    let params =
      {
        "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "orderClass":"01", //订单分类 00:进货 01:销货  非空
        "searchContent": this.searchContent,
        "otherMerchantId": this.condition.client==null?"":this.condition.client.merchantId,
        "whseId": this.condition.storage==null?"":this.condition.storage.warehouseId,
        "createStartDate": this.condition.createStartDate,
        "createEndDate": this.condition.createEndDate,
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
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
      }


    }, error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }

}
