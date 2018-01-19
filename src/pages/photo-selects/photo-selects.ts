import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  dataArray:Array<any>=[{src:"assets/imgs/addphoto.png",info:"哈哈"}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoSelectsPage');
  }
  ionViewWillUnload(){
    console.log("ionViewWillUnload PhotoSelectsPage");
  }
  itemClick(item){
    console.log("选择相片按钮点击");
    
  }
}
