import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
/**
 * Generated class for the NewInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-info',
  templateUrl: 'new-info.html',
})
export class NewInfoPage {

  name:String="";
  number:String = "";
  delay:String = "";//采样深度
  altitude:String = "";//海拔
  weight:string = "";//样品重量
  constructor(public navCtrl: NavController, public navParams: NavParams,private file: File) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewInfoPage');
  }
  save(){
    console.log("保存");
    let filename = "catchdata1.text";
    console.log(this.file.dataDirectory);

    this.file.writeFile(this.file.dataDirectory,filename,"12312312321312 哈哈",{replace:true}).then((success)=>{
      console.log("succceds");
    }).catch((err)=>{

      console.log(err);
    });
 
  }
  add(){
    console.log("添加");
    let filename = "catchdata.text";
    this.file.listDir(this.file.dataDirectory,"").then((success)=>{
      console.log(success);
      this.file.readAsText(this.file.dataDirectory,filename).then((success)=>{
        console.log("213213/"+success);
      }).catch((err)=>{
        console.log(err);
      });
    }).catch((err)=>{
      console.log(err);
    });
  }
}
