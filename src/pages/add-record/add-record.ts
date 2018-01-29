import { BasePage } from './../base/base';
import { UploadManagerProvider } from './../../providers/upload-manager/upload-manager';;
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  // gatherDate:string = "2018-01-10";
  proofName: string = "";
  proofLevel: string = "";
  speciesName: string = "";

  proof = '保护区';
  proofArr: any = [
    {
      name: '保护状况',
      options: [
        { text: '保护区', value: '保护区' },
        { text: '保护小区', value: '保护小区' },
        { text: '森林公园', value: '森林公园' },
        { text: '风景名胜区', value: '风景名胜区' },
        { text: '其他', value: '其他' }
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

  aspect = '正东';
  aspects: any = [
    {
      name: '方位',
      options: [
        { text: '正东', value: '正东' },
        { text: '正西', value: '正西' },
        { text: '正南', value: '正南' },
        { text: '正北', value: '正北' },
        { text: '东南', value: '东南' },
        { text: '东北', value: '东北' },
        { text: '西南', value: '西南' },
        { text: '西北', value: '西北' }
      ]
    }
  ];

  degree = '30°';
  degrees: any = [
    {
      name: '坡度',
      options: [
        { text: '30°', value: '30°' },
        { text: '60°', value: '60°' },
        { text: '90°', value: '90°' },
        { text: '120°', value: '120°' },
        { text: '150°', value: '150°' },
        { text: '180°', value: '180°' }
      ]
    }
  ];

  position = '脊';
  positions: any = [
    {
      name: '位置',
      options: [
        { text: '脊', value: '脊' },
        { text: '上', value: '上' },
        { text: '中', value: '中' },
        { text: '下', value: '下' },
        { text: '谷底', value: '谷底' },
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
  intensity = '强';
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


  knowPeopleArray = [];
  imgArray = [];
  plants = [];
  data = {
    userName: AppServiceProvider.getInstance().userinfo.loginData.userName,//用户名
    date: "2018-01-10",//日期
    target: "",//目标植物
    county:"",
    address: "",//地址
    alt: "", //海拔
    lat: "", //纬度
    lng: "", //经度
    spot: "",//小地名
    proof: "保护区",//就地保护状况
    proofName: "",//保护区名称 proof为其他是才显示
    proofLevel: "",//proof 为其他时才显示
    method: "实测法",//调查方法
    mainSampleNo: "",//主样方编号
    evnDesc: "",//环境描述
    mainSampleArea: "",//主样方面积
    community: "",//群落名称
    communityArea: "",//群落面积
    aspect: "正东",//坡向
    degree: "30°",//坡度
    position: "脊",//坡位
    crownDensity: "",//郁闭度
    coverage: "",//盖度
    soilType: "",//土壤类型
    soilPH: "",//土壤PH
    interference: "采集",//人为干扰方式
    interferenceName: "",//干扰方式为其他时才生效
    intensity: "强",//人为干扰强度
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
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public device:DeviceIntefaceServiceProvider,private datePipe:TydatePipe,private upManager:UploadManagerProvider) {
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
    if (this.locantionDes == "获取位置失败,点击重新获取") {
      this.locantionDes = "正在获取位置信息";
      this.device.push("location","",msg =>{
        let obj = JSON.parse(msg);
        this.data.county=  obj.county;
        this.data.lat = obj.lat;
        this.data.lng = obj.lng;
        this.data.alt = obj.alt;
        this.data.address = obj.address;
        this.locantionDes = "位置";
      },err => {
        // this.toast(err);
        this.locantionDes = "获取位置失败,点击重新获取";
        console.log("push failed");
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRecordPage');

  }
  ionViewWillEnter() {

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

  //提交记录
  commitClick() {
    console.log("提交按钮点击");
    // console.log(JSON.stringify(this.data));
    //异常判断 暂时保存
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
