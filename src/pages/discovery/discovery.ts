import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { BasePage } from '../base/base';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BasePage {

  newsCategory:String = "recommand";
  hotName:String = "热销理财";

  newsRecommandList:any = [];
  newsFinancingList:any = [];
  newsHbBankList:any = [];
  hotRecommandList:any = [];
  hotFinancingList:any = [];
  hotHbBankList:any = [];

  constructor(
    public mtoast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider,
    public device:DeviceIntefaceServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryPage');
    this.sendNewsRequest(null);
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendNewsRequest(refresher);
  }

  goToNewsDetail(news:any){
    this.device.push("webView",news.url,msg =>{
      console.log("push success");
    },err => {
      this.toast(err);
      console.log("push failed");
    });
  }
  
  sendNewsRequest(refresher: any) {
    let params =
      {
        "merInfo":
        {
          "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        },
        "ACTION_NAME":"common|queryNews"
      };
    this.net.httpPost(AppGlobal.API.test, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed) {
        this.newsRecommandList = [];
        this.hotRecommandList = [];
        this.newsFinancingList = [];
        this.hotFinancingList = [];
        this.newsHbBankList = [];
        this.hotHbBankList = [];
        
        let info = obj.ACTION_INFO;

        let recommand =  info.recommand;
        for (let index = 0; index < recommand.top.length; index++) {
          let element = recommand.top[index];   
          this.newsRecommandList.push(element);        
        } 
        for (let index = 0; index < recommand.hot.length; index++) {
          let element = recommand.hot[index];   
          this.hotRecommandList.push(element);        
        } 

        let financing =  info.financing;
        for (let index = 0; index < financing.top.length; index++) {
          let element = financing.top[index];   
          this.newsFinancingList.push(element);        
        }
        for (let index = 0; index < financing.hot.length; index++) {
          let element = financing.hot[index];   
          this.hotFinancingList.push(element);        
        }

        let hbbank =  info.hbbank;
        for (let index = 0; index < hbbank.top.length; index++) {
          let element = hbbank.top[index];   
          this.newsHbBankList.push(element);        
        }
        for (let index = 0; index < hbbank.hot.length; index++) {
          let element = hbbank.hot[index];   
          this.hotHbBankList.push(element);        
        }

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
