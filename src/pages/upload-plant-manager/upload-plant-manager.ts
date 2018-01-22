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
  waitLoadArray: Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"}];
  hadUploadArray:Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"3"}];
  reviewArray:Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"9"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"4"}];
  currentPage1: number = 1;
  pageSize1: number = 20;
  currentPage2: number = 1;
  total1 = 999;
  pageSize2: number = 20;
  currentPage3: number = 1;
  pageSize3: number = 20;
  type:String = "waitLoad";//待上传waitLoad 已上传hadUpload 审核中review
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPlantManagerPage');
  }
  uploadBtnCliked(){
    console.log('批量上传');


  }
  waitLoadClicked(item){
    //待上传
    this.navCtrl.push("AddRecordPage",{state:"1",data:item});
  }
  hadUploadClicked(item){
    //已上传
    this.navCtrl.push("AddRecordPage",{state:"0",data:item});
  }
  reviewClicked(item){
    //待审核
    this.navCtrl.push("AddRecordPage",{isShowApplying:true,data:item});
  }

  doRefresh1(refresher) {
    //刷新
    console.log("下拉刷新");
    // this.sendPayHistoryRequest(1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doInfinite1(refresher) {
    console.log("上拉加载更多");
    // this.sendPayHistoryRequest(this.currentPage+1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doRefresh2(refresher) {
    //刷新
    console.log("下拉刷新");
    // this.sendPayHistoryRequest(1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doInfinite2(refresher) {
    console.log("上拉加载更多");
    // this.sendPayHistoryRequest(this.currentPage+1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doRefresh3(refresher) {
    //刷新
    console.log("下拉刷新");
    // this.sendPayHistoryRequest(1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doInfinite3(refresher) {
    console.log("上拉加载更多");
    // this.sendPayHistoryRequest(this.currentPage+1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }


  




}
