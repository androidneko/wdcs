import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the PlantsMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plants-map',
  templateUrl: 'plants-map.html',
})
export class PlantsMapPage extends BasePage {

  public map: any;
  uploadedMarkers: any[] = [];

  constructor(
    public net: TyNetworkServiceProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantsMapPage');
    this.requestAllPlants()
      .then(() => { return this.loadAMapJs() })
      .then(() => { return this.loadMap() })
      .then(() => { this.showPlants(); });
  }

  requestAllPlants() {
    return new Promise((resolve, reject) => {
      this.net.httpPost(
        AppGlobal.API.plantsPosition,
        {},
        msg => {
          console.log(msg);

          let info = JSON.parse(msg);

          info.forEach(element => {
            let plant: any = element;
            plant.name = info.name;
            plant.lnglat = info.lnglat;

            let lnglat = new AMap.LngLat(info.lnglat[0], info.lnglat[1]);
            let marker = new AMap.Marker({
              icon: "assets/imgs/ent.png",
              name:plant.name,
              position: lnglat
            });
            this.uploadedMarkers.push(marker);
          });
          resolve();
        },
        error => {
          this.toastShort(error);
        },
        true);
    });
  }

  loadAMapJs(){
    return new Promise((resolve,reject)=>{
      if (typeof (AMap) == "undefined") {
          this.dynamicLoadJs("https://webapi.amap.com/maps?v=1.4.8&key=8ee7947b20fd51537ea180547f949b70",()=>{
          resolve();
        });
      }else {
        resolve();
      }
    }); 
  }

  /**
     * 动态加载JS
     * @param {string} url 脚本地址
     * @param {function} callback  回调函数
     */
    dynamicLoadJs(url, callback) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      if(typeof(callback)=='function'){
          script.onload =  function () {
            callback();
            script.onload = null;
          };
      }
      head.appendChild(script);
  }

  loadMap() {
    return new Promise((resolve, reject) => {
      if (this.map) {
        resolve();
      } else {
        let map = new AMap.Map('mapView', {
          resizeEnable: true,
          zoom: 10
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.MapType'], function () {
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);
          var mapType = new AMap.MapType();
          map.addControl(mapType);
        })

        //this.addMarker(map, new AMap.LngLat(this.lastLng, this.lastLat));
        //map.setFitView();// 执行定位
        map.on('complete', function () {
          // 地图图块加载完成后触发
          console.log("-----地图图块加载完成-----");
        });

        this.map = map;
        resolve();
      }
    });
  }

  showPlants() {
    this.map.clearMap();
    this.map.add(this.uploadedMarkers);
    this.fitMap(this.uploadedMarkers);
  }

  fitMap(markers) {
    if (markers && markers.length > 0) {
      let zoom = 10;
      let marker = markers[0];

      this.map.setZoomAndCenter(zoom, [marker.getPosition().getLng(), marker.getPosition().getLat()]);// 执行定位
    }
  }
}
