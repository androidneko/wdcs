import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the StockLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-location',
  templateUrl: 'stock-location.html',
})
export class StockLocationPage extends BasePage{

  dataArray:Array<any>=[];
  total:any=-1;
  currentPage:any=0;
  pageSize:any = 20;
  searchContent:String="";
  addFlag:boolean= true;
  deleteFlag:boolean = true;
  storage= {
    "createTime": 1512489600000,
    "createUser": "017112213370",
    "isDefault": "1",
    "merchantId": "20171122133706553015292678169079",
    "pkid": "20",
    "warehouseAddress": "武汉天喻信息",
    "warehouseAdmin": "",
    "warehouseId": "",
    "warehouseName": "",
    "warehouseStatus": "1",
    "warehouseType": "0",
    "whseId":"",
    "whseName":""
};
  constructor(public alertCtrl:AlertController,public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,mtoast);
    if(this.navParams.get("addFlag")!=null)
    {
      this.addFlag = this.navParams.get("addFlag");
    }
    if(this.navParams.get("deleteFlag")!=null)
    {
      this.deleteFlag = this.navParams.get("deleteFlag");
    }
    if (this.navParams.data.storage!=null) {
      this.storage = this.navParams.data.storage;
      if (this.navParams.data.storage.whseId!=null) {
        this.storage.warehouseId = this.navParams.data.storage.whseId;
      }
      if (this.navParams.data.storage.whseName!=null) {
        this.storage.warehouseName = this.navParams.data.storage.whseName;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoConditionChooseStoragePage');
    this.sendOrderRequest(1,null,true);
  }
  addBtnCliked(){
    console.log("添加仓库");
    this.navCtrl.push("NewStockPage",{storage:JSON.parse(JSON.stringify(this.storage)),callback:(msg)=>{
      if (msg=="refresh") {
        this.sendOrderRequest(1,null,true);
      }
    }});
  }

  itemClicked(item){
    if(this.navParams.get("callback"))
    {
     var callback = this.navParams.get("callback")
     callback(item);
     this.navCtrl.pop();
    }
  }

  deleteItem(item,inx)
  {
    console.log("删除")
    let alert = this.alertCtrl.create({
      message: '是否删除该仓库？',
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
          text: '确定',
          cssClass:"alertDialogClass_normal",
          handler: () => {
            console.log('Buy clicked');
            this.deleteWarehouse(item,inx)
           
          }
        }
      ]
    });
    alert.present();

 
  }



  doRefresh(refreshScroll) {
    console.log('下拉刷新');
    this.sendOrderRequest(1,refreshScroll,true);
  }
  doInfinite(infiniteScroll) {
    console.log('上拉加载更多');
    this.sendOrderRequest(this.currentPage+1,infiniteScroll,false);
  }
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendOrderRequest(1,null,true);
      return false;
    }
  }
  sendOrderRequest(page:any,refresher:any,isShowLoading:boolean){
    let params = 
    {

      "dataInfo": {
        "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "likeStr":this.searchContent,
        "warehouseId": this.storage.warehouseId
      },
      "start":  page==1?0:this.dataArray.length,
      "length": this.pageSize,
      "ACTION_NAME":"warehouseFacade|findStoragebin"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if(page==1){
          this.dataArray = [];
        }
        let info = obj.ACTION_INFO;
        let list =  info.data;
        this.total = info.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.dataArray.push(element);
        }
        this.currentPage = page;
      }else{
        this.total=0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if(refresher!=null){
        refresher.complete();
      }
    },error => {
      this.toast(error);
      this.total = 0;
      if(refresher!=null){
          refresher.complete();
        }
    },isShowLoading);
  }

  deleteWarehouse(item,index)
  {
    //暂时这么写 服务端还未提供接口
    let params = 
    {

      "dataInfo": {
        "merchantId": item.merchantId,
        "storagebinId": item.storagebinId
      },
      "ACTION_NAME":"warehouseFacade|delStoragebin"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        this.dataArray.splice(index,1);
        this.total= this.total-1;
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    },error => {
      this.toast(error);
    },true);
  }

}
