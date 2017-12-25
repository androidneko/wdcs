import { DeviceIntefaceServiceProvider } from './../../providers/device-inteface-service/device-inteface-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, LoadingController,Loading } from 'ionic-angular';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage extends BasePage{
  yes:boolean=true;
  no:boolean=false;
  imgArray:Array<any>=["","","","","",""];
  productNum:any = "";
  productName:any="";
  wholesalePrice:any="";
  proUnit:any="";
  advicePrice:any="";
  catedes="请选择商品类别";
  loading:Loading;
  str="";
  icon="";
  barCode="";
  condition = 
  {
    status:"1",
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
  constructor(public net:TyNetworkServiceProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private camera:Camera, private device:DeviceIntefaceServiceProvider,private actionSheet:ActionSheetController) {
    super(navCtrl,navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }
  chooseCodition(){
    console.log("选择类别");
    //,condition:JSON.parse(JSON.stringify(this.condition))
    this.navCtrl.push("ProductCategoryChoosePage",{isShowCheckMark:false,callback:(msg)=>{
      this.condition=msg;
      if (msg.bigCate.customCategoryId!=null&&msg.bigCate.customCategoryId.length>0) {
        let str = msg.bigCate.customCategoryName;
        if (msg.smallCate.customCategoryId!=null&&msg.smallCate.customCategoryId.length>0) {
          str = str+"-"+msg.smallCate.customCategoryName;
        }
        this.catedes = str;
      }
    }});
  }
  yesCheckClicked(event){
    if(event.checked==false){
      event.checked=true;
    }
    this.no = false;
    // return false;
  }
  noCheckClicked(event){
    if(event.checked==false){
      event.checked=true; 
    }
    this.yes=false;
    // return false;
  }
  imgClick(idx){
    //背景点击
   let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true
    };
    var mbuttons = [{
      text:"拍照",
      handler: () => {
        options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImgWithIndex(options,idx);
      }
    },{
      text:"从相册中选择",
      handler: () => {
        options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImgWithIndex(options,idx);
      }
    },{
      text:"取消",
      role: 'destructive',
      handler: () => {
       
      }
    }];
    if (this.imgArray[idx]!=null&&this.imgArray[idx].length>0) {
       mbuttons = [{
        text:"拍照",
        handler: () => {
          options.sourceType = this.camera.PictureSourceType.CAMERA;
          this.getImgWithIndex(options,idx);
        }
      },{
        text:"从相册中选择",
        handler: () => {
          options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          this.getImgWithIndex(options,idx);
        }
      },{
        text:"删除",
        handler: () => {
          this.imgArray[idx]="";
        }
      }
      ,{
        text:"取消",
        role: 'cancel',
        handler: () => {
         
        }
      }];
    }
   let actionSheet = this.actionSheet.create(
     {

      buttons:mbuttons

     });

     actionSheet.present();
  }
  getImgWithIndex(options,idx){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
    
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      for (let index = 0; index <=idx; index++) {
        const element = this.imgArray[index];
        if (element == "") {
          this.imgArray[index]=base64Image
          break;
        }
      }
     }, (err) => {
      // Handle error
        // this.toast(err);
     });
  }

  send(){
    console.log("发布");
    for (let index = 0; index < this.imgArray.length; index++) {
      const element = this.imgArray[index];
      if (element == "" && index==this.imgArray.length-1) {
        this.toast("请选择商品图片");
        return;

      }else{
        if (element.length>0) {
          break;
        }
      }
    }
    if (this.productNum.length == 0) {
      this.toast("请输入商品编号");
      return;
    }
    if (this.productName.length==0) {
      this.toast("请输入商品名称");
      return;
    }
    
    if (this.wholesalePrice.length == 0) {
      this.toast("请输入进货价格");
      return;
    }
    if (this.advicePrice.length==0) {
      this.toast("请输入销售价格");
      return;
    }
    if (this.proUnit.length ==0) {
      this.toast("请输入商品单位");
      return;
    }
    if (this.condition.bigCate.customCategoryId.length == 0) {
      this.toast("请选择商品类别");
      return;
    }
    this.sendRequest(0);
    
  }
  startLoading(){
    if (this.loading==null) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  endLoading(){
    if (this.loading!=null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  //net 
  sendRequest(index){
    if (index>=this.imgArray.length) {
      this.sendCompeleteRequest(this.str,this.icon);
      return;
    }
    const element = this.imgArray[index];
    
    if (index==0) {
      this.str = "";
      this.icon = "";
    }
    this.startLoading();
    if (element!=""&&element.indexOf("data:image/jpeg;base64,")>=0) {
      let str = element.replace("data:image/jpeg;base64,","");
       this.device.uploadfileWithBase64String(str,".jpeg",(msg)=>{
         console.log(msg);
         if (this.str == "") {
           this.str = msg;
           this.icon = msg;
           
         }else{
          this.str = this.str +","+msg;
        
         }
         if (index <= this.imgArray.length-1) {
    
           this.sendRequest(index+1);
        }
       },(err)=>{
        this.endLoading();
        this.toast(err);
         return;
       });
    
   }else{
    this.sendCompeleteRequest(this.str,this.icon);
    return;
   }
    
  
   
  }

  sendCompeleteRequest(imgStr,icon){
    let params = {
      "dataInfo" : {
        "advicePrice" : this.advicePrice,
        "barCode" : this.barCode,
        "bigCategory" : this.condition.bigCate.customCategoryId,
        // "durabilityPeriod" : "180",
        // "hasBatchNumber" : "0",
        "littleCategory" : this.condition.smallCate.customCategoryId,
        "merchantId" : AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
        // "minOrder" : "3",
        // "noBillsDue" : "0",
        "proCode" : this.productNum,
        // "proDescription" : "0",
        "proIcon" : icon,
        "proIconDetail" : imgStr,
        "proName" : this.productName,
        "proUnit" : this.proUnit,
        // "remark" : "",
        // "shortName" : "苹果手机",
        // "specialOffer" : "50",
        "status" : (new Number(this.yes))+"",
        "wholesalePrice" : this.wholesalePrice
      },
      "ACTION_NAME":"productFacade|addProduct"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        this.toast("创建商品成功");
        if (this.navParams.data.callback!=null) {
          this.navParams.data.callback("refresh");
        }
        this.navCtrl.pop();

      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      this.endLoading();
    },error => {
      this.toast(error);
      this.endLoading();
    },false);
  }

}
