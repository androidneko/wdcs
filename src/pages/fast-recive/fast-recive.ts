import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the FastRecivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fast-recive',
  templateUrl: 'fast-recive.html',
})
export class FastRecivePage {
  username:String="";//用户名
  amount:String="";//金额
  premessage:string="";//预留信息
  order:any;//订单信息
  orderWay:any;
  constructor(public device:DeviceIntefaceServiceProvider,public actionSheetCtrl:ActionSheetController,private net:TyNetworkServiceProvider,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastRecivePage');
    this.configdata();
  }
  configdata(){
    this.username = AppServiceProvider.getInstance().userinfo.USER_NAME;

  }
  comfirm(){
    console.log('确认支付');
    if(this.islegal()){
      //选择支付方式等内容
      this.createOrder();
    }
  }
  //legal 判断合法性
  islegal():Boolean{
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
  //net 
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
      this.showCondition();
    },error=>{
      this.toast(error);
    },true);
  }
  showCondition(){
    let btns:Array<any> = [];
    for (var index = 0; index < this.orderWay.length; index++) {
      let element = this.orderWay[index];
      // let mindex = index;
      let param = {
        text:element.payChannelName,
        handler:()=>{
          this.handerCondition(element);
        }
      };
      btns.push(param);
    }
    btns.push({
      text:"取消",
      role:"cancel",
      handler:(element)=>{
        console.log("取消");
      }
    });
    let actionsheet =this.actionSheetCtrl.create({
      title:'请选择支付方式',
      buttons:btns
    });
    actionsheet.present();

  }
  handerCondition(element){
    console.log(element.payChannelName);
    let params = {"ACTION_NAME":"CREATE_BUSI_TRANS_ORDER_FOR_PAY_JSON","MERCHANT_ID":this.order.sellMerchantId,"USER_ID":this.order.userId,"orderId":this.order.orderId,"businessKey":this.order.orderType,"channelType":element.payChannelDetail.channelId,"isDisplayFee":"1","useBalanceFlag":"0","changeAddress":"0","addressId":"","printReceFlag":"undefined","receType":"undefined"};
    this.net.httpPost(AppGlobal.API.test,params,res=>{
      let obj = JSON.parse(res);
      this.device.push("emallPay",JSON.stringify(obj.ACTION_INFO.payJson),msg=>{
        this.toast(msg);
      },error=>{
        this.toast(error);
      });
    },error=>{
      this.toast(error);
    });
  }
}
