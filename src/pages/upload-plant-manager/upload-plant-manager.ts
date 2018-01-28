import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppServiceProvider, AppGlobal } from '../../providers/app-service/app-service';
import { BasePage } from '../base/base';
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
export class UploadPlantManagerPage extends BasePage {
  waitLoadArray: Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"}];
  hadUploadArray:Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"3"}];
  reviewArray:Array<any> = [{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"8"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"9"},{picUrl:"assets/imgs/test.png",no:"zj50003",picNum:"4"}];
  catCheData:any;
  currentPage1: number = 1;
  pageSize1: number = 20;
  total1 = -1;
  currentPage2: number = 1;
  pageSize2: number = 20;
  total2 = -1;
  currentPage3: number = 1;
  pageSize3: number = 20;
  total3 = -1;
  type:String = "hadUpload";//待上传waitLoad 已上传hadUpload 审核中review
  constructor(public toastCtrl: ToastController, ,private file: File,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPlantManagerPage');
    this.readLocalFiles();
    this.sendQueryPlantsRequest2(1,null,false);
    this.sendQueryPlantsRequest3(1,null,false);
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
    this.sendQueryPlantsRequest2(1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doInfinite2(refresher) {
    console.log("上拉加载更多");
    this.sendQueryPlantsRequest2(this.currentPage2+1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }

  sendQueryPlantsRequest2(page: any, refresher: any,isLoading?=true) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start":  page==1?0:this.reviewArray.length,
        "length": this.reviewArray,
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.reviewArray = [];
        }
        let list = obj.data;
        this.total2 = obj.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.reviewArray.push(element);
        }
        this.currentPage2 = page;
        if (refresher != null) {
          refresher.complete();
        }
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      this.total2 = 0;
    }, error => {
      this.toast(error);
      this.total2 = 0;
      if (refresher != null) {
        refresher.complete();
      }
    }, isLoading);
  }

  
  doRefresh3(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendQueryPlantsRequest3(1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }
  doInfinite3(refresher) {
    console.log("上拉加载更多");
    this.sendQueryPlantsRequest3(this.currentPage3+1, refresher);
    // if (refresher != null) {
    //   refresher.complete();
    // }
  }


  
  sendQueryPlantsRequest3(page: any, refresher: any,isloading?=true) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start":  page==1?0:this.hadUploadArray.length,
        "length": this.hadUploadArray,
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.hadUploadArray = [];
        }
        let list = obj.data;
        this.total3 = obj.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.hadUploadArray.push(element);
        }
        this.currentPage3 = page;
        if (refresher != null) {
          refresher.complete();
        }
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      this.total3 = 0;
    }, error => {
      this.toast(error);
     this.total3 = 0;
      if (refresher != null) {
        refresher.complete();
      }
    }, isloading);
  }




}
