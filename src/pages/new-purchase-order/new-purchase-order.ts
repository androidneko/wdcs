import { AppServiceProvider } from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the NewPurchaseOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-purchase-order',
  templateUrl: 'new-purchase-order.html',
})
export class NewPurchaseOrderPage extends BasePage{
  
  condition={
    merchant:{merchantId:"",merName:"选择供应商"},
    whse:{whseId:"",whseName:"请选择仓库"},
    createDate:"",
    orderProdList:[],
    totalAtm:0,
    remark:""
  };
 

  constructor(public alertCtrl:AlertController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
   
  }
  emptyProduct(){
    this.condition.orderProdList=[];
    this.condition.totalAtm = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPurchaseOrderPage');
  }
  providerClicked(){
    console.log('选择供应商');
     this.navCtrl.push("PoConditionChooseProviderPage",{type:"choose",callback:data=>{
      this.condition.merchant=data;
      // this.condition.orderProdList=[];
    }});
  }
  storageClicked(){
    console.log('选择仓库');
  
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(item)=>{
      this.condition.whse.whseId = item.warehouseId;
      this.condition.whse.whseName = item.warehouseName;
    }});
  }
  chooseProduct(){
    console.log('选择商品');
    // if(this.condition.merchant.merchantId==""){
    //   this.toast("请先选择供应商");
    //   return;
    // }
    this.navCtrl.push("PoConditionChooseProductPage",{
      // merchant:JSON.parse(JSON.stringify(this.condition.merchant)),
      callback:(data)=>{
        this.condition.totalAtm=data.totalAmt;
        this.condition.orderProdList = data.orderProdList;
      }
    });
  }
  resetClicked(){
    console.log('重置按钮点击');
     this.condition= 
     {
      merchant:{merchantId:"",merName:"选择供应商"},
      whse:{whseId:"",whseName:"请选择仓库"},
      createDate:"",
      orderProdList:[],
      totalAtm:0,
      remark:""
    };

  }
  comfirmClicked(){
    console.log('确定按钮点击');
    if (this.condition.merchant.merchantId=="") {
      this.toast("请选择供应商");
        return;
    }
    if (this.condition.orderProdList.length==0) {
      this.toast("请选择商品");
      return;
    }
    this.sendRequest();
  }

  //net
  toDecimal2(x) { 
    var f = parseFloat(x); 
    if (isNaN(f)) { 
      return false; 
    } 
     f = Math.round(x*100)/100; 
    var s = f.toString(); 
    var rs = s.indexOf('.'); 
    if (rs < 0) { 
      rs = s.length; 
      s += '.'; 
    } 
    while (s.length <= rs + 2) { 
      s += '0'; 
    } 
    return s; 
  } 
  sendRequest(){
    var totalAmt = 0.00;
    for (let index = 0; index < this.condition.orderProdList.length; index++) {
      const element = this.condition.orderProdList[index];
      totalAmt = parseFloat(element.productPrice)*parseFloat(element.productNum)+totalAmt;
    }
    let whseName = "";
    if (this.condition.whse.whseId != "") {
       whseName = this.condition.whse.whseName;
    }
    let params = 
    {
        "order":{
          "buyerMerchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          "sellerMerchantId":this.condition.merchant.merchantId,
          "orderClass":"00",
          "totalAmt": this.toDecimal2(totalAmt),
          "payAmt":  this.toDecimal2(totalAmt),
          "whseId": this.condition.whse.whseId,
          "whseName": whseName,
          "createDate":this.condition.createDate,
          "buyerId": AppServiceProvider.getInstance().userinfo.USERID,
          "remark":this.condition.remark,
        },
        "ACTION_NAME":"orderFacadeAPI|submitOrder",
        "orderProdList":this.condition.orderProdList
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        // this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        this.popDialog(obj.ACTION_INFO);
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }
  popDialog(item:any)
  {
    let alert = this.alertCtrl.create({
      message: '新增订单成功',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: '返回',
          role: 'cancel',
          cssClass: "alertDialogClass_balck",
          handler: () => {
            // console.log('Cancel clicked');
            if (this.navParams.data.callback!=null) {
              this.navParams.data.callback();
            }
            this.navCtrl.pop();
          }
        },
        {
          text: '继续添加',
          cssClass:"alertDialogClass_normal",
          handler: () => {
            console.log('Buy clicked');
            this.condition= 
            {
             merchant:{merchantId:"",merName:"选择供应商"},
             whse:{whseId:"",whseName:"请选择仓库"},
             createDate:"",
             orderProdList:[],
             totalAtm:0,
             remark:""
           };
          }
        }
      ]
    });
    alert.present();
  }
}
