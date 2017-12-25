import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//全局信息
@Injectable()
export class AppGlobal {

    static cache: any = {
        slides: "_dress_slides",
        categories: "_dress_categories",
        products: "_dress_products"
    }

    // // static domain = "http://api2.shualeme.com.cn:9980"//全局静态地址
    // static domain = "http://192.168.2.107"//全局静态地址
    // static domain = "http://10.8.3.212"; //全局静态地址
    static domain = "http://10.8.3.229"; //测试环境
    // static domain = "http://10.8.3.51:9090"; //晖地址
    //static domain = "http://10.8.3.128"; //杨凡地址
    //static domain = "http://10.8.3.109:9090"; //雷哥地址地址
    static API: any = {
        // test: '/api/api/test',//擎动
        test:':9090/api/test',//调试环境通用
        trade: ':9090/api/apsPayment/trade.do',
    };
    static DATA:any ={
      uploadDoc:':8080/pc/data/uploadDoc',//文件上传
    }
    static RETURNCODE:any ={
        succeed:"000000"//成功
    }

}

@Injectable()
export class AppServiceProvider {
  private static instance:AppServiceProvider = new AppServiceProvider();
  public userinfo:any;//当前用户信息
  public merMenuList:any=[];

  constructor() {
    if (AppServiceProvider.instance) {
      throw new Error("错误: 请使用AppServiceProvider.getInstance() 代替使用new.");
    }
    AppServiceProvider.instance = this;
  }
    /**
     * 获取应用单例
     * 
     * @static
     * @returns {AppServiceProvider}
     */
    public static getInstance(): AppServiceProvider {
      return AppServiceProvider.instance;
  }

}
