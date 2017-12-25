import { BasePage } from './../base/base';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppGlobal, AppServiceProvider} from '../../providers/app-service/app-service';

/**
 * Generated class for the PurchaseOderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-oder',
  templateUrl: 'purchase-oder.html',
})
export class PurchaseOderPage extends BasePage {
  dataArray:Array<any>=[];
  total:any=-1;
  currentPage:any=1;
  pageSize:any = 20;
  searchContent:String="";
  condition:any={stockStatus:"",payStatus:"",orderNo:"",provider:{merchantId:"",merName:"选择供应商"},whse:{whseId:"",whseName:"请选择仓库"},createStartDate:"",createEndDate:""};
  constructor(public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,mtoast);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseOderPage');
    this.sendOrderRequest(1,null,true);
  }
  itemClicked(item){
    console.log("itemCliked");
    // this.navCtrl.push("BuildingPage");
    this.sendOrderDetailRequest(item.orderId);
    
  }
  rightBtnClicked(){
    this.navCtrl.push("PoConditionChoosePage",{condition:JSON.parse(JSON.stringify(this.condition)),callback:condition=>{
      this.condition = condition;
      this.sendOrderRequest(1,null,true);
    }});

  }
  addBtnCliked(){
    console.log("addBtnCliked");
    this.navCtrl.push("NewPurchaseOrderPage",{callback:()=>{
      this.sendOrderRequest(1,null,true);
    }});
  }

  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
     this.sendOrderRequest(1,null,true);
      return false;
    }
  }
  //net 网络请求
  doRefresh(refresher){
    //刷新
    console.log("上拉加载更多");
    this.sendOrderRequest(1,refresher,false);
    
  }
  doInfinite(refresher){

    this.sendOrderRequest(this.currentPage+1,refresher,false);
  }
  sendOrderRequest(page:any,refresher:any,isShowLoading:boolean){
    let params = 
    {
      "orderNo":""+this.condition.orderNo,
      "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "otherMerchantId":""+this.condition.provider.merchantId,
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "orderClass":"00",//进货订单00 销售订单01
      "createStartDate":""+this.condition.createStartDate,
      "createEndDate":""+this.condition.createEndDate,
      "stockStatus":""+this.condition.stockStatus,
      "whseId":this.condition.whse.whseId,
      "payStatus":""+this.condition.payStatus,
      "pageNum": ""+page,
      "pageSize": this.pageSize+"",
      "searchContent":""+this.searchContent,
      "ACTION_NAME":"orderFacadeAPI|queryAllOrderList"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if(page==1){
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


      }else{
        this.total=0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if(refresher!=null){
        refresher.complete();
      }

    },error => {
      this.toast(error);
      this.total=0;
      if(refresher!=null){
          refresher.complete();
        }
    },isShowLoading);
  }

  sendOrderDetailRequest(orderId){
    let params = 
    {
        "orderId": orderId,
        "ACTION_NAME":"orderFacadeAPI|queryOrderDetail"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        console.log("dsafsadf");
        this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO,callback:(msg)=>{
          if (msg=="refresh") {
            this.sendOrderRequest(1,null,true);
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
