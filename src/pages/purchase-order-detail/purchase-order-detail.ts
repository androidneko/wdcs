import { DeviceIntefaceServiceProvider } from './../../providers/device-inteface-service/device-inteface-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the PurchaseOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-order-detail',
  templateUrl: 'purchase-order-detail.html',
})
export class PurchaseOrderDetailPage extends BasePage {
   item:any={};
   superItem:any={};
  constructor(public device:DeviceIntefaceServiceProvider,public tostCtrl:ToastController,public net:TyNetworkServiceProvider,public actionSheetCtrl:ActionSheetController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl,navParams,tostCtrl);
    if (navParams.data.item !=null) {
      this.item = navParams.data.item;
      this.superItem = navParams.data.item;
    }
  }
  contactClick(){
    
    // if (condition) {
    //   return;
    // }
    this.sendProviderDetail();
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseOrderDetailPage');
  }
  sendProviderDetail(){
    let params =
    {
      "merInfo":{
        merchantId:AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        targetMerchantId:this.item.merchantId
      },
      "type":"0",
      "ACTION_NAME":"merMangementService|viewStreamP"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        let merContactList = obj.ACTION_INFO.merContactList;
        if (merContactList==null || merContactList.length ==0) {
          this.toast("暂无默认联系方式");
        }else{
          for (let index = 0; index < merContactList.length; index++) {
            const element = merContactList[index];
            if (element.defaultOrNot=="1") {
              if (element.telNo!=null&&element.telNo.length>0) {
                this.call(element);
              }
                break;
            }
            
          }
        }
        

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
    
  }

  call(contact){
    let alert = this.alertCtrl.create({
      title:contact.contactName,
      message: contact.telNo,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass:"alertDialogClass_balck",
          handler: () => {
            console.log('Cancel clicked');

          }
        },
        {
          text: '立即联系',
          cssClass:"alertDialogClass_normal",
          handler: () => {
            console.log('Buy clicked');
            this.callPhone(contact.telNo);
          }
        }
      ]
    });
    alert.present();
  }

  callPhone(num)
  {
    this.device.push("telephone",num,msg =>{
      console.log("push success");
    },err => {
      this.toast(err);
      console.log("push failed");
    });
  }

  oprationClicked(){
    console.log('oprationClicked ');
  let actionSheet = this.actionSheetCtrl.create({
    buttons: [
      {
        text: '修改',
        cssClass:"actionSheetClass_balck",

        handler: () => {
          console.log('Destructive clicked');
          if (this.item.stockStatus!="00"||this.item.payStatus!="00") {
            this.toast("已入库或已付款订单不能删除或修改!");
            return;
          }
          this.navCtrl.push("PurchaseOrderChangePage",{item:JSON.parse(JSON.stringify(this.item)),callback:(objItem)=>{
            
            if (objItem=="refresh") {
              if (this.navParams.data.callback!=null) {
                this.navParams.data.callback("refresh")
              }
            }
          }});
        }
      },
      {
        text: '删除',
        role: 'destructive',
        handler: () => {
          console.log('Archive clicked');
          let alert = this.alertCtrl.create({
            message: '确定要删除该进货订单？',
            
            buttons: [
              {
                text: '取消',
                cssClass:"alertDialogClass_balck",
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
      
                }
              },
              {
                text: '确定',
                cssClass:"alertDialogClass_normal",
                handler: () => {
                  console.log('Buy clicked');

                  this.deleteOrder();
                }
              }
            ]
          });
          alert.present();
        }
      },
      {
        text: '取消',
        role: 'cancel',
        cssClass:"actionSheetClass_balck",
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

   actionSheet.present();
  }
  deleteOrder(){
    if (this.item.stockStatus!="00"||this.item.payStatus!="00") {
      this.toast("已入库或已付款订单不能删除或修改!");
      return;
    }
    let params = 
    {
        "orderId": this.item.orderId,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "ACTION_NAME":"orderFacadeAPI|deleteOrder",
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
    
        this.toast("删除订单成功");
        if (this.navParams.data.callback!=null) 
        {
          this.navParams.data.callback("refresh");
        }
        this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }
  payClick(){
    console.log("付款");

    this.navCtrl.push("AddPayOrderPage",{
      item:this.item
    });
  }
  storageClick(){
    console.log("入库");

    let btns = [
      {
        text: '全部入库',
        cssClass:"actionSheetClass_balck",
        handler: () => {
          console.log('Destructive clicked');
          this.sendStoragein();
        }
      },
      {
        text: '分批入库',
        cssClass:"actionSheetClass_balck",
        handler: () => {
          console.log('Archive clicked');
          this.navCtrl.push("PurchaseOrderInPage",{item:this.item,callback:(msg)=>{
            //页面返回数据
            if (msg=="refresh") {
              if (this.navParams.data.callback!=null) {
                this.navParams.data.callback("refresh");
              }
            }
          }});
        }
      },
      {
        text: '取消',
        cssClass:"actionSheetClass_balck",
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];
    if (this.item.stockStatus == "01" ) {
      btns = [
        {
          text: '取消入库',
          cssClass:"actionSheetClass_balck",
          handler: () => {
            console.log('Destructive clicked');
            this.sendCancelStoragein();
          }
        },
        {
          text: '取消',
          cssClass:"actionSheetClass_balck",
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ];
    }
    let actionSheet = this.actionSheetCtrl.create({
      buttons: btns
    });
 
    actionSheet.present();
  }

  //net
  sendStoragein(){
    console.log("全部入库")
    let params = 
    {
        "dataInfo":{
          "sourcesId": this.item.orderId,
          "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID
        },
        "ACTION_NAME":"storageFacade|bizAllStorage"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
          this.toast("入库成功");
        
          if (this.navParams.data.callback != null) {
            this.navParams.data.callback("refresh");
          }
          this.item.stockStatus = "01";
          this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }

  sendCancelStoragein(){
    console.log("取消出库");
    let params = 
    {
        "dataInfo":{
          "sourcesId": this.item.orderId,
          "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID
        },
        "ACTION_NAME":"storageFacade|cancelStorage"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
          this.toast("取消入库成功");
        
          if (this.navParams.data.callback != null) {
            this.navParams.data.callback("refresh");
          }
          this.item.stockStatus = "00";
          this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }

}
