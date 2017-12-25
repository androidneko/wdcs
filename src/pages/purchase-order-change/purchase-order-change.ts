import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { TydatePipe } from '../../pipes/tydate/tydate';
/**
 * Generated class for the PurchaseOrderChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-purchase-order-change',
  templateUrl: 'purchase-order-change.html',
})
export class PurchaseOrderChangePage extends BasePage {
  
  condition={
    merchant:{merchantId:"",merName:"选择供应商"},
    whse:{whseId:"",whseName:"请选择仓库"},
    createDate:"",
    orderProdList:[],
    totalAtm:0,
    remark:""
  };
  item:any={};
 

  constructor(public alertCtrl:AlertController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider,private datePipe:TydatePipe) {
    super(navCtrl,navParams,toastCtrl);
    this.item = this.navParams.data.item;
    if (this.navParams.data.item!=null) {
      this.condition.merchant.merchantId = this.item.merchantId;
      this.condition.merchant.merName = this.item.merchantName;
      this.condition.whse.whseId = this.item.whseId;
      this.condition.whse.whseName = this.item.whseName;
      this.condition.createDate = this.datePipe.transform(this.item.createDate,"yyyy-MM-dd");
      // console.log(this.item.orderProdlist);
      this.condition.orderProdList = this.item.orderProdlist==null? []:this.item.orderProdlist;
      this.condition.totalAtm = this.item.totalAmt;
      this.condition.remark = this.item.remark;
    }
    
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
      merchant:JSON.parse(JSON.stringify(this.condition.merchant)),
      callback:(data)=>{
        this.condition.totalAtm=data.totalAmt;
        this.condition.orderProdList = data.orderProdList;
      }
    });
  }
  resetClicked(){
    console.log('重置按钮点击');
    this.condition.merchant.merchantId = this.item.merchantId;
    this.condition.merchant.merName = this.item.merchantName;
    this.condition.whse.whseId = this.item.whseId;
    this.condition.whse.whseName = this.item.whseName;
    this.condition.createDate = this.datePipe.transform(this.item.createDate,"yyyy-MM-dd");
    // console.log(this.item.orderProdlist);
    this.condition.orderProdList = this.item.orderProdlist==null? []:this.item.orderProdlist;
    this.condition.totalAtm = this.item.totalAmt;
    this.condition.remark = this.item.remark;
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
      element.orderId = this.item.orderId;
      totalAmt = parseFloat(element.productPrice)*parseFloat(element.productNum)+totalAmt;
    }
    let whseName = ""
    if (this.condition.whse.whseId != "") {
       whseName = this.condition.whse.whseName;
    }
    let params = 
    {
        "order":{
          "orderId":this.item.orderId,
          "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
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
        "ACTION_NAME":"orderFacadeAPI|updateOrder",
        "orderProdList":this.condition.orderProdList
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        // this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        // this.popDialog(obj.ACTION_INFO);
        this.item.merchantId=this.condition.merchant.merchantId;
        this.item.merchantName=this.condition.merchant.merName;
        this.item.whseId=this.condition.whse.whseId;
        this.item.whseName = this.condition.whse.whseName;
        this.item.createDate=this.condition.createDate;
        this.item.orderProdlist=this.condition.orderProdList==null?[]:this.condition.orderProdList;
        this.item.totalAmt=totalAmt;
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback("refresh");
        }
        this.toast("修改成功");
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
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
