import { Events,Tabs} from 'ionic-angular';
import { AppServiceProvider } from './../../providers/app-service/app-service';
import { MyClientPage } from './../my-client/my-client';
import { MyClientManagerPage } from './../my-client-manager/my-client-manager';
import { SalesPage } from './../sales/sales';
import { Component,ViewChild } from '@angular/core';

// import { HomePage } from '../home/home';
import { BusinessPage } from '../business/business';
import { IonicPage, NavController } from 'ionic-angular';
import { OperationsStatementPage } from '../operations-statement/operations-statement';
import { DiscoveryPage } from '../discovery/discovery';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = BusinessPage;
  tab2Root = SalesPage;
  tab3Root = DiscoveryPage;
  tab4Root = MyClientPage;
  tab5Root = MyClientManagerPage;
  tab6Root = OperationsStatementPage;
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
