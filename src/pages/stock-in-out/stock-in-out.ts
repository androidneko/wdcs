import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the StockInOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-in-out',
  templateUrl: 'stock-in-out.html',
})
export class StockInOutPage extends BasePage {
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent: String = "";
  createStartDate:String = "";//开始时间
  createEndDate:String = "";//结束时间
  condition: any = {storage: {}, bigCate:  {
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
   }, createStartDate: "", createEndDate: ""};

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockInOutPage');
    this.sendQueryStockInoutRequest(this.currentPage, null);
  }

  keydown(event) {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendQueryStockInoutRequest(1,null);
      return false;
    }
  }

  rightBtnClicked() {
    this.navCtrl.push("StockioConditionChoosePage", {condition:this.condition,selectionCallback:this.selectionCallback});
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.searchContent = "";
      this.condition = condition;
      this.sendQueryStockInoutRequest(1, null);
      //todo
    } else {
      console.log("回传数据出错");
    }
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendQueryStockInoutRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendQueryStockInoutRequest(this.currentPage+1, refresher);
  }

  sendQueryStockInoutRequest(page: any, refresher: any) {
    let params =
      {
        "dataInfo": {
          merchantId:AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          bigCategory:this.condition.bigCate==null?"":this.condition.bigCate.customCategoryId,
          littleCategory:this.condition.smallCate==null?"":this.condition.smallCate.customCategoryId,
          warehouseId:this.condition.storage==null?"":this.condition.storage.warehouseId,
          startDate:this.condition.createStartDate,
          endDate:this.condition.createEndDate,
          likeStr: this.searchContent
        },
        "USER_ID":AppServiceProvider.getInstance().userinfo.USERID,
        "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "start":  page==1?0:this.dataArray.length,
        "length": this.pageSize,
        "ACTION_NAME": "storageFacade|statisticsStorage"
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
