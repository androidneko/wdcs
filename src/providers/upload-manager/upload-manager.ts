import { TyNetworkServiceProvider } from './../ty-network-service/ty-network-service';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceIntefaceServiceProvider } from '../device-inteface-service/device-inteface-service';
import { LoadingController, ToastController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AppGlobal, AppServiceProvider } from '../app-service/app-service';
import { File } from '@ionic-native/file';
/*
  Generated class for the UploadManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadManagerProvider {
  filename:string  = "datainfo.text";
  loading:Loading = null;
  data:any;
  successed:any;
  filed:any;
  constructor(public toastCtrl: ToastController,public device:DeviceIntefaceServiceProvider,private file: File,public loadingCtrl: LoadingController,public net:TyNetworkServiceProvider) {

  }

  
  uploadWithData(data){
    if (data==null) {
      return;
    }


    this.showLoading();
    this.data = JSON.parse(JSON.stringify(data));
    this.uploadItemImg(0);
  }
  showLoading(){

    if (this.loading==null) {
       this.loading = this.loadingCtrl.create();
    }
    if ( this.loading) {
      console.log("show loading");
      this.loading.present();
     }
  }
  hideLoading(){
    console.log("hide loading");
    if (this.loading!=null) {
      this.loading.dismiss();
      this.loading=null;
   }
  }
  uploadItemImg(index){
    //{picUrl:"assets/imgs/addphoto.png",picName:"深径"}
    if (index>=this.data.pictures.length) {
      this.uploadItemData();
      return;
    }
    let pic = this.data.pictures[index];
    if (pic.picUrl == "assets/imgs/addphoto.png" ) {
      this.uploadItemData();
      return;
    }
    if (pic.picUrl.indexOf("http://")>=0) {
      this.uploadItemImg(index+1);
      return
    }
    let base64 = pic.picUrl.replace('data:image/jpeg;base64,','');

    this.device.uploadfileWithBase64String(base64, "jpeg", (msg) => {
      console.log('success in');
      console.log(msg);
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        
        pic.picUrl = obj.data;
        this.uploadItemImg(index+1);
      } else {
        this.toast(obj.desc);
        this.upfiled();
      }
    
    }, (err) => {
     
      this.toast(err);
      this.upfiled();
      console.log('23 error');
    });
  }
  
  toast(info){
    if(this.toastCtrl!=null)
    this.toastCtrl.create({
      message:  info,
      duration: 3000,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }
  upfiled(){
    //缓存
    console.log(this.file.dataDirectory);
    this.file.writeFile(this.file.dataDirectory,this.filename,JSON.stringify(this.data),{replace:true}).then((success)=>{
      console.log("succceds");
      if (this.filed != null) {
        this.filed();
      }
      this.hideLoading();
    }).catch((err)=>{
      if (this.filed != null) {
        this.filed();
      }
      this.hideLoading();
      console.log(err);
    });
    
  }
  uploadItemData(){
     let updatObj = JSON.parse(JSON.stringify(this.data));
     let index = updatObj.pictures.length -1;
     let pic = updatObj.pictures[index];
     updatObj.detailInfo.lifeForm = JSON.stringify(updatObj.detailInfo.lifeForm);
     updatObj.token = AppServiceProvider.getInstance().userinfo.loginData.token;
     if (pic.picUrl == "assets/imgs/addphoto.png") {
      updatObj.pictures.pop();
     }
     this.net.httpPost(AppGlobal.API.uploadRecord,
      updatObj, msg => {
        let obj = JSON.parse(msg);
        if (obj.ret == AppGlobal.RETURNCODE.succeed) {
          this.toast(obj.desc);
          this.hideLoading();
          this.file.removeFile(this.file.dataDirectory,this.filename);
          if (this.successed != null) {
              this.successed();
          }
        } else {
          this.toast(obj.desc);
          this.upfiled();
        }

      }, error => {
        this.toast(error);
        this.upfiled();
      }, false);

  }
}
