import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the AddSalesOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-sales-order',
  templateUrl: 'add-sales-order.html',
})
export class AddSalesOrderPage extends BasePage{
  // customerName: String = "选择客户";
  // warehouseName: String = "选择仓库";
  // reMark: String = "";


  condition:any={
    customerItem:{customerId:"",customerName:"选择客户"},
    whse:{whseId:"",whseName:"请选择仓库"},
    createDate:"",
    orderProdList:[],
    remark:""
  };

  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSalesOrderPage');
  }


  emptyProduct(){
    //清空商品
    this.condition.orderProdList=[];
    this.condition.totalAtm = 0;
  }
  providerClicked() {
    console.log('选择客户');
    this.navCtrl.push("MyClientsPage",{tag:"choose",callback:client=>{
      if (typeof(client) != 'undefined'){
      
        this.condition.customerItem.customerName = client.merName;
        this.condition.customerItem.customerId = client.merchantId;
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }
  storageClicked() {
    console.log('选择仓库');
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(item)=>{
      this.condition.whse.whseId = item.warehouseId;
      this.condition.whse.whseName = item.warehouseName;
    }});
  }
  chooseProduct() {
    console.log('选择商品');
    this.navCtrl.push("PoConditionChooseProductPage",{ type:"sales",
      callback:(data)=>{
        this.condition.totalAtm=data.totalAmt;
        this.condition.orderProdList = data.orderProdList;
      }
    });
  }


  reset() {
    console.log('重置');

    this.condition={
      customerItem:{customerId:"",customerName:"选择客户"},
      whse:{whseId:"",whseName:"请选择仓库"},
      createDate:"",
      orderProdList:[],
      remark:""
    };
    // let alert = this.alertCtrl.create({
    //   message: '确定重置？',
    //   enableBackdropDismiss:false,
    //   buttons: [
    //     {
    //       text: '取消',
    //       role: 'cancel',
    //       cssClass: "alertDialogClass_balck",
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: '确定',
    //       cssClass:"alertDialogClass_normal",
    //       handler: () => {
    //         console.log('重置按钮点击');
    //         this.condition={
    //           customerItem:{customerId:"",customerName:"选择客户"},
    //           whse:{whseId:"",whseName:"请选择仓库"},
    //           createDate:"",
    //           orderProdList:[],
    //           remark:""
    //         };
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  comfirm() {
    console.log('确定');
    if (this.condition.customerItem.customerId=="") {
      this.toast("请选择客户");
        return;
    }
    if (this.condition.orderProdList.length==0) {
      this.toast("请选择商品");
      return;
    }
    this.sendRequest();
  
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
          console.log('Cancel clicked');
          let callback = this.navParams.get("callback")
          if(callback!=null)
          {
            callback("refresh");
          }
          this.navCtrl.pop();
        }
      },
      {
        text: '继续添加',
        cssClass:"alertDialogClass_normal",
        handler: () => {
          console.log('Buy clicked');
          this.condition={
            customerItem:{customerId:"",customerName:"选择客户"},
            whse:{whseId:"",whseName:"请选择仓库"},
            createDate:"",
            orderProdList:[],
            remark:""
          };
        }
      }
    ]
  });
  alert.present();
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
    let whseName = ""
    if (this.condition.whse.whseId != "") {
       whseName = this.condition.whse.whseName;
    }
    let params = 
    {
      "order":
      {
        "buyerMerchantId": this.condition.customerItem.customerId,
        "sellerMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "orderClass":"01",
        "totalAmt": this.toDecimal2(totalAmt),
        "payAmt": this.toDecimal2(totalAmt),
        "whseId": this.condition.whse.whseId,
        "whseName": whseName,
        "createDate":this.condition.createDate,
        "buyerId": AppServiceProvider.getInstance().userinfo.USERID,
        "remark":this.condition.remark
      },
      "ACTION_NAME":"orderFacadeAPI|submitOrder",
      "orderProdList":this.condition.orderProdList
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        //this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        this.popDialog(obj.ACTION_INFO);
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }

}


