import { PhotoLibrary } from '@ionic-native/photo-library';
import { Component ,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BasePage } from '../base/base';



/**
 * Generated class for the MyQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-qrcode',
  templateUrl: 'my-qrcode.html',
})
export class MyQrcodePage extends BasePage {

  @ViewChild('testImg') testImg:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alert:AlertController,private photoLibrary:PhotoLibrary) {
      super(navCtrl,navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyQrcodePage');
  }

  saveButtonClick(){
    console.log('save button click');
    let alert = this.alert.create({
      title:'使用收款二维码收款',
      subTitle:'您可以保存二维码图片发至您的付款方，便捷快速收款。',
      buttons:[{
        text:'取消',
      },{
        text:'保存二维码',
        handler:()=>{
          console.log('save confirm');
          this.saveQRcode();
        }
      }]
    });
    alert.present();
  }


  getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL

    // return dataURL.replace("data:image/png;base64,", "");
  }



  saveImage() {
    
    
        var dataUrl = this.getBase64Image(this.testImg.nativeElement);
    
        console.log('test111112ß');
        console.log(dataUrl);
    
        return this.photoLibrary.saveImage(dataUrl, 'ionic-native').then(libraryItem => 
          {
            console.log('save success');
            console.log(JSON.stringify(libraryItem));
            console.log('save end');
            
          });
      }

  saveQRcode () {
    
    this.photoLibrary.requestAuthorization({ read: true, write: true })
    .then(() => {
      return this.saveImage();
    })
    .catch(err => {
      console.log(err);
      console.log('没有权限');
    });
    
      
  }
}


