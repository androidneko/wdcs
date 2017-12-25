import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';

/**
 * Generated class for the SrConditionChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [TydatePipe],
  selector: 'page-sr-condition-choose',
  templateUrl: 'sr-condition-choose.html'
})
export class SrConditionChoosePage extends BasePage{
  clientUI:any = {name: "选择客户"};
  storageUI:any = {name: "选择仓库"};
  storage:any = {};//仓库
  client:any = {};//客户
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
    if (condition!=null) {
      this.bigCate = condition.bigCate;
      this.smallCate = condition.smallCate;
      //填充客户和仓库选择条件
      this.storage =  condition.storage;
      this.client = condition.client;
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SrConditionChoosePage');
  }

  //二次跳转选择条件，例如选择客户或仓库
  //选择客户回调
  clientsClicked(){
    console.log("SrConditionChoosePage clientsClicked");
    this.navCtrl.push("MyClientsPage",{tag:"choose",callback:client=>{
      if (typeof(client) != 'undefined'){
        this.client = client;
        this.clientUI.name = client.merName;
        console.log("收到回传数据:"+this.client.merName);
        //todo
      }else {
        console.log("回传数据出错");
      }
    }});
  }

  //选择仓库回调
  storageClicked(){
    console.log("SrConditionChoosePage storageClicked");
    this.navCtrl.push("PoConditionChooseStoragePage",{tag:"SrConditionChoosePage",callback:storage=>{
      if (typeof(storage) != 'undefined'){
        this.storage = storage;
        this.storageUI.name = storage.warehouseName;
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
   this.clientUI.name = "请选择客户";
   this.storageUI.name = "请选择仓库";
   this.client=null;
   this.storage=null;
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
 this.createStartDate = this.datePipe.transform(new Date().setDate(1),"yyyy-MM-dd");
   this.createEndDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }

  //确定按钮点击事件
  comfirm(){
    //确定
    let condition = {client:this.client,storage:this.storage,bigCate:this.bigCate,smallCate:this.smallCate,createStartDate:this.createStartDate,createEndDate:this.createEndDate};
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
