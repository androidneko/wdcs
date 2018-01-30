import { NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


export class BasePage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl?: ToastController,
    ) {
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

  toastLong(info){
    if(this.toastCtrl!=null)
    this.toastCtrl.create({
      message:  info,
      duration: 3000,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }

  toastShort(info){
    if(this.toastCtrl!=null)
    this.toastCtrl.create({
      message:  info,
      duration: 1500,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }
}
