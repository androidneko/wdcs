import { Events,Tabs} from 'ionic-angular';
import { AppServiceProvider } from './../../providers/app-service/app-service';
import { Component,ViewChild } from '@angular/core';

// import { HomePage } from '../home/home';
import { BusinessPage } from '../business/business';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = BusinessPage;
  userType:String = '1';

  @ViewChild('test1')  tabs:Tabs;
  constructor(public navCtrl:NavController,public events:Events,) {
    this.userType = AppServiceProvider.getInstance().userinfo.merUser.userType;
    events.subscribe('logoutNotification',()=>{
      this.navCtrl.setRoot("LoginPage");
    });
    
    events.subscribe('enterFirstTabbar',()=>{

      this.tabs.select(0);
    });
  }
  ionViewWillUnload(){
    console.log("unload");
    this.events.unsubscribe("logoutNotification");
  }

}
