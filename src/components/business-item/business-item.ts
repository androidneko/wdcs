import { Component,Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the BusinessItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'business-item',
  templateUrl: 'business-item.html'
})
export class BusinessItemComponent {
  // @Input() item:any;
  
  itemValue:any;
  childList=[];
  @Input()
  get item(){
    return this.itemValue;
  }
  set item(val){
    this.itemValue = val;
    let childList = [];
     var list = [];
     childList.push(list);
    for (let index = 0; index < val.childList.length; index++) {
      if (list.length == 4) {
        
           list=[];
           childList.push(list);
      }
      const element = val.childList[index];
      if(element.isSelected==true){
        list.push(element);
      }
      
    }
    if (childList[childList.length-1].length == 0) {
      childList.pop();
    }

    this.childList = childList;
  }
  text: string;

  constructor(private navCtrl:NavController) {
    console.log('Hello BusinessItemComponent Component');
    this.text = 'Hello World';
  }
  goDetails(item){
   if(item.menuName=="进货订单"){
     this.navCtrl.push("PurchaseOderPage");
   }else if(item.menuName == "进货报表"){
     this.navCtrl.push("PurchaseReportPage");
   }else if(item.menuName == "订单跟踪表"){
      this.navCtrl.push("PurchaseOrderFollowPage");
   }else if(item.menuName == "我的供应商"){
      this.navCtrl.push("PoConditionChooseProviderPage");
   }else if(item.menuName == "付款记录"){
      this.navCtrl.push("IHavePaidPage");
   }else if(item.menuName == "我未付谁钱"){
    this.navCtrl.push("IHavntPaidPage");
   }else if(item.menuName == "销售订单")
   {
    this.navCtrl.push("SalesOrderPage");
   }else if(item.menuName == "销售报表"){
    this.navCtrl.push("SalesReportPage");
   }else if(item.menuName == "销售订单跟踪表"){
    this.navCtrl.push("SalesOrderFollowPage");
   }else if(item.menuName == "我的客户"){
    this.navCtrl.push("MyClientsPage");
   }else if(item.menuName == "收款记录"){
    this.navCtrl.push("WhoHasPaidPage");
   }else if(item.menuName == "谁未付我钱"){
    this.navCtrl.push("WhoHasntPaidPage");
   }else if(item.menuName == "库存查询"){
    this.navCtrl.push("StockPage");
   }else if(item.menuName == "我的商品"){
    this.navCtrl.push("MyProductListPage");
   }else if(item.menuName == "库存盘点"){
    this.navCtrl.push("InventoryPage");
   }else if(item.menuName == "库存预警"){
    this.navCtrl.push("StockPrewarningPage");
   }else if(item.menuName == "出入库明细"){
    this.navCtrl.push("StockInOutPage");
   }
   else{
     this.navCtrl.push("BuildingPage");
   }
  }
}
