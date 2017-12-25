import { Camera, CameraOptions } from '@ionic-native/camera';
import { BasePage } from './../base/base';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';
import { Loading } from 'ionic-angular/components/loading/loading';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage extends BasePage{

  // imgArray:Array<any> = [""];
  isEditMode:Boolean = false;
  nickname:string = '周某某';
  telephone:string = '13500000000';
  email:string = 'xx@whty.com.cn';
  department:string = '销售部';
  position:string = '销售总监';
  items:[string] = ['姓名','手机号','邮箱','部门','职位'];
  buttonTitle:string = '编辑';
  headerImageUrl:string = "assets/imgs/1.jpg";
  loading:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider
    ,private camera:Camera,private actionSheet:ActionSheetController,private device:DeviceIntefaceServiceProvider
    ,public loadingCtrl:LoadingController) {

    super(navCtrl,navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
    this.sendRequest();
  }

  sendRequest(){
    let params = {
      "userId": AppServiceProvider.getInstance().userinfo.USERID,
      "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "ACTION_NAME":"merUserApi|viewMerUser"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg=>{
      console.log(msg);
      let obj = JSON.parse(msg);
      if(obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed || obj.ACTION_RETURN_CODE==null){

        this.nickname = obj.ACTION_INFO.data.realName;
        this.telephone = obj.ACTION_INFO.data.cellPhone;
        this.email = obj.ACTION_INFO.data.eMail;
        this.headerImageUrl = obj.ACTION_INFO.data.picUrl;
        
      }
      console.log(obj);
    },error => {

    }, true);
  }

  saveRequest(){
    let params = {
      "userId": AppServiceProvider.getInstance().userinfo.USERID,
      "MERCHANT_ID":AppServiceProvider.getInstance().userinfo.MERCHANT_ID,
      "picUrl":this.headerImageUrl,
      "picName":"我的头像",
      "merName":"商户名称--my",
      "deptId":this.department,
      "position":this.position,
      "eMail":this.email,
      "ACTION_NAME":"merUserApi|updateMerUser"
    };

    this.net.httpPost(AppGlobal.API.test,params,msg=>{
      console.log(msg);
      let obj = JSON.parse(msg);
      if(obj.ACTION_RETURN_CODE == AppGlobal.RETURNCODE.succeed || obj.ACTION_RETURN_CODE==null){

        this.toast('');
        
      }
      // console.log(obj);
    },error => {
      this.toast(error);
    }, true);
  }


  itemSelected(item){
    console.log('');
  }

  editButtonPressed(){
    this.isEditMode = !this.isEditMode;
    if(this.isEditMode){
      this.buttonTitle = '保存';
    }else{
      this.buttonTitle = '编辑';
      // this.saveRequest();
      this.uploadHeaderImage();
    }
  }

  getImgWithIndex(options){
    console.log('in');
    this.camera.getPicture(options).then((imageData)=>{
      console.log('success');
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      this.headerImageUrl = base64Image;
    },(err)=>{
      console.log('error');
      this.toast(err);
    });
  }

  openCamera(){
    if(!this.isEditMode){
      console.log('不是编辑模式');
      return;
    }
    console.log('open click 1');
    let options: CameraOptions = {
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true
    };
    var buttons = [{
      text:"拍照",
      handler:()=>{
        options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImgWithIndex(options);
      }
    },{
      text:"从相册中选择",
      handler:()=>{
        console.log('photolibary');
        options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImgWithIndex(options);
      }
    },{
      text:"取消",
      role:'cancel',
      handler:()=>{
        // options.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
        // this.getImgWithIndex(options);
      }
    }];

    let actionSheet = this.actionSheet.create({
      buttons:buttons
    });
    actionSheet.present();
  }

  //上传头像
  uploadHeaderImage(){
    
    if(this.headerImageUrl != null && this.headerImageUrl.indexOf("data:image/jpeg;base64,")>=0){
      this.startLoading();
      console.log('header in');
      console.log(this.headerImageUrl);
      let str = this.headerImageUrl.replace("data:image/jpeg;base64,","");
      this.device.uploadfileWithBase64String(str,"jpeg",(msg)=>{
        console.log('success in');
        console.log(msg);
        this.headerImageUrl = msg;
        this.endLoading();
        this.saveRequest();
      },(err)=>{
        this.endLoading();
        this.toast(err);
        console.log('23 error');
      });
    }else{
      console.log('headerImageUrl == null');
      console.log(this.headerImageUrl);
      this.saveRequest();
    }
  }

  startLoading(){
    if(this.loading == null){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  endLoading(){
    if(this.loading != null){
      this.loading.dismiss();
      this.loading = null;
    }
  }

}