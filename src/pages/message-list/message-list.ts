import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageDetailPage } from '../message-detail/message-detail';

/**
 * Generated class for the MessageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
})
export class MessageListPage {

  list:[SystemMessageItem] = [new SystemMessageItem(0,'通知','11-22','恭喜您获恭喜您获恭喜您获恭喜您获恭喜您获得了批款，详情信息可以在我的贷款板块查看，记得按期还款'),
  new SystemMessageItem(0,'通知','11-22','sdfjkasjfsfjdjfjldkjflksd')];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MessageListPage');
    console.log(this.list.length);
  }

  openDetail(item){
    console.log('open Detail');
    console.log(item);
    console.log(item.type);
    console.log(JSON.stringify(item));
    this.navCtrl.push(MessageDetailPage);
  }

}

export class SystemMessageItem {
  type:Number = 0;  //消息类型 0通知 1系统消息
  icon:string = 'assets/imgs/logo.png';
  title:string = '通知';
  timestamp:string = '11-22 16:00';
  content:string = '恭喜您获得了批款，详情信息可以在我的贷款板块查看，记得按期还款';
  
  constructor(type:Number,title:string,timestamp:string ,content:string){
    this.type = type;
    switch (type) {
      case 0:
        this.icon = 'assets/imgs/logo.png';
        break;
    case 1:
        this.icon = 'assets/imgs/logo.png';
        break;
      default:
      this.icon = 'assets/imgs/logo.png';
        break;
    }
    this.title = title;
    this.timestamp = timestamp;
    this.content = content;
  }
}
