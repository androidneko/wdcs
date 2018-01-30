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
  waitLoadArray: Array<any> = [];
  hadUploadArray:Array<any> = [];
  reviewArray:Array<any> = [];
  catCheData:any;
  currentPage1: number = 0;
  pageSize1: number = 20;
  total1 = -1;
  currentPage2: number = 0;
  pageSize2: number = 20;
  total2 = -1;
  currentPage3: number = 0;
  pageSize3: number = 20;
  total3 = -1;
  type:String = "hadUpload";//待上传waitLoad 已上传hadUpload 审核中review
  constructor(public toastCtrl: ToastController,private file: File,public navCtrl: NavController, public navParams: NavParams,private net:TyNetworkServiceProvider) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPlantManagerPage');
    this.readLocalFiles();
    this.sendQueryPlantsRequest2(0,null,false);
    this.sendQueryPlantsRequest3(0,null,false);
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
   
    this.getSampleDetails(item,1);
  }
  reviewClicked(item){
    //待审核
    this.getSampleDetails(item,0);
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
       this.waitLoadArray = [{pictures:data.pictures[0].picUrl,target:"等待上传",picNum: picCount + ""}]
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
    this.sendQueryPlantsRequest2(0, refresher);
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

  sendQueryPlantsRequest2(page: any, refresher: any,isLoading:boolean=true) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start":  page,
        "rowCount": 20,
        "status":"1"
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 0) {
          this.hadUploadArray = [];
        }
        let list = obj.data;
        this.total2 = parseInt(obj.recordsTotal) ;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.hadUploadArray.push(element);
        }
        this.currentPage2 = page;
    
      } else {
        this.total2 = 0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      if (refresher != null) {
        refresher.complete();
      }
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
    this.sendQueryPlantsRequest3(0, refresher);
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


  
  sendQueryPlantsRequest3(page: any, refresher: any,isloading:boolean=true) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start":  page,
        "rowCount": 20,
        "status":0
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 0) {
          this.reviewArray = [];
        }
        let list = obj.data;
        this.total3 = parseInt(obj.recordsTotal);
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.reviewArray.push(element);
        }
        this.currentPage3 = page;
      
      } else {
        this.total3 = 0;
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
        if (refresher != null) {
          refresher.complete();
        }
    }, error => {
      this.toast(error);
     this.total3 = 0;
      if (refresher != null) {
        refresher.complete();
      }
    }, isloading);
  }
  getSampleDetails(item ,tag){
    let params =
    {
      "recordId": item.recordId
    };
    this.net.httpPost(AppGlobal.API.sampleDetails, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        obj.data.detailInfo.lifeForm = JSON.parse(obj.data.detailInfo.lifeForm);

        if (tag == 0) {
          this.navCtrl.push("AddRecordPage",{isShowApplying:true,data:obj.data});
        }
        
        if (tag == 1) {
          this.navCtrl.push("AddRecordPage",{state:"0",data:obj.data});
        }
      
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    }, error => {

      this.toast(error);
    }, true);
  }
}
