import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CameraOptions ,Camera} from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the PhotoSelectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-selects',
  templateUrl: 'photo-selects.html',
})
export class PhotoSelectsPage {
  dataArray:Array<any>=[];
  state="1";//可编辑 0不可编辑
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera,private actionSheet:ActionSheetController,private photoViewer: PhotoViewer) {
    if (this.navParams.data.state !=null) {
        this.state = this.navParams.data.state;
        this.dataArray = this.navParams.data.imgArray;
        if (this.state == '1') {
            if (this.dataArray!=null&&this.dataArray.length == 0) {
              this.dataArray.push({picUrl:"assets/imgs/addphoto.png",picName:"深径"});
              this.dataArray.push({picUrl:"assets/imgs/addphoto.png",picName:"植株"});
              this.dataArray.push({picUrl:"assets/imgs/addphoto.png",picName:"样方标示"});
              this.dataArray.push({picUrl:"assets/imgs/addphoto.png",picName:""});
            }
        }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoSelectsPage');
  }
  ionViewWillUnload(){
    console.log("ionViewWillUnload PhotoSelectsPage");
  }
  itemClick(idx){
    console.log("选择相片按钮点击");
    this.imgClick(idx);
  }
  imgClick(idx){
    //背景点击
    if (this.state == '0') {
      let item = this.dataArray[idx];
      this.photoViewer.show(item.picUrl, '照片预览', {share: false});
      return;
    }
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
    if (this.dataArray[idx].picUrl!="assets/imgs/addphoto.png" &&idx>2) {
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
          this.dataArray.splice(idx,1);
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
      // for (let index = 0; index <=idx; index++) {
      //   const element = this.imgArray[index];
      //   if (element == "") {
      //     this.imgArray[index]=base64Image
      //     break;
      //   }
      // }
      let element = this.dataArray[idx];
      let img = {picUrl:base64Image,picName:element.picName};
      this.dataArray[idx] = img;
      // this.device.uploadfileWithBase64String(imageData,".jpeg",(msg)=>{
      //   console.log(msg);
      // },(err)=>{
        
      // });
      // console.log(base64Image);
      if (idx > 2&&this.dataArray.length<5) {
        this.dataArray.push({picUrl:"assets/imgs/addphoto.png",picName:""});
      }
     
     }, (err) => {
      // Handle error
        // this.toast(err);
     });
  }

  done(){
    this.navCtrl.pop();
  }
}
