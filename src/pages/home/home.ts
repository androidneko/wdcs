import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal } from '../../providers/app-service/app-service';

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

  plants:any = [];
  total: number = -1;
  currentPage: number = 1;
  pageSize: number = 8;

  constructor(
    public mtoast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
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

  sendQueryPlantsRequest(page: any, refresher: any) {
    let params =
      {
        "dataInfo":"test",
        "start":  page==1?0:this.plants.length,
        "length": this.pageSize,
      };
    this.net.httpPost(AppGlobal.API.recordList, params, msg => {
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        if (page == 1) {
          this.plants = [];
        }
        let info = obj.data;
        let list = info.data;
        this.total = info.recordsTotal;
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

  recordClicked(plant){
    this.navCtrl.push("RecordDetailPage",{state:"0",data:plant});
  }
}
