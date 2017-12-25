

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyRecommendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-recommend',
  templateUrl: 'my-recommend.html',
})
export class MyRecommendPage {

  items:[RecommendItem] = [{
    name:'张三',
    manager:'李四',
    timestamp:'2017-11-23',
    isDone:false,
    last:{first:"hello",
          mac:{
            upper:"upper",
            lower:"lo"
          }}
  }];

  notItems:[RecommendItem] = [{
    name:'张三1',
    manager:'李四',
    timestamp:'2017-11-23',
    isDone:true
  },{
    name:'张三2',
    manager:'李四',
    timestamp:'2017-11-23',
    isDone:true
  },{
    name:'张三3',
    manager:'李四',
    timestamp:'2017-11-23',
    isDone:true
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRecommendPage');
  }

  itemClick(item){
    console.log('click');
    // console.log(item);
    // console.log('name:'+item.name);
    // console.log(JSON.stringify(item));
    // // var object = angular.fromJson(JSON.stringify(item));
    // var obj = JSON.parse(JSON.stringify(item));
    // console.log(obj);
    // console.log(item.last.first);
    // console.log(item.last.mac);

    let str = "{\"id\":\"2031AD56-EC96-4B86-100D-29639EA96B43\",\"rssi\":-82,\"advertising\":{\"kCBAdvDataLocalName\":\"XuanPay YOUNG\",\"kCBAdvDataManufacturerData\":{},\"kCBAdvDataServiceUUIDs\":[\"FEE7\"],\"kCBAdvDataIsConnectable\":true},\"name\":\"XuanPay YOUNG\"}";
    console.log(str);
    var object = JSON.parse(str);
    console.log('obj+'+object);
    console.log('adv:'+object.advertising.kCBAdvDataLocalName);
  }
  click(){
    this.items.push({
      name:'张三',
      manager:'李四',
      timestamp:'2017-11-23',
      isDone:false
    });
  }

}

export class RecommendItem {
  // name:string = '某某';
  // manager:string = '张三';
  // timestamp:string = '2017-11-22';
  // isDone:Boolean = false;

  constructor( name:string, manager:string , timestamp:string,isDone:Boolean = false,last:LastName){
    // this.name = name;
    // this.manager = manager;
    // this.timestamp;
    // this.isDone = isDone;
  }
}

export class LastName {
  constructor(first:string,mac:Mac){

  }
}

export class Mac{
  constructor(uper:string,lower:string){

  }
}