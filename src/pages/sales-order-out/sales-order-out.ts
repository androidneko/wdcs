import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the SalesOrderOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-order-out',
  templateUrl: 'sales-order-out.html',
})
export class SalesOrderOutPage extends BasePage{
  item:any=[];
  count:any=1;
  str:string="";
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
    if (navParams.data.item !=null) {
      this.str = JSON.stringify(navParams.data.item);
      this.item = JSON.parse(this.str);
      try {
        this.item.orderProdlist.forEach(element => {
          element.storageQuantity = 0;
          element.unShipmentNum = element.productNum - element.stockNum;
          element.storagebinId="";
          element.storagebinName="暂存位";
          element.warehouseId=this.item.whseId
        });
      } catch (error) {
        console.log(error);
      }
   
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderOutPage');
  }
  warehouseClicked()
  {
    //选择仓库
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:(storage)=>{

      if (typeof(storage) != 'undefined'){
        // this.storage = storage;
        this.item.whseId = storage.warehouseId;
        this.item.whseName = storage.warehouseName;
        // console.log("收到回传数据:"+this.storage.name);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }
  valuechange(mitem)
  {
    this.changeItem(mitem);
  }
  stockClicked(item){

    if(this.item.whseId==null|| this.item.whseId=="")
    {
      this.toast("请选择仓库");
      return;
    }

    this.navCtrl.push("StockLocationPage",{storage:JSON.parse(JSON.stringify(this.item)),callback:(msg)=>{
      item.storagebinId=msg.storagebinId;
      item.storagebinName = msg.storagebinName;
    }});
  }

 

  changeItem(mitem)
  {
    this.item.orderProdlist.forEach(element => {
      if(element.productId==mitem.productId)
      {
        //element.productNum = mitem.productNum;
        element.storageQuantity = mitem.storageQuantity;
        return;
      }
    });
   
  }


  saveClicked()
  {
    let num :number=0;
    console.log("保存")
    this.item.orderProdlist.forEach(element => {
        num +=element.storageQuantity;
    });
    if(num<=0)
    {
      this.toast("出库数量不对");
      return;
    }
    this.sendRequest();
  }

  sendRequest()
  {
    let params = 
    {
      "dataInfo": {
        "businessId":this.item.orderId,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,

        "storageList": this.item.orderProdlist
          
      },       
      "ACTION_NAME":"storageFacade|bizBatStorage",
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
