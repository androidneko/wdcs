import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlantDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plant-detail',
  templateUrl: 'plant-detail.html',
})
export class PlantDetailPage {
  sampleNum:string = "";
  seedling:string = "";
  sapling:string = "";
  plants:any = [];
  state = "1";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data.state!=null) {
      this.state = this.navParams.data.state;
    }
    if (this.navParams.data.plants!=null) {
      this.plants = this.navParams.data.plants;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantDetailPage');
  }

  addPlant(){
    this.navCtrl.push("NewPlantPage",{index:this.plants.length+1,callback:plant=>{
      this.plants.push(plant);
   }});
  }

}
