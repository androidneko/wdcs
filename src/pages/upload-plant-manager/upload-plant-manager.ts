import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
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
  catCheData:any;
  currentPage1: number = 1;
  pageSize1: number = 20;
  total1 = -1;
  currentPage2: number = 1;
  pageSize2: number = 20;
  currentPage3: number = 1;
  pageSize3: number = 20;
  type:String = "waitLoad";//待上传waitLoad 已上传hadUpload 审核中review
  constructor(private file: File,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPlantManagerPage');
    this.readLocalFiles();
  }
  uploadBtnCliked(){
    console.log('批量上传');


  }
  waitLoadClicked(item){
    //待上传
    this.navCtrl.push("AddRecordPage",{state:"1",data:this.catCheData});
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
  readLocalFiles(){
    this.file.readAsText(this.file.dataDirectory,"datainfo.text").then((success)=>{
      if (success!=null&&success.length>0) {
        let data = JSON.parse(success);
        this.catCheData = data;
        let picCount = 0;
        for (let index = 0; index < data.pictures.length; index++) {
          const element = data.pictures[index];
          if (element.picUrl == "assets/imgs/addphoto.png") {
            break;
          }else{
            picCount ++;
          }
        }
       this.waitLoadArray = [{picUrl:data.pictures[0].picUrl,target:"等待上传",picNum: picCount + ""}]
        this.total1 = 1;
      }else
      this.total1 = 0;
    }).catch((err)=>{
      console.log(err);
      this.total1 = 0;
    });
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
