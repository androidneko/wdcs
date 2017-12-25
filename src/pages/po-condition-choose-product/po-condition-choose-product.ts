import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the PoConditionChooseProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-po-condition-choose-product',
  templateUrl: 'po-condition-choose-product.html',
})
export class PoConditionChooseProductPage extends BasePage {
  total:any=-1;
  currentPage:any=1;
  pageSize:any = 20;
  searchContent:String="";
  merchantId:String="";
  dataArray:Array<any>=[];
    selectTitle:any = "全选";
    totalAtm:any = 0;
    condition = 
    {
      status:"",
      bigCate:  {
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
      },
      smallCate:
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
     }
    };

    type:string="";

  constructor(public device:DeviceIntefaceServiceProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public net:TyNetworkServiceProvider) {
    super(navCtrl,navParams,toastCtrl);
    // if (navParams.data.merchant.merchantId!=null&&navParams.data.merchant.merchantId.length>0) {
    //   this.merchantId=navParams.data.merchant.merchantId;
    // }
      this.type = this.navParams.get("type");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoConditionChooseProductPage');
    this.sendProductRequest(1,null,true);
  }
  itemClicked(item){
    console.log("item clicked");
    
  }
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      this.sendProductRequest(1,null,true); 
      return false;
    }
  }
  changeTotal(){
    //item 点击确认按钮
    var total=0;
   for (let index = 0; index < this.dataArray.length; index++) {
     let element = this.dataArray[index];
     if (element.isSelected == true) {
       total = element.productNum * parseFloat(element.productPrice)+total;
     }
   }
   this.totalAtm = total;
  }
  rightBtnClicked(){
    console.log("筛选");
    this.navCtrl.push("ProductCategoryChoosePage",{condition:JSON.parse(JSON.stringify(this.condition)),callback:(msg)=>{
      this.condition=msg;
      this.sendProductRequest(1,null,true);
    }});
  }
  allSelectedBtnCliked(){
    console.log("全选按钮");
    if(this.selectTitle == "全选"){
      this.selectTitle="取消";
      var total=0;
      for (let index = 0; index < this.dataArray.length; index++) {
        const element = this.dataArray[index];
        element.isSelected = true;
        total = element.productNum * parseFloat(element.productPrice)+total;
      }
     
      this.totalAtm = total;
    }else{
      this.selectTitle="全选";
      for (let index = 0; index < this.dataArray.length; index++) {
        const element = this.dataArray[index];
        element.isSelected = false;
      }
      this.totalAtm=0;
    }
  }
  QRScanBtnClicked(){
    this.device.push("searchCode","",msg =>{
      this.sendRrouductDetail(msg);
      // this.navCtrl.push("QrbCodeResultProductDetailPage");
    },err => {
      this.toast(err);
      console.log("push failed");
    });
    

  }
  comfirm(){
    console.log("确定");
    var selectedArray=[];
    for (let index = 0; index < this.dataArray.length; index++) {
      let element = this.dataArray[index];
        if (element.isSelected==true) {
           selectedArray.push(element);
        }
    }
    if (selectedArray.length == 0) {
      this.toast("请选择商品");
      return;
    }
    if (this.navParams.data.callback!=null) {
      this.navParams.data.callback({
        totalAmt:this.totalAtm,
        orderProdList:selectedArray
      });
      this.navCtrl.pop();
    }
    
  }

  //net 网络请求
  doRefresh(refresher){
    //刷新
    console.log("上拉加载更多");
    this.sendProductRequest(1,refresher,false);
    
  }
  doInfinite(refresher){

    this.sendProductRequest(this.currentPage+1,refresher,false);
  }
  sendProductRequest(page:any,refresher:any,isShowLoading:boolean){
    let bigCategory =this.condition.bigCate.customCategoryId;
    let littleCategory = this.condition.smallCate.customCategoryId;
    let params = 
    {
      "dataInfo":{
        "likeStr":this.searchContent,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        "bigCategory":bigCategory,
        "littleCategory":littleCategory,
        "customLevelId":"",
        "status":this.condition.status//0商户下架1商户上架2运营下架
      },
      "start":  page==1?0:this.dataArray.length,
      "length": this.pageSize,
      "ACTION_NAME":"productFacade|findProductPage"
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
          element.productName = element.proName;
          element.productCode = element.proCode;
          element.productNum=1;
          if(this.type =="sales")
          {
            element.productPrice=element.advicePrice;
            
          }else
          {
            element.productPrice=element.wholesalePrice;
          }
         
          element.productUnit = element.proUnit;
          element.totalAmt = 0;
          element.bigcate = element.bigCategory;
          element.smallcate = element.littleCategory;
          element.productClass = element.littleCategory!=null&& element.littleCategory.length>0?element.littleCategory:element.bigCategory;
          element.isSelected = false;
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
      this.total=0;
      if(refresher!=null){
          refresher.complete();
        }
    },isShowLoading);
  }
  sendRrouductDetail(productId){

    let params = 
    {
      "dataInfo":{
        "productId":productId,
        "merchantId":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      },
      
      "ACTION_NAME":"productFacade|findProduct"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed) {
        if (obj.ACTION_INFO.data!=null&&obj.ACTION_INFO.data!="") {
          obj.ACTION_INFO.data.productName = obj.ACTION_INFO.data.proName;
          obj.ACTION_INFO.data.productCode = obj.ACTION_INFO.data.proCode;
          obj.ACTION_INFO.data.productNum=1;
          if(this.type =="sales")
          {
            obj.ACTION_INFO.data.productPrice=  obj.ACTION_INFO.data.advicePrice; 
          }else{
            obj.ACTION_INFO.data.productPrice=  obj.ACTION_INFO.data.wholesalePrice;
          }
         
          obj.ACTION_INFO.data.productUnit = obj.ACTION_INFO.data.proUnit;
          obj.ACTION_INFO.data.totalAmt = 0;
          obj.ACTION_INFO.data.bigcate = obj.ACTION_INFO.data.bigCategory;
          obj.ACTION_INFO.data.smallcate = obj.ACTION_INFO.data.littleCategory;
          obj.ACTION_INFO.productClass = obj.ACTION_INFO.data.littleCategory!=null&& obj.ACTION_INFO.data.littleCategory.length>0?obj.ACTION_INFO.data.littleCategory:obj.ACTION_INFO.data.bigCategory;
          obj.ACTION_INFO.data.isSelected = false;
          this.navCtrl.push("QrbCodeResultProductDetailPage",{
            item:obj.ACTION_INFO.data,
            callback:(msg)=>{
              let selectedArray = [];
              selectedArray.push(msg);
              this.totalAtm = msg.productNum*msg.productPrice;
              if (this.navParams.data.callback!=null) {
                this.navParams.data.callback({
                  totalAmt:this.totalAtm,
                  orderProdList:selectedArray
                });
                this.navCtrl.pop();
              }
            }
          });
        }

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
    

    },error => {
      this.toast(error);
   
    },true);
  }
}
