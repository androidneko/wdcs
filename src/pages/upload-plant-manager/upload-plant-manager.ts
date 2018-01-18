import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadPlantManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-plant-manager',
  templateUrl: 'upload-plant-manager.html',
})
export class UploadPlantManagerPage {
  waitLoadArray: Array<any> = ["1"];
  hadUploadArray:Array<any> = ["1","1"];
  reviewArray:Array<any> = ["1","1","3"];
  type:String = "waitLoad";//待上传waitLoad 已上传hadUpload 审核中review
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPlantManagerPage');
  }

}
