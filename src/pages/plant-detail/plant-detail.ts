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
  // plants:any = [];
  
  state = "1";
  detailInfo = {
    sampleNum:"",//副样方数
    desSampleNum:"",//目的物种副样方数
    desCategorys:[{checked:false,name:"乔木"},{checked:false,name:"灌木"},{checked:false,name:"草本"},{checked:false,name:"藤本"},{checked:false,name:"常绿"},{checked:false,name:"落叶"},{checked:false,name:"一年生"},{checked:false,name:"多年生"},{checked:false,name:"木质"},{checked:false,name:"肉质"}],//目的物种生活型
    seedling :"",//幼树株数
    sapling:"",//seedling
    pluntList:[],
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data.state!=null) {
      this.state = this.navParams.data.state;
    }
    if (this.navParams.data.detailInfo!=null) {
      this.detailInfo = this.navParams.data.detailInfo;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantDetailPage');
  }

  addPlant(){
    this.navCtrl.push("NewPlantPage",{index:this.detailInfo.pluntList.length+1,callback:plant=>{
      this.detailInfo.pluntList.push(plant);
   }});
  }

}
