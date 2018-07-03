import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the CirclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-circles',
  templateUrl: 'circles.html',
})
export class CirclesPage {

  user: any;
  imgArray = [["assets/imgs/splash.jpg"], ["assets/imgs/logo.png", "assets/imgs/splash.jpg", "assets/imgs/logo.png", "assets/imgs/logo.png"]];
  dataArray = [{
    user: {
      userName: "老薛",
      userId: "123"
    },
    locationdes: "湖北武汉",
    descriptContent: "今天天气还可以啊",
    imgs: ["assets/imgs/splash.jpg"],//图片
    fabulous: [{
      userName: "老王",
      userId: "123"
    }, {
      userName: "老张",
      userId: "334"
    }]//点赞
  }, {
    user: {
      userName: "老钱",
      userId: "123"
    },
    locationdes: "湖北邯郸",
    descriptContent: "今天晴空万里，蓝天白云",
    imgs: ["assets/imgs/logo.png", "assets/imgs/splash.jpg", "assets/imgs/logo.png", "assets/imgs/logo.png"],
    fabulous: [{
      userName: "老薛",
      userId: "123"
    }, {
      userName: "老孙",
      userId: "334"
    }, {
      userName: "孙悟空",
      userId: "334"
    }, {
      userName: "韩立",
      userId: "334"
    }, {
      userName: "陇家老祖",
      userId: "334"
    }, {
      userName: "黑山老妖",
      userId: "334"
    }],//点赞
    comments: [
      {
        fromuser: {
          userName: "老薛",
          userId: "123"
        }, touser: {
          userName: "老薛",
          userId: "123"
        },
        content: "哈哈哈哈"
      }, {
        fromuser: {
          userName: "老钱",
          userId: "123"
        },
        content: "不错不错"
      },
      {
        fromuser: {
          userName: "老薛",
          userId: "123"
        }, touser: {
          userName: "老钱",
          userId: "123"
        },
        content: "可以可以"
      }
    ]//评论
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = AppServiceProvider.getInstance().userinfo.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclesPage');
  }

}
