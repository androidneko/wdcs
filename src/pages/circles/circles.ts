import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
   imgArray=[["assets/imgs/splash.jpg"],["assets/imgs/logo.png","assets/imgs/splash.jpg","assets/imgs/logo.png","assets/imgs/logo.png"]];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclesPage');
  }

}
