import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Select, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the FastPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fast-pay',
  templateUrl: 'fast-pay.html',
})
export class FastPayPage {
  merchantname:String="";
  amount:String="";
  premessage:String="";
  @ViewChild(Select) select:Select;
  order:any;
  merchantArray:Array<any>=[];
  selectMerChant:any;
  orderWay:any;
  constructor(public net:TyNetworkServiceProvider,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastPayPage');
    // let data = this.navParams.data;
    this.supplylist();
  }


 //btn action
  changeVersion(value){
    console.log(value);
    if (this.merchantArray.length>0) {
      
      let item = this.merchantArray[parseInt(value)];
      this.merchantname=item.loginName;
      this.selectMerChant = item;
    }

  }
  labelClicked(){
    console.log("merchant click");
    this.select.open();
  }
  comfirm(){
    console.log('comfirm btncliked');
    if (this.islegal()) {
      this.createOrder();
    }
  }
  islegal():Boolean{
    if(this.selectMerChant == null){
      this.toast("请选择供应商!");
      return false;
    }
    if(this.islegalcheckAmount(this.amount.toString())==false){
      this.toast("请输入正确金额");
      return false;
    }
    if(parseFloat(this.amount.toString())==0){
      this.toast("金额不能为0");
      return false;
    }
    if(this.amount.length==0){
      this.toast("请输入金额");
      return false;
    }
    return true;
  }
  islegalcheckAmount(v):Boolean{
    let a = /^[0-9]*(\.[0-9]{1,2})?$/;
    if(a.test(v)==false){
      return false;
    }
    return true;
  }
  toast(info){
    this.toastCtrl.create({
      message:  info,
      duration: 3000,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }
  //net work
  supplylist(){
    //供应商列表
    let _dc = (new Date()).valueOf()+"";
    let params = {"ACTION_NAME":"SUPPLY_LIST","_dc":_dc,"MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,"page":"1","start":"0","length":"10"};
    this.net.httpPost(AppGlobal.API.test,params,res=>{
      //成功
      let obj = JSON.parse(res);
      if(obj.ACTION_INFO.data!=null&&obj.ACTION_INFO.data.length>0){
        this.merchantArray = obj.ACTION_INFO.data;
        let item = obj.ACTION_INFO.data[0];
        this.merchantname=item.loginName;
        this.selectMerChant = item;
        this.select.setValue("0");
      }else{
        this.toast("暂无供应商");
        this.navCtrl.pop();
      }
     
    },error=>{
      //失败
      this.toast(error);
    },true);
  }
  createOrder(){
    let params={"ACTION_NAME":"INSERT_QUICK_ORDER","USER_ID":AppServiceProvider.getInstance().userinfo.ROLE_ID,"MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,"transMoney":this.amount,"gatheringMoneyRemark":this.premessage};
    this.net.httpPost(AppGlobal.API.test,params,res=>{
      let obj = JSON.parse(res);
      this.order = obj.ACTION_INFO.order;
      this.searchOrdertype();
    },error=>{
      this.toast(error);
    },true); 
  }
  searchOrdertype(){
    let params={"ACTION_NAME":"PAY_ORDER_PRE_APP","MERCHANT_ID":this.order.sellMerchantId,"orderId":this.order.orderId,"businessKey":this.order.orderType};
    this.net.httpPost(AppGlobal.API.test,params,res=>{
      let obj = JSON.parse(res);
      this.orderWay = obj.ACTION_INFO.busiOrderList[0].payChannelList;
      // 跳转订单确认界面
      this.navCtrl.push("OrderPayPage",{
        oder:this.order,
        orderway:this.orderWay,
        oderDetail:obj.ACTION_INFO.busiOrderList[0]
      });
    },error=>{
      this.toast(error);
    },true);
  }
}
