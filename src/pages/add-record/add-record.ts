import { BasePage } from './../base/base';
import { UploadManagerProvider } from './../../providers/upload-manager/upload-manager';;
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { DeviceIntefaceServiceProvider } from '../../providers/device-inteface-service/device-inteface-service';
import { TydatePipe } from '../../pipes/tydate/tydate';
import { AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the AddRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers:[TydatePipe],
  selector: 'page-add-record',
  templateUrl: 'add-record.html',
})
export class AddRecordPage extends BasePage{

  state = "1";//1可编辑状态 0不可编辑状态
  isShowApplying = false;//是否显示正在申请中

  locantionDes="位置";
  province = "";
  county = "";
  street = "";
  // gatherDate:string = "2018-01-10";
  protectionName: string = "";
  protectionLevel: string = "";
  speciesName: string = "";

  protection = '国家级 自然保护区';
  proofArr: any = [
    {
      name: '级别',
      options: [
        { text: '国家级', value: '国家级' },
        { text: '省级', value: '省级' },
        { text: '市级', value: '市级' },
        { text: '县级', value: '县级' },
        { text: '其他', value: '' }
      ]
    },
    {
      name: '保护状况',
      options: [
        { text: '自然保护区', value: '自然保护区'},
        { text: '森林公园', value: '森林公园'},
        { text: '湿地公园', value: '湿地公园' },
        { text: '风景名胜区', value: '风景名胜区'},
        { text: '保护小区', value: '保护小区'}
      ]
    }
  ];

  proofOther = "";//保护状况其他;
  method = '实测法';
  methods: any = [
    {
      name: '调查方法',
      options: [
        { text: '实测法', value: '实测法' },
        { text: '样方法', value: '样方法' },
        { text: '样圆法', value: '样圆法' },
        { text: '样线法', value: '样线法' },
        { text: '系统抽样法', value: '系统抽样法' }
      ]
    }
  ];

  aspect = '北坡';
  aspects: any = [
    {
      name: '方位',
      options: [
        { text: '北坡', value: '北坡' },
        { text: '东北破', value: '东北破' },
        { text: '东坡', value: '东坡' },
        { text: '东南坡', value: '东南坡' },
        { text: '南坡', value: '南坡' },
        { text: '西南坡', value: '西南坡' },
        { text: '西坡', value: '西坡' },
        { text: '西北坡', value: '西北坡' },
        { text: '无坡向', value: '无坡向' }
      ]
    }
  ];

  slope = '平坡';
  degrees: any = [
    {
      name: '坡度',
      options: [
        { text: '平坡', value: '平坡' },
        { text: '缓坡', value: '缓坡' },
        { text: '斜坡', value: '斜坡' },
        { text: '急坡', value: '急坡' },
        { text: '陡坡', value: '陡坡' },
        { text: '险坡', value: '险坡' }
      ]
    }
  ];

  slopePosition = '脊部';
  positions: any = [
    {
      name: '位置',
      options: [
        { text: '脊部', value: '脊部' },
        { text: '上坡', value: '上坡' },
        { text: '中坡', value: '中坡' },
        { text: '下坡', value: '下坡' },
        { text: '山谷', value: '山谷' },
        { text: '平地', value: '平地' }
      ]
    }
  ];

  interference = '采集';
  interferences: any = [
    {
      name: '干扰',
      options: [
        { text: '采集', value: '采集' },
        { text: '狩猎', value: '狩猎' },
        { text: '放牧', value: '放牧' },
        { text: '开矿', value: '开矿' },
        { text: '开荒', value: '开荒' },
        { text: '其他', value: '其他' }
      ]
    }
  ];
  interferenceOther = "";
  interferenceLevel = '强';
  intensities: any = [
    {
      name: '强度',
      options: [
        { text: '强', value: '强' },
        { text: '中', value: '中' },
        { text: '弱', value: '弱' },
        { text: '无', value: '无' }
      ]
    }
  ];

  crownDensities:any = [
    {
      name: '郁闭度',
      options: [
        { text: '0', value: '0' },
        { text: '0.1', value: '0.1' },
        { text: '0.2', value: '0.2' },
        { text: '0.3', value: '0.3' },
        { text: '0.4', value: '0.4' },
        { text: '0.5', value: '0.5' },
        { text: '0.6', value: '0.6' },
        { text: '0.7', value: '0.7' },
        { text: '0.8', value: '0.8' },
        { text: '0.9', value: '0.9' },
        { text: '1', value: '1' }
      ]
    }
  ];

  // soilType:any = [
  //   {
  //     name: '土纲',
  //     options: [
  //       { text: '铁铝土', value: '1' },
  //       { text: '淋溶土', value: '2' },
  //       { text: '初育土', value: '3' },
  //       { text: '半水成土', value: '4' },
  //       { text: '人为土', value: '5' }
  //     ]
  //   },
  //   {
  //     name: '土类',
  //     options: [
  //       { text: '红壤', value: 'A13', parentVal: '1' },
  //       { text: '黄壤', value: 'A21', parentVal: '1' },
  //       { text: '黄棕壤', value: 'B11' , parentVal: '2'},
  //       { text: '山地棕壤', value: 'B21' , parentVal: '2'},
  //       { text: '山地暗棕壤', value: 'B31' , parentVal: '2'},
  //       { text: '石灰土', value: 'G21', parentVal: '3' },
  //       { text: '紫色土', value: 'G23' , parentVal: '3'},
  //       { text: '山地草甸土', value: 'H11' , parentVal: '4'},
  //       { text: '潮土', value: 'H21' , parentVal: '4'},
  //       { text: '水稻土', value: 'L11' , parentVal: '5'}
  //     ]
  //   }
  // ];
  soilType:any = [
    {
      name: '土类',
      options: [
        { text: '红壤', value: 'A13' },
        { text: '黄壤', value: 'A21'},
        { text: '黄棕壤', value: 'B11'},
        { text: '山地棕壤', value: 'B21'},
        { text: '山地暗棕壤', value: 'B31'},
        { text: '石灰土', value: 'G21'},
        { text: '紫色土', value: 'G23'},
        { text: '山地草甸土', value: 'H11'},
        { text: '潮土', value: 'H21'},
        { text: '水稻土', value: 'L11'}
      ]
    }
  ];

  mainSampleAreaOther = '';
  mainSampleAreas:any = [
    {
      name: '主样方面积',
      options: [
        { text: '20m*20m', value: '20' },
        { text: '10m*10m', value: '10' },
        { text: '5m*5m', value: '5' },
        { text: '1m*1m', value: '1' }
      ]
    }
  ];

  knowPeopleArray = [];
  imgArray = [];
  plants = [];
  data = {
    userName: AppServiceProvider.getInstance().userinfo.userData.nickName?AppServiceProvider.getInstance().userinfo.userData.nickName:AppServiceProvider.getInstance().userinfo.loginData.userName,//用户名
    date: "2018-01-10",//日期
    target: "",//目标植物
    county:"",
    address: "",//地址
    alt: "", //海拔
    lat: "", //纬度
    lng: "", //经度
    spot: "",//小地名
    protection: "国家级 自然保护区",//就地保护状况
    protectionName: "",//保护区名称 proof为其他是才显示
    protectionLevel: "",//protection 为其他时才显示
    method: "实测法",//调查方法
    mainSampleNum: "",//主样方编号
    evnDesc: "",//环境描述
    mainSampleArea: "20",//主样方面积
    community: "",//群落名称
    communityArea: "",//群落面积
    aspect: "北坡",//坡向
    slope: "平坡",//坡度
    slopePosition: "脊部",//坡位
    crownDensity: "0",//郁闭度
    coverage: "",//盖度
    soilType: "A13",//土壤类型
    soilPH: "",//土壤PH
    interference: "采集",//人为干扰方式
    interferenceName: "",//干扰方式为其他时才生效
    interferenceLevel: "强",//人为干扰强度
    treeLayerDominant: "",//乔木层优势种
    treeLayerAuxiliary: "",//乔木层优势伴生种
    bushLayerDominant: "",//灌木层优势种
    bushLayerAuxiliary: "",//灌木层伴生种
    herbageLayerDominant: "",//草本层优势种
    herbageLayerAuxiliary: "",//草本层伴生种
    insiders: [],//知情者
    pictures: [],//图片
    detailInfo: {
      coSampleNum: "",//副样方数
      targetCoSampleNum: "",//目的物种副样方数
      lifeForm: [{ checked: false, name: "乔木" }, { checked: false, name: "灌木" }, { checked: false, name: "草本" }, { checked: false, name: "藤本" }, { checked: false, name: "常绿" }, { checked: false, name: "落叶" }, { checked: false, name: "一年生" }, { checked: false, name: "多年生" }, { checked: false, name: "木质" }, { checked: false, name: "肉质" }],//目的物种生活型
      seedlingNum: "",//幼苗
      saplingNum: "",//幼树
      pluntList: [],
    }
  };
  constructor(public modalCtrl: ModalController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public device:DeviceIntefaceServiceProvider,private datePipe:TydatePipe,private upManager:UploadManagerProvider) {
    super(navCtrl,navParams,toastCtrl);
    if (this.navParams.data.state != null) {
      this.state = this.navParams.data.state;
    }
    if (this.navParams.data.isShowApplying != null) {
      this.state = '0';
      this.isShowApplying = this.navParams.data.isShowApplying;
    }
    if (this.navParams.data.data != null) {
      this.data = this.navParams.data.data;
    }else{
      //时间赋值
      //用户名赋值

      this.data.date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    
    }
    if (this.state == "1"&&this.data.lat.length == 0) {
      this.locantionDes = "正在获取位置信息";
      this.device.push("location","",msg =>{
        let obj = JSON.parse(msg);
        this.data.county=  obj.county;
        this.data.lat = obj.lat;
        this.data.lng = obj.lng;
        this.data.alt = obj.alt;
        this.data.spot = obj.street;
        this.province = obj.province;
        this.county = obj.county;
        this.street = obj.street;
        this.data.address = obj.address;

        this.locantionDes = "位置";
      },err => {
        // this.toast(err);
        this.locantionDes = "获取位置失败,点击重新获取";
        console.log("push failed");
      });
    }
  
  }
  locationClick(){
      this.locantionDes = "正在获取位置信息";
      this.device.push("location","",msg =>{
        let obj = JSON.parse(msg);
        this.data.county=  obj.county;
        this.data.lat = obj.lat;
        this.data.lng = obj.lng;
        this.data.alt = obj.alt;
        this.data.address = obj.address;
        this.data.spot = obj.street;
        this.province = obj.province;
        this.county = obj.county;
        this.street = obj.street;
        this.locantionDes = "位置";
      },err => {
        // this.toast(err);
        this.locantionDes = "获取位置失败,点击重新获取";
        console.log("push failed");
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRecordPage');

  }
  ionViewWillEnter() {

  }

  showNameTip(){
    let profileModal = this.modalCtrl.create("TipCommunityNamePage");
    profileModal.present();
  }

  showAreaTip(){
    let profileModal = this.modalCtrl.create("TipCommunityAreaPage");
    profileModal.present();
  }

  gotoPlantDetail() {
    this.navCtrl.push("PlantDetailPage", {
      state: this.state,
      detailInfo: this.data.detailInfo
    }
    );
  }
  addKnowPeople() {
    this.navCtrl.push("KnowPeopleDetailPage", { state: this.state, knowPeopleArray: this.data.insiders });
  }
  photoClik() {

    this.navCtrl.push("PhotoSelectsPage", {
      state: this.state,
      imgArray: this.data.pictures
    });
  }

  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      return false;
    }
  }

  //提交记录
  commitClick() {
    console.log("提交按钮点击");
    console.log(this.data.protection);
    // console.log(JSON.stringify(this.data));
    //异常判断 暂时保存

    if (this.data.target=="") {
      this.toast("请输入目标植物");
      return;
    }
    if (this.data.county == "") {
      this.toast("请刷新获取当前位置");
      return;
    }
    this.data.mainSampleNum = this.province+"-"+this.county+"-"+this.data.target;

    if (this.data.spot == "") {
      this.toast("请输入小地名");
      return;
    }
    if (this.data.evnDesc == "") {
      this.toast("请输入环境描述");
      return;
    }
    if (this.data.community == "community") {
      this.toast("请输入群落名称");
      return;
    }
    if (this.data.communityArea == "") {
      this.toast("请输入群落面积");
      return;
    }
    if (this.data.communityArea == "" && this.data.coverage == "") {
      this.toast("请输入郁闭度或盖度");
      return;
    }
    if (this.data.soilType == "") {
      this.toast("请输入土壤类型");
      return;
    }
    if (this.data.soilPH == "") {
      this.toast("请输入土壤PH");
      return;
    }
    if (this.data.pictures.length>0) {
      for (let index = 0; index < 3; index++) {
        let item = this.data.pictures[index];
        if (item.picUrl == "assets/imgs/addphoto.png") {
          this.toast("前三张照片不能为空");
            return;
        }
     
     }
    }else{
      this.toast("请选择照片");
      return;
    }
    this.upManager.successed = ()=>{

      this.navCtrl.pop();
    };

    this.upManager.uploadWithData(this.data);

  }
}
