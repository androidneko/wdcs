import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the SalesOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-order-detail',
  templateUrl: 'sales-order-detail.html',
})
export class SalesOrderDetailPage extends BasePage {
  item:any={};
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,private net:TyNetworkServiceProvider,public device:DeviceIntefaceServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
    if (navParams.data.item !=null) {
      this.item = navParams.data.item;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderDetailPage');
  }
  oprationClicked(){
    //操作
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
            this.navCtrl.push("SalesOrderChangePage",{item:this.item,callback:(objItem)=>{
                this.item = objItem;
            }});
          }
        },
        {
          text: '删除',
          role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
            let alert = this.alertCtrl.create({
              message: '确定要删除该销售订单？',
              
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
  createOrderClick(){
    console.log("生成收款订单");
    this.navCtrl.push("AddReceiptPage");
  }
  outClick(){
    console.log("出库");
    if(this.item.stockStatus=="02")
    {

      this.outClick2();
    }else{
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '全部出库',
            cssClass:"actionSheetClass_balck",
            handler: () => {
              console.log('Destructive clicked');
              this.shipmentAll();
            }
          },
          {
            text: '分批出库',
            cssClass:"actionSheetClass_balck",
            handler: () => {
              console.log('Archive clicked');
              this.navCtrl.push("SalesOrderOutPage",{item:this.item,callback:(msg)=>{
                //页面返回数据
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
        ]
      });
   
      actionSheet.present();
    }
    

  }


  outClick2(){
    console.log("出库");
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '全部出库',
          cssClass:"actionSheetClass_balck",
          handler: () => {
            console.log('Destructive clicked');
            this.shipmentAll();
          }
        },
        {
          text: '取消出库',
          cssClass:"actionSheetClass_balck",
          handler: () => {
            console.log('Destructive clicked');
           
          }
        },
        {
          text: '分批出库',
          cssClass:"actionSheetClass_balck",
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push("SalesOrderOutPage",{item:this.item,callback:(msg)=>{
              //页面返回数据
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
      ]
    });
 
    actionSheet.present();

  }


  /**
   * ；联系客户
   */
  contactClick()
  {
    this.sendProviderDetail();
  }


  sendProviderDetail(){
    let params =
    {
      "merInfo":{
        merchantId:AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        targetMerchantId:this.item.merchantId
      },
      "type":"1",
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


  /**
   * 删除订单
   */
  deleteOrder(){
    if (this.item.stockStatus!="00"||this.item.payStatus!="00") {
      this.toast("已入库或已付款订单不能删除或修改!");
      return;
    }
    let params = 
    {
        "orderId":this.item.orderId,
        "ownedMerchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "ACTION_NAME":"orderFacadeAPI|deleteOrder",
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        //this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        var callback = this.navParams.get("callback");
        callback("refresh");
        this.toast(obj.ACTION_RETURN_MESSAGE);
        this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }


  /**
   * 全部出库
   */
  shipmentAll()
  {
    let params = 
    {
      "dataInfo": {
        "businessId":this.item.orderId,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      },       
      "ACTION_NAME":"storageFacade|bizAllStorage",
    };

    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        //this.navCtrl.push("PurchaseOrderDetailPage",{item:obj.ACTION_INFO});
        // var callback = this.navParams.get("callback");
        // callback("refresh");
        this.toast(obj.ACTION_RETURN_MESSAGE);
        // this.navCtrl.pop();
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);

  }


}
