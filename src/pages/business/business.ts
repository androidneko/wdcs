import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  items:Array<any>=[];
  @ViewChild("header") header;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.items=AppServiceProvider.getInstance().merMenuList;
    if (this.items.length==0) {
    this.items = [
        {
          "applicationId" : "2",
          "childList" : [
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_JHDD",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "进货订单",
              "menuNote" : "管进货-进货订单",
              "menuNumber" : "APPGJH_JHDD",
              "menuOrder" : "1",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194229229384830205838796",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_JHBB",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "进货报表",
              "menuNote" : "管进货-进货报表",
              "menuNumber" : "APPGJH_JHBB",
              "menuOrder" : "2",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194242809875269917550955",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_JHGZB",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "订单跟踪表",
              "menuNote" : "管进货-订单跟踪表",
              "menuNumber" : "APPGJH_DDGZB",
              "menuOrder" : "3",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194257045217608088805674",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_FKJL",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "付款记录",
              "menuNote" : "管进货-付款记录",
              "menuNumber" : "APPGJH_FKJL",
              "menuOrder" : "4",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194308191884715164229869",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_WDGYS",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "我的供应商",
              "menuNote" : "管进货-我的供应商",
              "menuNumber" : "APPGJH_WDGYS",
              "menuOrder" : "5",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194414750521108929477989",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGJH_WWFSQ",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "我未付谁钱",
              "menuNote" : "管进货-我未付谁钱",
              "menuNumber" : "APPGJH_WWFSQ",
              "menuOrder" : "6",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193600387153597264817682",
              "pkid" : "20171212194433105727433514386425",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            }
          ],
          "createUser" : "YF",
          "custom" : "0",
          "displayLoca" : "0",
          "iconCls" : "/",
          "menuCode" : "0",
          "menuName" : "管进货",
          "menuNote" : "管进货",
          "menuNumber" : "APPGJH",
          "menuOrder" : "1",
          "menuType" : "1",
          "menuUrl" : "app",
          "pid" : "0",
          "pkid" : "20171212193600387153597264817682",
          "state" : "open",
          "status" : "1",
          "visible" : "1"
        },
        {
          "applicationId" : "2",
          "childList" : [
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_XSDD",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "销售订单",
              "menuNote" : "管销售-销售订单",
              "menuNumber" : "APPGXS_XSDD",
              "menuOrder" : "1",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195719206711633482553839",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_XSBB",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "销售报表",
              "menuNote" : "管销售-销售报表",
              "menuNumber" : "APPGXS_XSBB",
              "menuOrder" : "2",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195730594023583613880908",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_XSDDGZB",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "销售订单跟踪表",
              "menuNote" : "管销售-销售订单跟踪表",
              "menuNumber" : "APPGXS_XSDDGZB",
              "menuOrder" : "3",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195741182049105588068066",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_WDKH",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "我的客户",
              "menuNote" : "管销售-我的客户",
              "menuNumber" : "APPGXS_WDKH",
              "menuOrder" : "4",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195753739818102710478310",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_SKJL",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "收款记录",
              "menuNote" : "管销售-收款记录",
              "menuNumber" : "APPGXS_SKJL",
              "menuOrder" : "5",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195804278100285458891809",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGXS_SWFWQ",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "谁未付我钱",
              "menuNote" : "管销售-谁未付我钱",
              "menuNumber" : "APPGXS_SWFWQ",
              "menuOrder" : "6",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193705903876809869647561",
              "pkid" : "20171212195815060133778892608381",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            }
          ],
          "createUser" : "YF",
          "custom" : "0",
          "displayLoca" : "0",
          "iconCls" : "/",
          "menuCode" : "0",
          "menuName" : "管销售",
          "menuNote" : "管销售",
          "menuNumber" : "APPGXS",
          "menuOrder" : "2",
          "menuType" : "1",
          "menuUrl" : "app",
          "pid" : "0",
          "pkid" : "20171212193705903876809869647561",
          "state" : "open",
          "status" : "1",
          "visible" : "1"
        },
        {
          "applicationId" : "2",
          "childList" : [
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGKC_WDSP",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "我的商品",
              "menuNote" : "管库存-我的商品",
              "menuNumber" : "APPGKC_WDSP",
              "menuOrder" : "1",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193839311746704208496294",
              "pkid" : "20171212200950457259812813369252",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGKC_KCCX",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "库存查询",
              "menuNote" : "管库存-库存查询",
              "menuNumber" : "APPGKC_KCCX",
              "menuOrder" : "2",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193839311746704208496294",
              "pkid" : "20171212201001944282421799346922",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGKC_CRKMX",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "出入库明细",
              "menuNote" : "管库存-出入库明细",
              "menuNumber" : "APPGKC_CRKMX",
              "menuOrder" : "3",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193839311746704208496294",
              "pkid" : "20171212201014268403198459747961",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGKC_KCYJ",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "库存预警",
              "menuNote" : "管库存-库存预警",
              "menuNumber" : "APPGKC_KCYJ",
              "menuOrder" : "4",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193839311746704208496294",
              "pkid" : "20171212201024578394613668091831",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            },
            {
              "applicationId" : "2",
              "createUser" : "YF",
              "custom" : "0",
              "displayLoca" : "0",
              "iconCls" : "APPGKC_KCPD",
              "isSelected" : true,
              "menuCode" : "0",
              "menuName" : "库存盘点",
              "menuNote" : "管库存-库存盘点",
              "menuNumber" : "APPGKC_KCPD",
              "menuOrder" : "5",
              "menuType" : "1",
              "menuUrl" : "app",
              "pid" : "20171212193839311746704208496294",
              "pkid" : "20171212201036301345989885587828",
              "state" : "open",
              "status" : "1",
              "visible" : "1"
            }
          ],
          "createUser" : "YF",
          "custom" : "0",
          "displayLoca" : "0",
          "iconCls" : "/",
          "menuCode" : "0",
          "menuName" : "管库存",
          "menuNote" : "管库存",
          "menuNumber" : "APPGKC",
          "menuOrder" : "3",
          "menuType" : "1",
          "menuUrl" : "app",
          "pid" : "0",
          "pkid" : "20171212193839311746704208496294",
          "state" : "open",
          "status" : "1",
          "visible" : "1"
        }
      ];
    }
  }
  scrollEvent(e) {
    let opacity = e.scrollTop/ 300;//设置滚动距离300的时候导航栏消失
    if (this.header._elementRef.nativeElement.children[0]!=null) {
      this.header._elementRef.nativeElement.children[0].style.opacity = opacity;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
    if (this.header._elementRef.nativeElement.children[0]!=null) {
      this.header._elementRef.nativeElement.children[0].style.opacity = 0.0;
    }
  }

  editeBtnCliked(){
    console.log('edite BtnCliked');
    this.navCtrl.push("BusinessEditPage", {
      items:this.items,callback:this.callback
    });    
  }

  //选择条件回调
  callback = (result) => {
    if (typeof (result) != 'undefined') {
      this.items = JSON.parse(JSON.stringify(result));
      //todo 缓存当前用户选择
    } else {
      console.log("回传数据出错");
    }
  }
}
