import { Camera, CameraOptions } from '@ionic-native/camera';
import { BasePage } from './../base/base';
import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from './../../providers/app-service/app-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Navbar } from 'ionic-angular/components/toolbar/navbar';
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
export class PersonalInfoPage extends BasePage {

  // imgArray:Array<any> = [""];
  isEditMode: Boolean = false;
  loading: Loading;
  buttonTitle: string = "编辑";

  info: any = {
    userName: AppServiceProvider.getInstance().userinfo.loginData.userName,
    token: AppServiceProvider.getInstance().userinfo.loginData.token,
    nickName: "ANDROIDNEKO",
    avatar: "assets/imgs/author_logo2.png",
    email: "",
    gender: "秘密",
    height: "175CM",
    weight: "60KG",
    birthday: "1990-01-01"
  };

  genders: any = [
    {
      name: '性别',
      options: [
        { text: '女', value: '女' },
        { text: '男', value: '男' },
        { text: '秘密', value: '秘密' }
      ]
    }
  ];

  heights: any = [
    {
      name: '身高',
      options: []
    }
  ];

  weights: any = [
    {
      name: '体重',
      options: []
    }
  ];

  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private net: TyNetworkServiceProvider,
    private camera: Camera,
    private actionSheet: ActionSheetController,
    private device: DeviceIntefaceServiceProvider,
    public loadingCtrl: LoadingController,
    public alert: AlertController,
    public events: Events) {
    super(navCtrl, navParams);
    
    this.initHeightAndWeight();
    this.listenToBackEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');

    this.navBar.backButtonClick = this.backButtonClick;
    this.sendRequest();
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload PersonalInfoPage');
    //避免该页面多次进入后多次监听事件
    this.events.unsubscribe('backButtonPressed');
  }

  ionViewWillEnter(){
    // let options: NativeTransitionOptions = {
    //   "duration"       :  300, // in milliseconds (ms), default 400
    //   "androiddelay"   :  50
    // };

    // this.nativePageTransitions.fade(options)
    //   .then((data) => {
        
    //   })
    //   .catch((err) => {
        
    //   });
  } 

  ionViewWillLeave() {
    // let options: NativeTransitionOptions = {
    //    duration: 300,
    //    androiddelay: 100
    //   };
   
    // this.nativePageTransitions.fade(options)
    //   .then()
    //   .catch();
   }

   listenToBackEvents() {
    this.events.subscribe('backButtonPressed', () => {
      this.backCheck();
    });
  }

  backButtonClick = (e: UIEvent) => {
    // do something
    this.backCheck();
  }

  backCheck(){
    if (this.isEditMode) {
      this.showUnsavedAlert();
      console.log("isEditMode:" + this.isEditMode);
    } else {
      this.navCtrl.pop();
      console.log("isEditMode:" + this.isEditMode);
    }
  }

  initHeightAndWeight() {
    let options: any = [];
    for (let i = 0; i < 200; i++) {
      let item: any = { text: '', value: '' };
      item.text = 50 + i + 'CM';
      item.value = 50 + i + 'CM';
      options[i] = item;
    }
    this.heights[0].options = options;

    let options2: any = [];
    for (let j = 0; j < 200; j++) {
      let item: any = { text: '', value: '' };
      item.text = 20 + j + 'KG';
      item.value = 20 + j + 'KG';
      options2[j] = item;
    }
    this.weights[0].options = options2;
  }

  sendRequest() {
    let params = {
      "userName": AppServiceProvider.getInstance().userinfo.loginData.userName,
      "token": AppServiceProvider.getInstance().userinfo.loginData.token
    };
    this.net.httpPost(AppGlobal.API.getUserInfo, params, msg => {
      console.log(msg);
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        this.info.avatar = obj.data.avatar;
        this.info.birthday = obj.data.birthday;
        this.info.email = obj.data.email;
        this.info.gender = obj.data.gender;
        this.info.height = obj.data.height;
        this.info.nickName = obj.data.nickName;
        this.info.weight = obj.data.weight;
        AppServiceProvider.getInstance().userinfo.userData = this.info;
      }
      console.log(obj);
    }, error => { }, true);
  }

  saveRequest() {
    let params = this.info;
    this.net.httpPost(AppGlobal.API.editUserInfo, params, msg => {
      console.log(msg);
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        this.toastShort("保存成功!");
        this.buttonTitle = '编辑';
        AppServiceProvider.getInstance().userinfo.userData = this.info;
        this.events.publish('userinfo:saved');
      }
    }, error => {
      this.toast(error);
    }, true);
  }


  itemSelected(item) {
    console.log('');
  }

  editButtonPressed() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.buttonTitle = '保存';
    } else {
      this.saveRequest();
    }
  }

  getImgWithIndex(options) {
    console.log('in');
    this.camera.getPicture(options).then((imageData) => {
      console.log('success');
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.info.avatar = base64Image;
      this.uploadHeaderImage();
    }, (err) => {
      console.log('error');
      this.toast(err);
    });
  }

  openCamera() {
    if (!this.isEditMode) {
      console.log('不是编辑模式');
      return;
    }
    console.log('open click 1');
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true
    };
    var buttons = [{
      text: "拍照",
      handler: () => {
        options.sourceType = this.camera.PictureSourceType.CAMERA;
        this.getImgWithIndex(options);
      }
    }, {
      text: "从相册中选择",
      handler: () => {
        console.log('photolibary');
        options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        this.getImgWithIndex(options);
      }
    }, {
      text: "取消",
      role: 'cancel',
      handler: () => {
        // options.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
        // this.getImgWithIndex(options);
      }
    }];

    let actionSheet = this.actionSheet.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  //上传头像
  uploadHeaderImage() {
    if (this.info.avatar != null && this.info.avatar.indexOf("data:image/jpeg;base64,") >= 0) {
      this.startLoading();
      console.log(this.info.avatar);
      let str = this.info.avatar.replace("data:image/jpeg;base64,", "");
      this.device.uploadfileWithBase64String(str, "jpeg", (msg) => {
        console.log('success in');
        console.log(msg);
        let obj = JSON.parse(msg);
        this.info.avatar = obj.data;
        this.endLoading();
      }, (err) => {
        this.endLoading();
        this.toast(err);
        console.log('23 error');
      });
    } else {
      console.log('headerImageUrl == null');
      console.log(this.info.avatar);
    }
  }

  showUnsavedAlert() {
    let alert = this.alert.create({
      title: '您尚未保存，确定要退出该页面吗？',
      buttons: [{
        text: '取消'
      }, {
        text: '确定',
        handler: () => {
          console.log('confirm');
          this.isEditMode = false;
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

  startLoading() {
    if (this.loading == null) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  endLoading() {
    if (this.loading != null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}