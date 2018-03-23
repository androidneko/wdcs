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

  user:any;
   imgArray=[["assets/imgs/splash.jpg"],["assets/imgs/logo.png","assets/imgs/splash.jpg","assets/imgs/logo.png","assets/imgs/logo.png"]];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.user = AppServiceProvider.getInstance().userinfo.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CirclesPage');
  }

}
