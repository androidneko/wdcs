import { ChartBarComponent } from './../components/chart-bar/chart-bar';
import { DbServiceProvider } from './../providers/db-service/db-service';
import { Events } from 'ionic-angular/util/events';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Keyboard, IonicApp, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { DeviceIntefaceServiceProvider } from '../providers/device-inteface-service/device-inteface-service';

export interface PageInterface {
  title: string;
  name: string;
  component: any;//对应跳转的独立页面
  icon: string;
  ios?: string;
  md?: string;
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
  @ViewChild(ChartBarComponent) chartBar:ChartBarComponent;
  backButtonPressed: boolean = false;
  rootPage: any;
  rootPages:Array<string> = ["CirclesPage","HomePage","LoginPage","RegistPage","ForgetPasswordPage"];
  avatarUrl: string = "assets/imgs/author_logo2.png";
  logoUrl: string = "assets/imgs/visitor.png";
  userName: string = "androidcat";

  hasLoggedIn:boolean = false;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  // loggedInPages: PageInterface[] = [
  //   { title: '首页', name: 'HomePage', component: HomePage, icon: 'home', ios: "ios-home-outline", md: "ios-home-outline",index:0 },
  //   { title: '物种采集', name: 'AddRecordPage', component: AddRecordPage, icon: 'camera', ios: "ios-camera-outline", md: "ios-camera-outline", leafPage: true },
  //   { title: '上传管理', name: 'UploadPlantManagerPage', component: UploadPlantManagerPage, icon: 'cloud-upload', ios: "ios-cloud-upload-outline", md: "ios-cloud-upload-outline", leafPage: true },
  //   { title: '推送消息', name: 'MessagePage', component: MessagePage, icon: 'chatboxes', ios: "ios-chatboxes-outline", md: "ios-chatboxes-outline", leafPage: true },
  //   { title: '个人信息', name: 'PersonalInfoPage', component: PersonalInfoPage, icon: 'contact', ios: "ios-contact-outline", md: "ios-contact-outline", leafPage: true },
  //   { title: '修改密码', name: 'ModifyPwdPage', component: ModifyPwdPage, icon: 'unlock', ios: "ios-unlock-outline", md: "ios-unlock-outline", leafPage: true },
  //   { title: '登出', name: 'LoginPage', component: LoginPage, icon: 'exit', ios: "ios-exit-outline", md: "ios-exit-outline", logsOut: true }
  // ];

  loggedInPages: PageInterface[] = [
    { title: '首页', name: 'CirclesPage', component: "CirclesPage", icon: 'aperture', ios: "ios-aperture-outline", md: "ios-aperture-outline",index:0 },
    { title: '物种采集', name: 'AddRecordPage', component: "AddRecordPage", icon: 'camera', ios: "ios-camera-outline", md: "ios-camera-outline", leafPage: true },
    { title: '上传管理', name: 'UploadPlantManagerPage', component: "UploadPlantManagerPage", icon: 'cloud-upload', ios: "ios-cloud-upload-outline", md: "ios-cloud-upload-outline", leafPage: true },
    { title: '推送消息', name: 'MessagePage', component: "MessagePage", icon: 'chatboxes', ios: "ios-chatboxes-outline", md: "ios-chatboxes-outline", leafPage: true },
    { title: '个人信息', name: 'PersonalInfoPage', component: "PersonalInfoPage", icon: 'contact', ios: "ios-contact-outline", md: "ios-contact-outline", leafPage: true },
    { title: '修改密码', name: 'ModifyPwdPage', component: "ModifyPwdPage", icon: 'unlock', ios: "ios-unlock-outline", md: "ios-unlock-outline", leafPage: true },
    { title: '登出', name: 'LoginPage', component: "LoginPage", icon: 'exit', ios: "ios-exit-outline", md: "ios-exit-outline", logsOut: true }
  ];

  loggedInManagerPages: PageInterface[] = [
    { title: '首页', name: 'HomePage', component: "HomePage", icon: 'home', ios: "ios-home-outline", md: "ios-home-outline",index:0 },
    { title: '物种采集', name: 'AddRecordPage', component: "AddRecordPage", icon: 'camera', ios: "ios-camera-outline", md: "ios-camera-outline", leafPage: true },
    { title: '上传管理', name: 'UploadPlantManagerPage', component: "UploadPlantManagerPage", icon: 'cloud-upload', ios: "ios-cloud-upload-outline", md: "ios-cloud-upload-outline", leafPage: true },
    { title: '推送消息', name: 'MessagePage', component: "MessagePage", icon: 'chatboxes', ios: "ios-chatboxes-outline", md: "ios-chatboxes-outline", leafPage: true },
    { title: '个人信息', name: 'PersonalInfoPage', component: "PersonalInfoPage", icon: 'contact', ios: "ios-contact-outline", md: "ios-contact-outline", leafPage: true },
    { title: '修改密码', name: 'ModifyPwdPage', component: "ModifyPwdPage", icon: 'unlock', ios: "ios-unlock-outline", md: "ios-unlock-outline", leafPage: true },
    { title: '登出', name: 'LoginPage', component: "LoginPage", icon: 'exit', ios: "ios-exit-outline", md: "ios-exit-outline", logsOut: true }
  ];

  // loggedInManagerPages: PageInterface[] = [
  //   { title: '首页', name: 'CirclesPage', component: CirclesPage, icon: 'aperture', ios: "ios-aperture-outline", md: "ios-aperture-outline",index:0 },
  //   { title: '物种采集', name: 'AddRecordPage', component: AddRecordPage, icon: 'camera', ios: "ios-camera-outline", md: "ios-camera-outline", leafPage: true },
  //   { title: '上传管理', name: 'UploadPlantManagerPage', component: UploadPlantManagerPage, icon: 'cloud-upload', ios: "ios-cloud-upload-outline", md: "ios-cloud-upload-outline", leafPage: true },
  //   { title: '推送消息', name: 'MessagePage', component: MessagePage, icon: 'chatboxes', ios: "ios-chatboxes-outline", md: "ios-chatboxes-outline", leafPage: true },
  //   { title: '个人信息', name: 'PersonalInfoPage', component: PersonalInfoPage, icon: 'contact', ios: "ios-contact-outline", md: "ios-contact-outline", leafPage: true },
  //   { title: '修改密码', name: 'ModifyPwdPage', component: ModifyPwdPage, icon: 'unlock', ios: "ios-unlock-outline", md: "ios-unlock-outline", leafPage: true },
  //   { title: '修改密码', name: 'ModifyPwdPage', component: ModifyPwdPage, icon: 'unlock', ios: "ios-unlock-outline", md: "ios-unlock-outline", leafPage: true },
  //   { title: '登出', name: 'LoginPage', component: LoginPage, icon: 'exit', ios: "ios-exit-outline", md: "ios-exit-outline", logsOut: true }
  // ];

  loggedOutPages: PageInterface[] = [
    { title: '登录', name: 'LoginPage', component: "LoginPage", icon: 'log-in' },
    { title: '注册', name: 'RegistPage', component: "RegistPage", icon: 'person-add' },
    { title: '忘记密码', name: 'ForgetPasswordPage', component: "ForgetPasswordPage", icon: 'key' }
  ];

  constructor(
    public db:DbServiceProvider,
    public menu: MenuController,
    public platform: Platform,
    public ionicApp:IonicApp,
    public statusBar: StatusBar,
    public toastCtrl: ToastController,
    public keyboard:Keyboard,
    public splashScreen: SplashScreen,
    public device:DeviceIntefaceServiceProvider,
    public events: Events) {
    //注册登录事件监听，改变侧滑菜单
    this.listenToLoginEvents();
    this.platform.ready().then(() => {
      console.log("platform has been ready...");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      if (this.platform.is("android")) {
        this.statusBar.backgroundColorByHexString("#66bda3");
        this.registerBackButtonAction();
      }
      AppServiceProvider.getInstance().chartBar = this.chartBar;
      //判断登录状态，并跳转
      this.db.getString(this.HAS_SEEN_TUTORIAL, (hasSeenTutorial) => {
        this.db.getString(this.HAS_LOGGED_IN, (hasLoggedIn) => {
          this.enableMenu(hasLoggedIn);
          this.platformReady(hasLoggedIn);
          this.splashScreen.hide();
          // this.device.push("platform.ready");
        },()=>{
          this.splashScreen.hide();
          // this.device.push("platform.ready");
          console.log("hasLoggedIn fialded");
        });
      },()=>{
        this.splashScreen.hide();
        // this.device.push("platform.ready");
        console.log("hasSeenTutorial fialded");
      });

    // Listen to events from Native
    window.addEventListener("pushMessage",(ev) =>{
      if (this.hasLoggedIn){
        //打开推送消息页面
        this.openPage(this.loggedInPages[4]);
      }else {
        console.log("please login first")
      }
      console.log("收到pushMessage event:"+ev)
    });
    
    //一登陆的按钮要屏蔽侧滑打开
    this.menu.swipeEnable(false,'loggedInMenu');

    });
  }

  enableMenu(loggedIn: boolean) {
    if (loggedIn) {
      this.menu.enable(loggedIn, 'loggedInMenu');
    } else {
      this.menu.enable(!loggedIn, 'loggedOutMenu');
    }
  }

  platformReady(hasLoggedIn) {
    if (hasLoggedIn) {
      //this.rootPage = "HomePage";
      //this.rootPage = "HomeTabPage";
      this.rootPage = "CirclesPage";
    } else {
      this.rootPage = "LoginPage";
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.hasLoggedIn = true;
      this.userName = AppServiceProvider.getInstance().userinfo.loginData.userName;
      this.enableMenu(true);
      this.db.saveString(this.HAS_LOGGED_IN, true);
    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.hasLoggedIn = false;
      this.enableMenu(false);
      this.db.saveString(this.HAS_LOGGED_IN, false);
    });

    this.events.subscribe('userinfo:saved', () => {
      this.userName = AppServiceProvider.getInstance().userinfo.userData.nickName;
      this.avatarUrl = AppServiceProvider.getInstance().userinfo.userData.avatar;
    });
  }

  isActive(page: PageInterface): boolean {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected()) {
        let selected = childNav.getSelected().root;
        if (selected && selected === page.name){
          return true;
        }
      }
      return false;
    }

    if (this.nav.getActive() && this.nav.getActive().id === page.name) {
      return true;
    }
    return false;
  }

  gotoPersonalInfoPage() {
    this.openPage(this.loggedInPages[4]);
    this.menu.close();
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

    let act = this.nav.getActive();
    if (act && act.id === page.name) {
      this.menu.close();
      return;
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
      if (page.leafPage) {
        this.nav.push(page.name);
      } else {
        this.nav.setRoot(page.name, params).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);
        });
      }

      //this.nav.push(page.name);
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.events.publish('user:logout');
    }
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      console.log("this.keyboard.isOpen():" + this.keyboard.isOpen());
      if (this.keyboard.isOpen()) {
        //按下返回键时，先关闭键盘
        this.keyboard.close();
        return;
      };
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.gaetActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      //不写this.ionicApp._toastPortal.getActive()是因为连按2次退出
      let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      let loadingPortal = this.ionicApp._loadingPortal.getActive();

      if (activePortal) {
        //其他的关闭
        activePortal.dismiss().catch(() => {
        });
        activePortal.onDidDismiss(() => {
        });
        return;
      }
      if (loadingPortal) {
        //loading的话，返回键无效
        return;
      }
      if (this.menu.isOpen()){
          console.log("menu.isOpen:");
          this.menu.close();
          return ;
      }

      console.log("events go on ");
      if (this.rootPages.indexOf(this.nav.getActive().id) >= 0){
        return this.showExit();
      }
      //return this.nav.canGoBack() ? this.nav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即1秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 1000,
        position: 'bottom',
        cssClass: 'text-align: center'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 1000);//1秒内没有再次点击返回则将触发标志标记为false
    }
  }

}
