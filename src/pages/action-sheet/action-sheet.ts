import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ActionSheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-action-sheet',
  templateUrl: 'action-sheet.html',
})
export class ActionSheetPage {
  dataArray:Array<any>=[];
  isChecked:boolean= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
    this.dataArray = this.navParams.get("dataObj");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionSheetPage');
  }
  itemClick(item)
  {
      this.updateItem(item);
      var callback = this.navParams.get("callback");
      callback(item);
      this.viewCtrl.dismiss();
  }
  
  private updateItem(item)
  {
    //其他置为false
    this.dataArray.forEach(element => {
        if(element.name !=item.name)
        {
          element.isCheck = !item.isCheck;
        }
      });
  }

  dismissClick()
  {
    this.viewCtrl.dismiss();
  }
}
