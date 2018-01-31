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
  coSampleNum:string = "";
  seedlingNum:string = "";
  saplingNum:string = "";
  // plants:any = [];
  
  state = "1";
  detailInfo = {
    coSampleNum:"",//副样方数
    targetCoSampleNum:"",//目的物种副样方数
    lifeForm:[{checked:false,name:"乔木"},{checked:false,name:"灌木"},{checked:false,name:"草本"},{checked:false,name:"藤本"},{checked:false,name:"常绿"},{checked:false,name:"落叶"},{checked:false,name:"一年生"},{checked:false,name:"多年生"},{checked:false,name:"木质"},{checked:false,name:"肉质"}],//目的物种生活型
    seedlingNum :"",//幼苗
    saplingNum:"",//幼树
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
  
  keydown(event){
    if(event.keyCode==13){
      //返回确定按钮
      event.target.blur();
      return false;
    }
  }
  done(){
    this.navCtrl.pop();
  }
}
