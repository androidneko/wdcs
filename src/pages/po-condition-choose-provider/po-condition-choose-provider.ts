import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the PoConditionChooseProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-po-condition-choose-provider',
  templateUrl: 'po-condition-choose-provider.html',
})
//选择供应商的界面
export class PoConditionChooseProviderPage extends BasePage{
  dataArray:Array<any>=[];
  merName:String="";
  currentPage:any=1;
  pageSize:any = 20;
  total:any=-1;
  constructor(public navCtrl: NavController, public navParams: NavParams,toastCtrl:ToastController,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoConditionChooseProviderPage');
    this.sendProviderRequest(1,null,true);
  }
  itemClicked(item){
    console.log('item clicked');
    if(this.navParams.data.type=="choose"){
      if(this.navParams.data.callback!=null){
        this.navParams.data.callback(item);
        this.navCtrl.pop();
      }
    }else{
      this.sendProviderDetail(item)
    }
    
  }
  addBtnCliked(){
    console.log("add btn clicked");
    this.navCtrl.push("NewProviderPage",{
      callback:()=>{
        this.sendProviderRequest(1,null,true);
      }
    });
  }
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendProviderRequest(1,null,true);
      return false;
    }
  }
  //net 
    //net 网络请求
    doRefresh(refresher){
      //刷新
      console.log("上拉加载更多");
      this.sendProviderRequest(1,refresher,false);
      
    }
    doInfinite(refresher){
      
          this.sendProviderRequest(this.currentPage+1,refresher,false);
    }
  sendProviderRequest(page:any,refresher:any,isShowLoading:boolean){
    let params = 
    {
      "merInfo":
      {
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "merName":this.merName,
      },
      "type":"0", //0是供应商 1是客户
      "pageNum":""+page,
      "pageSize":""+ this.pageSize,
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "ACTION_NAME":"merMangementService|queryStreamP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if(page==1){
          this.dataArray = [];
        }
        // let info = obj.ACTION_INFO;
        let list =  obj.ACTION_INFO.data;
        this.total = obj.ACTION_INFO.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.dataArray.push(element);
        }
        this.currentPage = page;



      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if(refresher!=null){
        refresher.complete();
      }
    },error => {
      this.toast(error);
      this.total==0
      if(refresher!=null){
          refresher.complete();
        }
    },isShowLoading);
  }
  sendProviderDetail(item:any){
    let params =
    {
      "merCustomPkId":item.merCustomerPkId,
      "type":"0",
      "ACTION_NAME":"merMangementService|streamDetailsP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        let zmerInfo = obj.ACTION_INFO;
        zmerInfo.streamType = item.streamType;//删除用为1的时候穿merchantid用
        zmerInfo.merchantId = item.merchantId;
        zmerInfo.merCustomerPkId = item.merCustomerPkId;
        this.navCtrl.push("ProviderDetailPage",{merInfo:zmerInfo,callback:data=>{
          if (data="refresh") {
            this.sendProviderRequest(1,null,true);
          }
        }});
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
    
  }

  
}
