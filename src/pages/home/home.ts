import { AppServiceProvider } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal } from '../../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BasePage {
  newsList:any = [
    {
			"imageUrl":"http://www.hbly.gov.cn/CMShbly/201703/201703151103044.jpg","url":"http://www.hbly.gov.cn/wzlm/xwzx/tpxw/85867.htm","title":"1310DFBDC418BEF"
		},
		{
			"imageUrl":"http://www.hbly.gov.cn/CMShbly/201705/201705270450055.jpg","url":"http://www.hbly.gov.cn/wzlm/xwzx/tpxw/87998.htm","title":"1310DFBDC418BEF"
		},
		{
			"imageUrl":"http://www.hbly.gov.cn/CMShbly/201708/201708080523053.jpg","url":"http://www.hbly.gov.cn/wzlm/xwzx/tpxw/89793.htm","title":"1310DFBDC418BEF"
		}
  ];
  plants:any = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 8;

  constructor(
    public device:DeviceIntefaceServiceProvider,
    public mtoast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    //this.getNewsList();
    this.sendQueryPlantsRequest(this.currentPage, null);
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.sendQueryPlantsRequest(1, refresher);
  }
  doInfinite(refresher) {
    console.log("上拉加载更多");
    this.sendQueryPlantsRequest(this.currentPage+1, refresher);
  }

  gotoNewsDetail(news){
    this.device.push("webView",news.url,msg =>{
      console.log("push success");
    },err => {
      this.toast(err);
      console.log("push failed");
    });
  }

  sendQueryPlantsRequest(page: any, refresher: any) {
    let params =
      {
        "userName":AppServiceProvider.getInstance().userinfo.loginData.userName,
        "start":  page==1?0:this.plants.length,
        "rowCount": this.pageSize,
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.plants = [];
        }
        let list = obj.data;
        this.total = obj.recordsTotal;
        for (let index = 0; index < list.length; index++) {
          let element = list[index];
          this.plants.push(element);
        }
        this.currentPage = page;
        if (refresher != null) {
          refresher.complete();
        }
      } else {
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }

    }, error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    }, refresher == null);
  }

  getNewsList(){
    this.net.httpPost(AppGlobal.API.getNewsList,{},msg => {
      let obj = JSON.parse(msg);
      console.log("cellPhone:"+obj.toString());
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        this.newsList = obj.data;
      }else{
        this.toast(obj.desc);
      }
    },error => {
      this.toast(error);
    },true);
  }

  queryTarget(id:string){
    
    this.net.httpPost(AppGlobal.API.sampleDetails,{
      "recordId":id
    },msg => {
      let obj = JSON.parse(msg);
      console.log("cellPhone:"+obj.toString());
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        let plant = obj.data;
        this.navCtrl.push("AddRecordPage",{state:"0",data:plant});
      }else{
        this.toast(obj.desc);
      }
    },error => {
      this.toast(error);
    },true);
  }

  recordClicked(plant){
    this.queryTarget(plant.recordId);
  }
}
