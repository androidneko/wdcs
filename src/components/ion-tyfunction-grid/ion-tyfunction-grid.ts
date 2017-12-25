import { NavController } from 'ionic-angular';
import { Component ,Input} from '@angular/core';
/**
 * Generated class for the IonTyfunctionGridComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-tyfunction-grid',
  templateUrl: 'ion-tyfunction-grid.html'
})
export class IonTyfunctionGridComponent {
  @Input() functionItems:Array<any>=[];

  constructor(public navCtrl:NavController) {
    console.log('Hello IonTyfunctionGridComponent Component');
  }
  goDetails(item){
    if(item.menuNumber=="M0207"){
      //快速收款
      this.navCtrl.push("FastRecivePage");
    }else if(item.menuNumber == "M0305"){
      //快速付款
     this.navCtrl.push("FastPayPage");
    }else{
      this.navCtrl.push("BuildingPage");
    }
    console.log(item.menuName+" clicked");
  }
}
