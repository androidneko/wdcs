import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TyNetworkServiceProvider } from '../../providers/ty-network-service/ty-network-service';
import { AppGlobal, AppServiceProvider } from '../../providers/app-service/app-service';
import { MultiPicker } from 'ion-multi-picker';

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

  @ViewChild('picker1') multiPicker: MultiPicker;
  public map: any;
  public polygons = [];
  area: string = "湖北";
  total: number = 0;

  minMarkers: any[] = [];
  level1Markers: any[] = [];
  level2Markers: any[] = [];
  otherMarkers: any[] = [];
  selectedMarkers: any[] = [];
  lastSelectedMarkers: any[] = [];

  style = [
    // {
    //   url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
    //   anchor: new AMap.Pixel(6, 6),
    //   size: new AMap.Size(11, 11)
    // }, {
    //   url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
    //   anchor: new AMap.Pixel(4, 4),
    //   size: new AMap.Size(7, 7)
    // }, 
    {
      url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
      anchor: new AMap.Pixel(3, 3),
      size: new AMap.Size(9, 9)
    }
  ];

  checkState: any = {
    "min": true,
    "level1": true,
    "level2": true,
    "other": true
  };

  areas: any = [
    {
      name: 'area',
      options: [
        { text: '湖北', value: '湖北' },
        { text: '武汉市', value: '武汉市' },
        { text: '黄石市', value: '黄石市' },
        { text: '十堰市', value: '十堰市' },
        { text: '荆州市', value: '荆州市' },
        { text: '宜昌市', value: '宜昌市' },
        { text: '襄阳市', value: '襄阳市' },
        { text: '鄂州市', value: '鄂州市' },
        { text: '荆门市', value: '荆门市' },
        { text: '黄冈市', value: '黄冈市' },
        { text: '孝感市', value: '孝感市' },
        { text: '咸宁市', value: '咸宁市' },
        { text: '仙桃市', value: '仙桃市' },
        { text: '潜江市', value: '潜江市' },
        { text: '神农架', value: '神农架' },
        { text: '恩施', value: '恩施' },
        { text: '天门市', value: '天门市' },
        { text: '随州市', value: '随州市' }
      ]
    }
  ];

  // 创建样式对象
  styleObject: any;
  massMarks: any;

  constructor(
    public net: TyNetworkServiceProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    super(navCtrl, navParams, toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantsMapPage');
    this.loadAMapJs()
      .then(() => { return this.loadMap() })
      .then(() => { return this.requestAllPlants() })
      .then(() => { this.checkChange(true); });
  }

  showPicker() {
    this.multiPicker.open();
  }

  changeArea(event) {
    console.log("changeArea---->" + event.area.value);
    this.area = event.area.value;

    if (this.map != null && this.map != undefined) {
      //this.map.clearMap();
    }
    this.loadAMapJs()
      .then(() => { return this.loadMap() })
      .then(() => { return this.requestAllPlants() })
      .then(() => { this.checkChange(true); });
  }

  requestAllPlants() {
    return new Promise((resolve, reject) => {
      this.net.httpPost(
        AppGlobal.API.plantsByCity,
        { 
          userName:AppServiceProvider.getInstance().userinfo.loginData.userName,
          city: this.area
        },
        msg => {
          console.log(msg);

          let info = JSON.parse(msg);
          this.parsePlunts(info);

          resolve();
        },
        error => {
          this.toastShort(error);
        },
        true);
    });
  }

  parsePlunts(info) {

    if (info && info.data != null) {
      this.level1Markers = [];
      this.level2Markers = [];
      this.minMarkers = [];
      this.otherMarkers = [];

      let data = info.data;
      if (data && data.length > 0) {
        this.total = 0;
        data.forEach(element => {
          let plunts = element.ptls;
          let label = element.label;
          if (plunts && plunts.length > 0) {
            this.total += plunts.length;
            plunts.forEach(plunt => {
              this.pushPlunt(plunt, label);
            });
          }
          if (label == "总计") {
            //this.total = element.data;
          }
        });
      }
    }
  }

  pushPlunt(plunt, label) {
    let loc = plunt.lnglat;
    let lng: number = parseFloat(loc[0]);
    let lat: number = parseFloat(loc[1]);
    if (!isNaN(lng) && !isNaN(lat)) {
      //not real marker,it s the unit of mass marker
      let position = new AMap.LngLat(lng, lat);
      let marker = {
        lnglat: [lng, lat],
        name: plunt.name,
        extData: plunt,
        position:position,
        id: 1
      };
      
      // let marker = new AMap.Marker({
      //   icon: "assets/imgs/ent.png",
      //   title: plunt.name,
      //   position: lnglat,
      //   extData: plunt
      // });
      // marker.on('click', () => {
      //   this.openInfo(marker);
      // });
      if ("一级保护" == label) {
        this.level1Markers.push(marker);
      }
      if ("二级保护" == label) {
        this.level2Markers.push(marker);
      }
      if ("极小种群" == label) {
        this.minMarkers.push(marker);
      }
      if ("其他" == label) {
        this.otherMarkers.push(marker);
      }
    }
  }

  loadAMapJs() {
    return new Promise((resolve, reject) => {
      if (typeof (AMap) == "undefined") {
        this.dynamicLoadJs("https://webapi.amap.com/maps?v=1.4.8&key=9657906ea649a962b22a1149561d0b1f&plugin=AMap.DistrictSearch", () => {
          resolve();
        });
      } else {
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
    if (typeof (callback) == 'function') {
      script.onload = function () {
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
          zoom: 6
        });

        AMap.plugin(['AMap.ToolBar', 'AMap.MapType', 'AMap.DistrictSearch'], ()=> {
          var toolbar = new AMap.ToolBar();
          map.addControl(toolbar);
          var mapType = new AMap.MapType();
          map.addControl(mapType);

          // 创建行政区查询对象
          var polygons = [];
          var district = new AMap.DistrictSearch({
            // 返回行政区边界坐标等具体信息
            extensions: 'all',
            // 设置查询行政区级别为 省 
            level: 'province'
          })
          //行政区查询
          //district.setLevel("district")
          district.search("湖北省", (status, result)=> {
            //map.remove(this.polygons)//这里不用清除，我们只需要查一次，加载一次
            //polygons = [];
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.1,
                  fillColor: '#80d8ff',
                  strokeColor: '#0091ea'
                });
                polygons.push(polygon);
              }
            }
            map.add(polygons)
            //视口自适应
            var zoom = map.getZoom();
            map.setFitView(polygons,true,null,zoom);
            map.setZoom(zoom);
            this.polygons = polygons;
          });
        })

        //this.addMarker(map, new AMap.LngLat(this.lastLng, this.lastLat));
        //map.setFitView();// 执行定位
        map.on('complete', ()=> {
          // 地图图块加载完成后触发
          console.log("-----地图图块加载完成-----");
          this.map = map;
          resolve();
        });        
      }
    });
  }

  fitMap(markers) {
    this.map.setFitView();// 执行定位
    // if (markers && markers.length > 0) {
    //   let zoom = 10;
    //   let marker = markers[0];

    //   this.map.setZoomAndCenter(zoom, [marker.getPosition().getLng(), marker.getPosition().getLat()]);// 执行定位
    // }
  }

  checkChange(event) {
    console.log("selected Changes---->" + event);
    this.lastSelectedMarkers = this.lastSelectedMarkers.concat(this.selectedMarkers);
    this.selectedMarkers = [];
    if (this.checkState.min) {
      this.selectedMarkers = this.selectedMarkers.concat(this.minMarkers);
    }
    if (this.checkState.level1) {
      this.selectedMarkers = this.selectedMarkers.concat(this.level1Markers);
    }
    if (this.checkState.level2) {
      this.selectedMarkers = this.selectedMarkers.concat(this.level2Markers);
    }
    if (this.checkState.other) {
      this.selectedMarkers = this.selectedMarkers.concat(this.otherMarkers);
    }

    this.showSelected();
  }

  showSelected() {
    if (this.map == null || this.map == undefined) {
      return;
    }
    if (this.massMarks == undefined) {
      this.massMarks = new AMap.MassMarks(this.selectedMarkers, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: this.style
      });
      this.massMarks.on('click', (marker) => {
        this.onMassMarksClick(marker);
      });
    } else {
      this.massMarks.clear();
    }

    this.lastSelectedMarkers = [];
    // this.map.add(this.selectedMarkers);
    // this.fitMap(this.selectedMarkers);
    // 将数组设置到 massMarks 图层
    this.massMarks.setData(this.selectedMarkers);

    // 将 massMarks 添加到地图实例
    this.massMarks.setMap(this.map);
  }

  onMassMarksClick(marker){
    console.log("massMarks click---->" + marker.data);
    //构建信息窗体中显示的内容  
    var info = [];
    info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>" + marker.data.name + "</b>");
    info.push(marker.data.extData.adress);
    info.push(marker.data.extData.dateStr);
    info.push("</div></div>");
    var inforWindow = new AMap.InfoWindow({
      content: info.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容 
      offset: new AMap.Pixel(3, -4)
    });
    inforWindow.open(this.map, marker.data.position);
  }

}
