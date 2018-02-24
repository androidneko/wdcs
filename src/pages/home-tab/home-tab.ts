import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the HomeTabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab.html'
})
export class HomeTabPage {

  mainRoot = 'HomePage'
  circlesRoot = 'CirclesPage'
  userRoot = 'PersonalInfoPage'


  constructor(public navCtrl: NavController) {}

}
