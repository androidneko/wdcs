import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuildingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingPage {

  url:string = "assets/imgs/splash.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingPage');
  }
  ionViewWillUnload(){
    console.log("BuildingPage ViewWillUnload");
  }
}
