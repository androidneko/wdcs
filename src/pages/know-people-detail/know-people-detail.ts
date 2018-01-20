import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KnowPeopleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-know-people-detail',
  templateUrl: 'know-people-detail.html',
})
export class KnowPeopleDetailPage {
  state:"1";//1编辑 0不可编辑
  knowPeopleArray:Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data.state!=null) {
      this.state = this.navParams.data.state;
    }
    if(this.navParams.data.knowPeopleArray!=null){
      this.knowPeopleArray = this.navParams.data.knowPeopleArray;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KnowPeopleDetailPage');
  }
  deleteItem(item,idx){
    this.knowPeopleArray.splice(idx,1);
  }
  addPeople(){
    this.navCtrl.push("KnowPeoplePage",{
      callback:(people)=>{
        if (people !=null) {
          this.knowPeopleArray.push(people);
        }
      }
    });
  }
}
