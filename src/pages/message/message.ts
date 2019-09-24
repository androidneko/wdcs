import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal } from '../../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BasePage{
  // messages = [{
  //   "title": "Ionic Workshop",
  //   "content": "副厅长蔡静峰到省野生动植物保护总站调研",
  //   "time": "2018-01-26 13:45:34",
  //   "url": "",
  //   "type": "emergency",
  //   "id": "9"
  // }, {
  //   "title": "Community Interaction",
  //   "content": "省林业厅对处级以上干部集中进行学习贯彻党的十九大精神培训 刘新池作动员报告",
  //   "time": "11:30 am",
  //   "url": "",
  //   "type": "important",
  //   "id": "10"
  // }, {
  //   "title": "Navigation in Ionic",
  //   "content": "纪检组长高春海作《学习贯彻党的十九大精神 抓好党风廉政建设》专题辅导报告",
  //   "time": "11:30 am",
  //   "url": "",
  //   "type": "common",
  //   "id": "11"
  // }, {
  //   "title": "Navigation in Ionic",
  //   "content": "纪检组长作《学习贯彻党的十九大精神 抓好党风廉政建设",
  //   "time": "11:30 am",
  //   "url": "",
  //   "type": "",
  //   "id": "11"
  // }];

  newsList:any = [];

  constructor(
    public device:DeviceIntefaceServiceProvider,
    public mtoast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private net: TyNetworkServiceProvider) {
    super(navCtrl, navParams, mtoast);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.getNewsList(null);
  }
  itemClicked(item){
    this.navCtrl.push("BuildingPage");
  }

  //net 网络请求
  doRefresh(refresher) {
    //刷新
    console.log("下拉刷新");
    this.getNewsList(refresher);
  }
  // doInfinite(refresher) {
  //   console.log("上拉加载更多");
  //   //this.sendQueryPlantsRequest(this.currentPage+1, refresher);
  // }

  test(url){
    console.log("test");
    this.device.push("webView", url, msg => {
      console.log("push success");
    }, err => {
      this.toast(err);
      console.log("push failed");
    });
  }

  getNewsList(refresher){
    this.net.httpPost(AppGlobal.API.getNewsList,"",msg => {
      console.log(msg);
      let obj = JSON.parse(msg);
      if (obj.ret == AppGlobal.RETURNCODE.succeed) {
        this.newsList = obj.data;
      }else{
        this.toast(obj.desc);
      }
      if (refresher != null) {
        refresher.complete();
      }
    },error => {
      this.toast(error);
      if (refresher != null) {
        refresher.complete();
      }
    },true);
  }
}
