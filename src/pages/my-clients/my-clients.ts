import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the MyClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-clients',
  templateUrl: 'my-clients.html',
})
export class MyClientsPage extends BasePage {
  dataArray: Array<any> = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 20;
  searchContent:String="";

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesReportPage');
    this.sendMyClientsRequest(this.currentPage, null);
  }

  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      if (this.searchContent.length>0) {
        this.sendMyClientsRequest(1,null);
      }
      return false;
    }
  }

  addBtnCliked() {
    console.log("add btn clicked");
    this.navCtrl.push("NewClientPage",{
      callback:()=>{
        this.sendMyClientsRequest(1,null);
      }
    });
  }

  itemClicked(item) {
    console.log("itemCliked");

    if(this.navParams.data.tag=="choose"){
      if(this.navParams.data.callback!=null){
        this.navParams.data.callback(item);
        this.navCtrl.pop();
      }
    }else{
      this.sendClientDetailRequest(item)
    }
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendMyClientsRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendMyClientsRequest(this.currentPage+1, refresher);
  }

  sendMyClientsRequest(page: any, refresher: any) {
    let params =
      {
        "merInfo":
        {
          "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          "merName":this.searchContent,
        },
        "type":"1", //0是供应商 1是客户
        "pageNum":""+page,
        "pageSize":""+ this.pageSize,
        "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
        "ACTION_NAME":"merMangementService|queryStreamP"
      };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.dataArray = [];
        }
        let info = obj.ACTION_INFO;
        let list =  info.data;
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

  sendClientDetailRequest(item) {
    let params =
    {
      "merCustomPkId":item.merCustomerPkId,
      "type":"1", //0是供应商 1是客户
      "ACTION_NAME":"merMangementService|streamDetailsP"
    };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      let zmerInfo = obj.ACTION_INFO;
      zmerInfo.streamType = item.streamType;//删除用为1的时候穿merchantid用
      zmerInfo.merchantId = item.merchantId;
      zmerInfo.merCustomerPkId = item.merCustomerPkId;
      this.navCtrl.push("ClientDetailPage",{merInfo:zmerInfo,callback:data=>{
        if (data="refresh") {
          this.sendMyClientsRequest(1,null);
        }
      }});

    }, error => {
      this.toast(error);
    }, true);
  }
}
