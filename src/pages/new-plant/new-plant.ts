import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the NewPlantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-plant',
  templateUrl: 'new-plant.html',
})
export class NewPlantPage {
  index:string = "";
  height:string = "";
  width:string = "";
  crownWidth:string = "";
  health:string = "";

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.index = this.navParams.data.index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPlantPage');
  }

  done(){
    console.log('保存');
    if (this.height.length == 0) {
      this.toast("请输入植株高度");
      return;
    }
    if (this.width.length == 0) {
      this.toast("请输入植株胸/地径");
      return;
    }
    if (this.crownWidth.length == 0) {
      this.toast("请输入植株冠幅");
      return;
    }
    if (this.health.length == 0) {
      this.toast("请输入植株健康状况");
      return;
    }
    if (this.navParams.data.callback!=null) {
      let plant = {
        index:this.index,
        height:this.height,
        width:this.width,
        crownWidth:this.crownWidth,
        health:this.health
      };
      this.navParams.data.callback(plant);
      this.navCtrl.pop();
    }
  }

  toast(info){
    this.toastCtrl.create({
      message:  info,
      duration: 3000,
      position: 'middle',
      showCloseButton:true,
      closeButtonText:"关闭"
    }).present();
  }
}
