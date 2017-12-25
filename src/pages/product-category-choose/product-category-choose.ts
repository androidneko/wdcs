import { AppServiceProvider } from './../../providers/app-service/app-service';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the ProductCategoryChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-category-choose',
  templateUrl: 'product-category-choose.html',
})
export class ProductCategoryChoosePage extends BasePage {


  status="";
  merchantId:"";
  isShowCheckMark=true;
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

  constructor( public net:TyNetworkServiceProvider,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl,navParams,toastCtrl);
    this.merchantId = this.navParams.data.merchantId;
    if (this.navParams.data.isShowCheckMark!=null) {
      this.isShowCheckMark = this.navParams.data.isShowCheckMark;
    }
    if (this.merchantId==null) {
      this.merchantId = AppServiceProvider.getInstance().userinfo.MERCHANT_ID;
    }
    if (this.navParams.data.condition!=null) {
      this.bigCate = this.navParams.data.condition.bigCate;
      this.smallCate = this.navParams.data.condition.smallCate;
      this.status = this.navParams.data.condition.status;

  
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCategoryChoosePage');
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
 
    // this.navCtrl.push("ProductBigcategoryChoosePage");
    this.sendCateListRequest();
  }
  stookClick(check,status){
    if(check.checked==false){
      check.checked=true;
    }
    this.status=status;
  }
  resetClick(){
   this.status = "";

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
  comfirm(){
    if (this.navParams.data.callback!=null) {
  
      let condition=
      {
        status:this.status,
        bigCate:this.bigCate,
        smallCate:this.smallCate
      };
      this.navParams.data.callback(condition);
    }
    this.navCtrl.pop();
  }

  //net 
  sendCateListRequest(){
    let params = 
    {
        "dataInfo": {
          "merchantId": this.merchantId
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
