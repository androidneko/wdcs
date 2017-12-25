import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the StockPrewarningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-prewarning',
  templateUrl: 'stock-prewarning.html',
})
export class StockPrewarningPage extends BasePage {
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent: String = "";

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPrewarningPage');
    this.sendQueryStockPrewarningRequest(this.currentPage, null);
  }

  keydown(event) {
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      if (this.searchContent.length>0) {
        this.toastShort("搜索:" + this.searchContent);
        this.sendQueryStockPrewarningRequest(1,null);
      }
      return false;
    }
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendQueryStockPrewarningRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendQueryStockPrewarningRequest(this.currentPage+1, refresher);
  }

  sendQueryStockPrewarningRequest(page: any, refresher: any) {
    let params =
      {
        "dataInfo": {
          merchantId:AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          likeStr: this.searchContent
        },
        "USER_ID":AppServiceProvider.getInstance().userinfo.USERID,
        "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "start":  page==1?0:this.dataArray.length,
        "length": this.pageSize,
        "ACTION_NAME": "storeFacade|noticeStore"
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
