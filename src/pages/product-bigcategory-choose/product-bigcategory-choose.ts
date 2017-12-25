import { TyNetworkServiceProvider } from './../../providers/ty-network-service/ty-network-service';
import { BasePage } from './../base/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AppGlobal } from '../../providers/app-service/app-service';

/**
 * Generated class for the ProductBigcategoryChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-bigcategory-choose',
  templateUrl: 'product-bigcategory-choose.html',
})
export class ProductBigcategoryChoosePage extends BasePage {
  Category={categoryChild:[],customCategoryId:"",merchantId:""};
  constructor(private net:TyNetworkServiceProvider,public toastCtrl:ToastController,private alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl,navParams,toastCtrl)
    this.Category = navParams.data.Category;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductBigcategoryChoosePage');
  }
  itemClick(item){
    console.log("类别点击");
    if (this.navParams.data.callback!=null) {
      this.navParams.data.callback(item);
    }
    this.navCtrl.pop();
  }
  deleteItem(msliding,item,idx){
    msliding.close();
    console.log("删除");
    let params = 
    {
        "dataInfo": {
          "customCategoryId": item.customCategoryId,
          "merchantId":item.merchantId
        },
        "ACTION_NAME":"categoryFacade|delCategory"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        this.Category.categoryChild.splice(idx,1);
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);

  }
  swipeItem(item){
    console.log("swipe");
  }
  newcategory(){
    console.log("新增类别");
    let alert = this.alertCtrl.create({
      title:' ',
      inputs:[
        {
          name:"cate",
          placeholder:"请输入商品类别",
        },
      ],
      buttons:[
        {
          text:"取消",
          handler: data =>{
            let cate = data.cate;
            console.log(cate);
          }
        },
        {
          text:"确定",
          handler:data=>{
            // let cate = data.cate;
            // console.log("dsafsdafdsf");
            console.log("类别"+data.cate);
            this.addCate(data.cate);
          }
        }
      ]
    });
    alert.present();
  }

  //net
  addCate(name){
    let params = 
    {
        "dataInfo": {
          "customParentId": this.Category.customCategoryId,
          "customCategoryName":name,
          "merchantId":this.Category.merchantId
        },
        "ACTION_NAME":"categoryFacade|addCategory"
    };
    this.net.httpPost(AppGlobal.API.test,params,msg => {
      let obj = JSON.parse(msg);
      if (obj.ACTION_RETURN_CODE==AppGlobal.RETURNCODE.succeed||obj.ACTION_RETURN_CODE==null) {
        if (obj.ACTION_INFO.data!=null) {
          this.Category.categoryChild.push(obj.ACTION_INFO.data);
        }
      }else{
        this.toast(obj.ACTION_RETURN_MESSAGE);
      }
      
    },error => {
      this.toast(error);
    },true);
  }
}
