import { ChartBarComponent } from './../../components/chart-bar/chart-bar';
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


    static domain = "http://220.249.102.138:8083"; //测试环境
    //static domain = "http://120.24.176.35:8083"; //

    static API = {
        test:"",
        login:'/api/v1/account/login',//登录
        smsCode:'/api/v1/account/smsCode',//短信验证码
        register: '/api/v1/account/register', //注册
        resetPassword: '/api/v1/account/resetPwd', //忘记密码
        modifyPassword: '/api/v1/account/modifyPwd', //修改密码
        editUserInfo: '/api/v1/account/editUserInfo', //编辑用户信息
        getUserInfo: '/api/v1/account/getUserInfo', //获取用户信息
        msgList: '/api/v1/msgList', //获取推送消息列表
        recordList: '/api/v1/recordList', //获取已上传记录列表
        sampleDetails:"/api/v1/sampleDetails",
        uploadRecord: '/api/v1/sampleInfo', //上传采集数据
        uploadImage:'/api/v1/user/uploadImage',
        getNewsList:'/api/v1/news/getNewsList',
        comments:'/api/v1/comments',
        praises:'/api/v1/praises',
        circleFriendsQuery: '/api/v1/circleFriends/query',//查询朋友圈接口All
        circleFriendsFabulous:"/api/v1/circleFriends/fabulous",//朋友圈点赞
        circleFriendsDelfabulous:"/api/v1/circleFriends/delfabulous",
        circleFriendsMsg:"/api/v1/circleFriends/msg",//朋友圈评论
        plantsPosition:"/api/v1/plantsPositionDate",
        plantsByCity:"/api/v1/city/getMapData"
    };
    static DATA:any ={
      uploadDoc:':8080/pc/data/uploadDoc',//文件上传
    }
    static RETURNCODE:any ={
        succeed:200//成功
    }

}

@Injectable()
export class AppServiceProvider {
  private static instance:AppServiceProvider = new AppServiceProvider();
  public userinfo:any = {
    loginData:{userName:"",token:""},
    userData:{}
  };//当前用户信息
  public merMenuList:any=[];
  public chartBar:ChartBarComponent;
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
