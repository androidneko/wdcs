import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { BasePage } from '../base/base';

/**
 * Generated class for the SalesOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// class OrderInfo {
//   orderName: string; //订单名称
//   customerName: string; //客户名称
//   time: string;
//   amount: string;
//   orderStatus: string;
// }


// class XList {
//   data: string;
//   list: Array<OrderInfo>;
// }

@IonicPage()
@Component({
  selector: 'page-sales-order',
  templateUrl: 'sales-order.html',
})
export class SalesOrderPage extends BasePage{
  dataArray:Array<any>=[];
  total:any=-1;
  currentPage:any=0;
  pageSize:any = 20;
  searchContent:String="";
  condition:any={stockStatus:"",payStatus:"",orderNo:"",merchantId:"",merchantName:"选择客户",createStartDate:"",createEndDate:""};
  constructor(public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,mtoast);
  }

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderPage');
    this.sendOrderRequest(1,null,true);
  }

  // pageCallBack = (key: String, item: any) => {
  //   console.log("回调" + key);
  // }

  /**
   * 筛选
   */
  addSelsct() {
    //this.navCtrl.push("OrderSelectPage", { callback: this.pageCallBack });

    this.navCtrl.push("OrderSelectPage",{condition:this.condition,callback:condition=>{
      this.condition = condition;
      this.sendOrderRequest(1,null,true);
    }});
  }

  /**
   * 监听键盘enter键
   * @param event 
   */
  onkey(event) {

    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendOrderRequest(1,null,true);
      return false;
    }

    // if ("Enter" == event.key) {
    //   //function
    //   let val = event.target.value;
    //   if (val && val.trim() !== '') {
    //     if (this.searchContent.length>0) {
    //       this.sendOrderRequest(1,null,true);
    //     }
    //   }
    // }
  }

  addSalesOrder() {
    console.log('新增销售订单');
    this.navCtrl.push("AddSalesOrderPage",{callback:(msg=>{
      if(msg=="refresh")
      {
        this.sendOrderRequest(1,null,true);
      }
    })});

    
  }

  doRefresh(refreshScroll) {
    console.log('下拉刷新');
    this.sendOrderRequest(1,refreshScroll,true);
  }

  /**
   * item 点击
   * @param item 
   */
  itemClicked(item)
  {
    //this.navCtrl.push("SalesOrderDetailPage", {object:item,callback: this.pageCallBack });
    //this.sendOrderDetailRequest(item.orderId);

    this.sendOrderDetailRequest(item.orderId);
  }


  doInfinite(infiniteScroll) {
    console.log('上拉加载更多');
    this.sendOrderRequest(this.currentPage+1,infiniteScroll,false);
  }


  sendOrderRequest(page:any,refresher:any,isShowLoading:boolean){
    let params = 
    {
      "orderNo":""+this.condition.orderNo,
      "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "otherMerchantId":""+this.condition.merchantId,
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "orderClass":"01",//进货订单00 销售订单01
      "createStartDate":""+this.condition.createStartDate,
      "createEndDate":""+this.condition.createEndDate,
      "stockStatus":""+this.condition.stockStatus,
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
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if(refresher!=null){
        refresher.complete();
      }
    },error => {
      this.toast(error);
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
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        this.navCtrl.push("SalesOrderDetailPage",{item:obj.ACTION_INFO,callback:(type:string)=>{
          //返回
          if(type=="refresh")
          {
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
