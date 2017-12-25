import { TydatePipe } from './../../pipes/tydate/tydate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the PurchaseOrderFollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-purchase-order-follow',
  templateUrl: 'purchase-order-follow.html',
})
export class PurchaseOrderFollowPage extends BasePage{
  createStartDate:string = "";//开始时间
  createEndDate:string = "";//结束时间
  dataArray:Array<any>=[];
  total:number=-1;
  currentPage:number=1;
  pageSize:number = 20;
  condition: any = { provider: {merName:"",merchantId:""},orderProdList:[], createStartDate: "", createEndDate: "" };
  datepicker = {start:"",end:""};
  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider,public datePipe:TydatePipe) {
    super(navCtrl, navParams, mtoast);
    if(this.condition.createStartDate==null||this.condition.createStartDate.length==0){
      this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
    }else{
      this.createStartDate = this.condition.createStartDate;
    }
    if(this.condition.createEndDate==null||this.condition.createEndDate.length==0){
      this.createEndDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    }else{
      this.createEndDate = this.condition.createEndDate;
    }
    this.datepicker.start = this.createStartDate;
    this.datepicker.end = this.createEndDate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseOrderFollowPage');
    this.sendPurchaseOrderFollowRequest(this.currentPage,null);
  }

//当前页面的开始时间选择点击了确定
startDateSelected(startDate:string){
  //首先判断开始时间有没有发生变化
  if(this.createStartDate == startDate){ //开始时间没有发生变化，什么都不做
    return;
  }
  //时间发生了变化，需要更新筛选条件时间参数，并刷新列表
  this.createStartDate = startDate;
  this.condition.createStartDate = startDate;
  this.sendPurchaseOrderFollowRequest(this.currentPage,null);
}

//当前页面的时间控件选择点击了确定
endDateSelected(endDate:string){
  //首先判断结束时间有没有发生变化
  if(this.createEndDate == endDate){ //结束时间没有发生变化，什么都不做
    return;
  }
  //时间发生了变化，需要更新筛选条件时间参数，并刷新列表
  this.createEndDate = endDate;
  this.condition.createEndDate = endDate;
  this.sendPurchaseOrderFollowRequest(this.currentPage,null);
}

  choosebtnClicked(){
    console.log("筛选");
    this.navCtrl.push("IhpConditionChoosePage", { condition: JSON.parse(JSON.stringify(this.condition)), selectionCallback:  
      (condition) => {
      if (typeof (condition) != 'undefined') {
        this.condition = condition;
        this.createStartDate = this.condition.createStartDate;
        this.createEndDate = this.condition.createEndDate;
        this.datepicker.start = this.createStartDate;
        this.datepicker.end = this.createEndDate;
        this.sendPurchaseOrderFollowRequest(1, null);
        // this.toastShort("收到回传数据:" + this.condition.createStartDate);
        console.log("收到回传数据:" + this.condition.createStartDate);
        //todo
      } else {
        console.log("回传数据出错");
      }
    } });  }

  //net 网络请求
  doRefresh(refresher){
    //刷新
    console.log("下拉刷新");
    this.sendPurchaseOrderFollowRequest(1,refresher);
  }
  doInfinite(refresher){
    console.log("上拉加载更多");
    this.sendPurchaseOrderFollowRequest(this.currentPage++,refresher);
  }

  sendPurchaseOrderFollowRequest(page:any,refresher:any){
    this.createStartDate = this.datepicker.start;
    this.createEndDate = this.datepicker.end;
    let params = 
    {
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "otherMerchantId":this.condition.provider.merchantId,
      "createStartDate": this.createStartDate,
      "createEndDate": this.createEndDate,
      "orderClass":"00",
      "pageNum": "" + page,
      "pageSize": this.pageSize + "",
      "orderProdList":this.condition.orderProdList,
      "ACTION_NAME": "orderFacadeAPI|queryOrderTrackList"
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



      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
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
