import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the StockConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-condition-choose',
  templateUrl: 'stock-condition-choose.html',
})
export class StockConditionChoosePage extends BasePage{
  storageUI:any = {name: "选择仓库"};
  storageName:String = "";
  storage:any = {};//仓库
  bigCate= 
  {
      "categoryChild": [],
      "categoryIconUrl": "",
      "createTime": "",
      "createUser": "",
      "customCategoryId": "",
      "customCategoryName": "",
      "customParentId": "",
      "merchantId": "",
      "pkid": "",
      "productLevel": "",
      "state": "",
      "status": ""
  };
  smallCate = 
  {
    "categoryChild": [],
    "categoryIconUrl": "",
    "createTime": "",
    "createUser": "",
    "customCategoryId": "",
    "customCategoryName": "",
    "customParentId": "",
    "merchantId": "",
    "pkid": "",
    "productLevel": "",
    "state": "",
    "status": ""
  };  

  constructor(public net:TyNetworkServiceProvider,public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl,navParams,mtoast);
    let condition = navParams.data.condition;
    //填充商品和仓库选择条件
    if (condition!=null) {
      this.bigCate = condition.bigCate;
      this.smallCate = condition.smallCate;
      //填充客户和仓库选择条件
      this.storage =  condition.storage;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockConditionChoosePage');
  }

  //二次跳转选择条件，例如选择客户或仓库
  //选择仓库回调
  storageClicked(){
    console.log("StockConditionChoosePage storageClicked");
    this.navCtrl.push("PoConditionChooseStoragePage",{tag:"StockConditionChoosePage",callback:storage=>{
      if (typeof(storage) != 'undefined'){
        this.storage = storage;
        this.storageUI.name = this.storage.warehouseName;

        console.log("收到回传数据:"+this.storage.warehouseName);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  bigClicked(){
    console.log("大类点击");
    // this.navCtrl.push("ProductBigcategoryChoosePage");
    this.sendCateListRequest();
  }

  smallClicked(){
    console.log("小类点击");
    if (this.bigCate.customCategoryId==null||this.bigCate.customCategoryId.length==0) {
      this.toast("请先选择大类！");
      return;
    }
    this.navCtrl.push("ProductSmallcategoryChoosePage",{Category:this.bigCate,callback:(msg)=>{
      this.smallCate = msg;
    }});
    
  }

  //充值按钮点击
  resetClick(){
   //重置
   this.storageUI.name = "请选择仓库";
   this.storage={};
   this.bigCate= 
   {
       "categoryChild": [],
       "categoryIconUrl": "",
       "createTime": "",
       "createUser": "",
       "customCategoryId": "",
       "customCategoryName": "",
       "customParentId": "",
       "merchantId": "",
       "pkid": "",
       "productLevel": "",
       "state": "",
       "status": ""
   };
   this.smallCate = 
   {
     "categoryChild": [],
     "categoryIconUrl": "",
     "createTime": "",
     "createUser": "",
     "customCategoryId": "",
     "customCategoryName": "",
     "customParentId": "",
     "merchantId": "",
     "pkid": "", 
     "productLevel": "",
     "state": "",
     "status": ""
    };
  }

  //确定按钮点击事件
  comfirm(){
    //确定
    let condition = {storage:this.storage,bigCate:this.bigCate,smallCate:this.smallCate};
    if (this.navParams.data.selectionCallback != null) {
      this.navCtrl.pop();
      this.navParams.data.selectionCallback(condition);
    }
  }

  //net 
  sendCateListRequest(){
    let params = 
    {
        "dataInfo": {
          "merchantId": AppServiceProvider.getInstance().userinfo.MERCHANT_ID
        },
        "ACTION_NAME":"categoryFacade|findCategory"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
       
        this.navCtrl.push("ProductBigcategoryChoosePage",{Category:obj.ACTION_INFO.Category,callback:(msg)=>{
          this.bigCate = msg;
          this.smallCate = {
             "categoryChild": [],
             "categoryIconUrl": "",
             "createTime": "",
             "createUser": "",
             "customCategoryId": "",
             "customCategoryName": "",
             "customParentId": "",
             "merchantId": "",
             "pkid": "",
             "productLevel": "",
             "state": "",
             "status": ""
           };
        }});
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }
}
