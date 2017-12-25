import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the InventorySelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-select',
  templateUrl: 'inventory-select.html',
})
export class InventorySelectPage  extends BasePage{


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
storage={whseId:"",whseName:"选择仓库"};//仓库
  constructor(public net:TyNetworkServiceProvider,public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl,navParams,mtoast);
    let condition = navParams.data.condition;
     //填充供应商和仓库选择条件
     this.storage =  condition.storage;
     this.bigCate = condition.bigCate;
     this.smallCate = condition.smallCate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventorySelectPage');
  }

  storageClicked(){
    console.log("仓库按钮点击");
    this.navCtrl.push("PoConditionChooseStoragePage",{callback:storage=>{
      if (typeof(storage) != 'undefined'){
        // this.storage = storage;
        this.storage.whseId = storage.warehouseId;
        this.storage.whseName = storage.warehouseName;
        // console.log("收到回传数据:"+this.storage.name);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
    
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
  bigClicked(){
    console.log("大类点击");
    this.sendCateListRequest();
  }

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


  //充值按钮点击
  resetClick(){
    //重置
   this.storage={whseId:"",whseName:"选择仓库"};
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
    if (this.navParams.data.callback != null) {
      this.navCtrl.pop();
      this.navParams.data.callback(condition);
    }
  }

}
