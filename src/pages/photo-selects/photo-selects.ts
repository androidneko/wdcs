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
  basicPhoto1Dft = new PhotoItem(0,"assets/imgs/addphoto.png","植株");
  basicPhoto2Dft = new PhotoItem(1,"assets/imgs/addphoto.png","生境");
  basicPhoto3Dft = new PhotoItem(2,"assets/imgs/addphoto.png","样方标示");
  detailPhotoDft = new PhotoItem(3,"assets/imgs/addphoto.png","");
  
  dataArray:Array<PhotoItem>=[];
  state="1";//可编辑 0不可编辑
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera,private actionSheet:ActionSheetController,private photoViewer: PhotoViewer) {
    if (this.navParams.data.state !=null) {
        this.state = this.navParams.data.state;
        this.dataArray = this.navParams.data.imgArray;
        if (this.state == '1') {
            if (this.dataArray!=null&&this.dataArray.length == 0) {
              this.dataArray.push(this.basicPhoto1Dft);
              this.dataArray.push(this.basicPhoto2Dft);
              this.dataArray.push(this.basicPhoto3Dft);
              this.dataArray.push(this.detailPhotoDft);
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
      quality: 50,
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
    if (this.dataArray[idx].picUrl!="assets/imgs/addphoto.png" && idx>2) {
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
          //处理三张基础照片被删除的逻辑,由于前三张没有删除按钮，此段逻辑作废
          // if (idx == 0){
          //   this.dataArray.push(this.basicPhoto1Dft);
          //   //sort
          //   this.dataArray.sort(this.sortPhoto);
          // }
          // if (idx == 1){
          //   this.dataArray.push(this.basicPhoto2Dft);
          //   //sort
          //   this.dataArray.sort(this.sortPhoto);
          // }
          // if (idx == 2){
          //   this.dataArray.push(this.basicPhoto3Dft);
          //   //sort
          //   this.dataArray.sort(this.sortPhoto);
          // }
          //处理5张详情照片布局
          if (idx > 2 && this.dataArray.length < 8 && !this.hasDefPhoto()) {
            this.dataArray.push(new PhotoItem(this.dataArray.length,"assets/imgs/addphoto.png",""));
          }
          //最后统一处理index的刷新
          this.refreshPhotos();
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

  sortPhoto(a:PhotoItem,b:PhotoItem){
    return a.index - b.index;
  }

  refreshPhotos(){
    for (let i = 0; i < this.dataArray.length;i++){
      this.dataArray[i].index = i;
    }
  }

  hasDefPhoto():boolean{
    for (let i = 0; i < this.dataArray.length;i++){
      if (this.dataArray[i].picUrl == "assets/imgs/addphoto.png"){
        return true;
      }
    }
    return false;
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
      let img = {index:this.dataArray.length,picUrl:base64Image,picName:element.picName};
      this.dataArray[idx] = img;
      // this.device.uploadfileWithBase64String(imageData,".jpeg",(msg)=>{
      //   console.log(msg);
      // },(err)=>{
        
      // });
      // console.log(base64Image);
      if (idx > 2&&this.dataArray.length<8) {
        this.dataArray.push({index:this.dataArray.length,picUrl:"assets/imgs/addphoto.png",picName:""});
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

export class PhotoItem {
  index:number = 0;  
  picUrl:string = 'assets/imgs/addphoto.png';
  picName:string = '';
  
  constructor(index:number,picUrl:string,picName:string){
    this.index = index;
    this.picUrl = picUrl;
    this.picName = picName;
  }
}