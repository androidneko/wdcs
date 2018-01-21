import { MessagePageModule } from './../pages/message/message.module';
import { RegistPageModule } from './../pages/regist/regist.module';
import { UploadPlantManagerPageModule } from './../pages/upload-plant-manager/upload-plant-manager.module';
import { AddRecordPageModule } from './../pages/add-record/add-record.module';
import { LoginPageModule } from './../pages/login/login.module';
import { PersonalInfoPageModule } from './../pages/personal-info/personal-info.module';
import { Events } from 'ionic-angular/util/events';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistPage } from '../pages/regist/regist';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { WebDbServiceProvider } from '../providers/web-db-service/web-db-service';
import { HomePageModule } from '../pages/home/home.module';
import { BuildingPageModule } from '../pages/building/building.module';

export interface PageInterface {
  title: string;
  name: string;
  component: any;//对应跳转的独立页面
  icon: string;
  ios?:string;
  md?:string;
  logsOut?: boolean;
  index?: number; //tab index,如非tab页面，可空
  tabName?: string;
  tabComponent?: any;//对应跳转的tab页面
  leafPage?: any;//是否可为子页面
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  loggedInPages: PageInterface[] = [
    { title: '首页', name: 'HomePage', component: HomePageModule, icon: 'home',ios:"ios-home-outline",md:"ios-home-outline"},
    { title: '物种采集', name: 'AddRecordPage', component: AddRecordPageModule, icon: 'camera',ios:"ios-camera-outline",md:"ios-camera-outline",leafPage:true },
    { title: '上传管理', name: 'UploadPlantManagerPage', component: UploadPlantManagerPageModule, icon: 'cloud-upload',ios:"ios-cloud-upload-outline",md:"ios-cloud-upload-outline",leafPage:true },
    { title: '个人信息', name: 'PersonalInfoPage', component: PersonalInfoPageModule, icon: 'contact',ios:"ios-contact-outline",md:"ios-contact-outline",leafPage:true },
    { title: '推送消息', name: 'MessagePage', component: MessagePageModule, icon: 'chatboxes',ios:"ios-chatboxes-outline",md:"ios-chatboxes-outline",leafPage:true },
    { title: '设置', name: 'SettingPage', component: SettingPage, icon: 'settings' ,ios:"ios-settings-outline",md:"ios-settings-outline",leafPage:true },
    { title: '登出', name: 'LoginPage', component: LoginPageModule, icon: 'exit',ios:"ios-exit-outline",md:"ios-exit-outline", logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: '登录', name: 'LoginPage', component: LoginPageModule, icon: 'log-in' },
    { title: '注册', name: 'RegistPage', component: RegistPageModule, icon: 'person-add' }
  ];
  rootPage: any;
  avatarUrl: string = "assets/imgs/author_logo2.png";
  logoUrl: string = "assets/imgs/test.png";
  userName:string = "androidcat";

  constructor(
    public db:WebDbServiceProvider,
    public menu: MenuController,
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events:Events) {
    //注册登录事件监听，改变侧滑菜单
    this.listenToLoginEvents();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
       //判断登录状态，并跳转
       this.db.getString(this.HAS_SEEN_TUTORIAL,(hasSeenTutorial)=>{
        this.db.getString(this.HAS_LOGGED_IN,(hasLoggedIn)=>{
          this.enableMenu(hasLoggedIn);
          this.platformReady(hasLoggedIn);
        });
      },(failure)=>{
  
      });
    });


  }

  enableMenu(loggedIn: boolean) {
    if (loggedIn){
      this.menu.enable(loggedIn, 'loggedInMenu');
    }else {
      this.menu.enable(!loggedIn, 'loggedOutMenu');
    }
  }

  platformReady(hasLoggedIn) {
    if (hasLoggedIn){
      this.rootPage = HomePage;
    }else {
      this.rootPage = LoginPage;
    }    
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  isActive(page: PageInterface):boolean {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return true;
      }
      return false;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return true;
    }
    return false;
  }

  openPage(page: PageInterface) {
    let params = {};
    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    // 从我们定义的PageInterface的结构来判断当前页面是tab框架子页面还是普通page
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    //这一段是如果当前app采用了tab的框架，那么tab页面之间的切换就不用重复setRoot，而是用tab index定位
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      //这里处理非tab框架的页面跳转，处于便利性考虑，目前我们将所有页面声明位MyApp的module，使用push的方式跳转
      if (page.leafPage){
        this.nav.push(page.name);
      }else {
        this.nav.setRoot(page.name, params).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);
        });
      }
      
      //this.nav.push(page.name);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.events.publish('user:logout');
      this.db.saveString(this.HAS_LOGGED_IN,false);
    }
  }
}
