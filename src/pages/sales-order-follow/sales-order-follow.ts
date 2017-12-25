import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { TydatePipe } from '../../pipes/tydate/tydate';

/**
 * Generated class for the SalesOrderFollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-sales-order-follow',
  templateUrl: 'sales-order-follow.html',
})
export class SalesOrderFollowPage extends BasePage{

  createStartDate:String = "";//开始时间
  createEndDate:String = "";//结束时间
  dataArray:Array<any>=[];
  total:number=-1;
  currentPage:number=1;
  pageSize:number = 20;
  condition: any = { client: {}, product: [], createStartDate: "", createEndDate: "" };
  datepicker:any = {start:"",end:""};

  constructor(public mtoast: ToastController, public navCtrl: NavController, public navParams: NavParams, private net: TyNetworkServiceProvider,private datePipe:TydatePipe) {
    super(navCtrl, navParams, mtoast);
    //填充时间选择条件
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
    console.log('ionViewDidLoad SalesOrderFollowPage');
    this.sendSalesOrderFollowRequest(this.currentPage,null);
  }

  choosebtnClicked(){
    console.log("筛选");
    this.navCtrl.push("SofConditionChoosePage", {condition:this.condition,selectionCallback:this.selectionCallback});
  }

  //当前页面的开始时间选择点击了确定
  startDateSelected(startDate:String){
    //首先判断开始时间有没有发生变化
    if(this.createStartDate == startDate){ //开始时间没有发生变化，什么都不做
      return;
    }
    //时间发生了变化，需要更新筛选条件时间参数，并刷新列表
    this.createStartDate = startDate;
    this.condition.createStartDate = startDate;
    this.sendSalesOrderFollowRequest(this.currentPage,null);
  }

  endDateSelected(endDate:String){
    //首先判断结束时间有没有发生变化
    if(this.createEndDate == endDate){ //结束时间没有发生变化，什么都不做
      return;
    }
    //时间发生了变化，需要更新筛选条件时间参数，并刷新列表
    this.createEndDate = endDate;
    this.condition.createEndDate = endDate;
    this.sendSalesOrderFollowRequest(this.currentPage,null);
  }

  //选择条件回调
  selectionCallback = (condition) => {
    if (typeof (condition) != 'undefined') {
      this.condition = condition;
      this.createStartDate = this.condition.createStartDate;
      this.createEndDate = this.condition.createEndDate;
      this.datepicker.start = this.createStartDate;
      this.datepicker.end = this.createEndDate;
      this.sendSalesOrderFollowRequest(1, null);
      console.log("收到回传数据:" + this.condition.createStartDate);
      //todo
    } else {
      console.log("回传数据出错");
    }
  }

  //net 网络请求
  doRefresh(refresher){
    //刷新
    console.log("下拉刷新");
    this.sendSalesOrderFollowRequest(1,refresher);
  }
  doInfinite(refresher){
    console.log("上拉加载更多");
    this.sendSalesOrderFollowRequest(this.currentPage+1,refresher);
  }

  sendSalesOrderFollowRequest(page:any,refresher:any){
    let params = 
    {
      "buyerId":AppServiceProvider.getInstance().userinfo.USERID,
      "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "orderClass":"01", //订单分类 00:进货 01:销货  非空
	    "otherMerchantId": this.condition.client==null?"":this.condition.client.merchantId,
      "createStartDate": this.condition.createStartDate,
      "createEndDate": this.condition.createEndDate,
      "orderProdList":this.condition.product,
      "pageNum": "" + page,
      "pageSize": this.pageSize + "",
      "ACTION_NAME":"orderFacadeAPI|queryOrderTrackList"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if(page==1){
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



      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
      }
    },error => {
      this.toast(error);
      if(refresher!=null){
        refresher.complete();
      }
    },refresher==null);
  }

}
