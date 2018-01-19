// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UploadManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadManagerProvider {
  private static instance:UploadManagerProvider = new UploadManagerProvider();
  dataArray:Array<any>=[];
  constructor() {
    if (UploadManagerProvider.instance) {
      throw new Error("错误: 请使用AppServiceProvider.getInstance() 代替使用new.");
    }
    UploadManagerProvider.instance = this;
  }
    /**
     * 获取应用单例
     * 
     * @static
     * @returns {UploadManagerProvider}
     */
    public static getInstance(): UploadManagerProvider {
      return UploadManagerProvider.instance;
  }
  
  uploadWithData(dataArray:Array<any>){
    if (dataArray==null) {
      return;
    }

  }

  uploadItemImg(img){

  }
  uploadItemData(data){

  }
}
