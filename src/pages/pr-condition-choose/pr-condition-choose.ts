import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the PrConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-pr-condition-choose',
  templateUrl: 'pr-condition-choose.html',
})
export class PrConditionChoosePage extends BasePage{
  // providerUI:any = {name: "选择供应商"};
  // storageUI:any = {name: "选择仓库"};

  storage={whseId:"",whseName:"选择仓库"};//仓库
  provider={merchantId:"",merName:"选择供应商"};//供应商
  createStartDate:String = "";//开始时间
  createEndDate:String = "";//结束时间
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

  constructor(public net:TyNetworkServiceProvider,public mtoast:ToastController,public navCtrl: NavController, public navParams: NavParams,private datePipe:TydatePipe) {
    super(navCtrl,navParams,mtoast);
    let condition = navParams.data.condition;
    //填充时间选择条件
    if(condition.createStartDate==null||condition.createStartDate.length==0){
      this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
    }else{
      this.createStartDate = condition.createStartDate;
    }
    if(condition.createEndDate==null||condition.createEndDate.length==0){
      this.createEndDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    }else{
      this.createEndDate = condition.createEndDate;
    }
    //填充供应商和仓库选择条件
    this.storage =  condition.storage;
    this.provider = condition.provider;
    this.bigCate = condition.bigCate;
    this.smallCate = condition.smallCate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrConditionChoosePage');
  }

  //二次跳转选择条件，例如选择供应商或仓库
  //选择供应商回调
  providersClicked(){
    console.log("PrConditionChoosePage providersClicked");
    this.navCtrl.push("PoConditionChooseProviderPage",{type:"choose",callback:provider=>{
      if (typeof(provider) != 'undefined'){
        this.provider = provider;
        // console.log("收到回传数据:"+this.provider.merName);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //选择仓库回调
  storageClicked(){
    console.log("PrConditionChoosePage storageClicked");
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

  //选择商品大类回调
  productMainCateClicked(){
    console.log("PrConditionChoosePage productMainCateClicked");
   this.sendCateListRequest();
  }

  //选择商品小类回调
  productSubCateClicked(){
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

   this.provider={merchantId:"",merName:"选择供应商"};
   this.storage={whseId:"",whseName:"选择仓库"};

   this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
   this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
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
    let condition = {provider:this.provider,storage:this.storage,bigCate:this.bigCate,smallCate:this.smallCate,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
    if (this.navParams.data.callback != null) {
      this.navCtrl.pop();
      this.navParams.data.callback(condition);
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
