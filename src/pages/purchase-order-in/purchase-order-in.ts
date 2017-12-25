import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the PurchaseOrderInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-order-in',
  templateUrl: 'purchase-order-in.html',
})
export class PurchaseOrderInPage extends BasePage{
  item:any=[];
  count:any=1;
  str:string="";
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
    if (navParams.data.item !=null) {
      this.str = JSON.stringify(navParams.data.item);
      this.item = JSON.parse(this.str);
      this.item.orderProdlist.forEach(element => {
          // element.productNum = 0;
          element.storageQuantity=0;
          element.unShipmentNum = element.productNum-element.stockNum;
          element.storagebinId="";
          element.storagebinName="暂存位";
          element.warehouseId=this.item.whseId
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesOrderOutPage');
  }
  warehouseClicked()
  {
    //选择仓库
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:storage=>{
      if (typeof(storage) != 'undefined'){
        // this.storage = storage;
        this.item.whseId = storage.warehouseId;
        this.item.whseName = storage.warehouseName;
        // console.log("收到回传数据:"+this.storage.name);
        //todo
        this.item.orderProdlist.forEach(element => {
          element.storagebinId="";
          element.storagebinName="暂存位";
      });
      }else {
        console.log("回传数据出错");
      }
    }});
  }
  valuechange(mitem)
  {
    this.changeItem(mitem);
  }


 

  changeItem(mitem)
  {
    this.item.orderProdlist.forEach(element => {
      if(element.productId==mitem.productId)
      {
        element.productNum = mitem.productNum;
        return;
      }
    });
   
  }
  stockClicked(item){
    this.navCtrl.push("StockLocationPage",{storage:JSON.parse(JSON.stringify(this.item)),callback:(msg)=>{
      item.storagebinId=msg.storagebinId;
      item.storagebinName = msg.storagebinName;
    }});
  }

  saveClicked()
  {
    let num :number=0;
    console.log("保存")
    this.item.orderProdlist.forEach(element => {
        num +=element.productNum;
    });
    if(num<=0)
    {
      this.toast("入库数量不对");
      return;
    }
    //
    this.sendPruductIn();
  }
  sendPruductIn(){
    console.log("全部入库")
    let params = 
    {
        "dataInfo":{
          "sourcesId": this.item.orderId,
          "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
          "storageList": this.item.orderProdlist
        } ,
        "ACTION_NAME":"storageFacade|bizBatStorage"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
          this.toast("入库成功");
        
          if (this.navParams.data.callback != null) {
            this.navParams.data.callback("refresh");
          }
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  
  }


}
