import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-record',
  templateUrl: 'add-record.html',
})
export class AddRecordPage {
  gatherDate:string = "2018-01-10";
  speciesName:string = "";

  proof = '保护区';
  proofArr:any = [
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

  method = '实测法';
  methods:any = [
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

  bearing = '正东';
  bearings:any = [
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
  degrees:any = [
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
  positions:any = [
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
  interferences:any = [
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

  intensity = '强';
  intensities:any = [
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRecordPage');
  }

  gotoPlantDetail(){
    this.navCtrl.push("PlantDetailPage");
  }
  addKnowPeople(){
    this.navCtrl.push("KnowPeoplePage");
  }
  photoClik(){
    this.navCtrl.push("PhotoSelectsPage");
  }
}
