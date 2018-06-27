import { Component, ViewChild} from '@angular/core';
import {  TextInput } from 'ionic-angular';

/**
 * Generated class for the ChartBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart-bar',
  templateUrl: 'chart-bar.html'
})
export class ChartBarComponent {

  text: string;
  item:any;//任意对象
  backBlock:any;
  @ViewChild("input") input: TextInput;

  constructor() {
    console.log('Hello ChartBarComponent Component');
    // window.addEventListener('native.keyboardshow', keyboardShowHandler);
    // function keyboardShowHandler(e) {
    //   //e.keyboardHeight 这个可以直接获取软键盘的高度  
    //   var containner = document.getElementById("toolsBar");
    //   // containner.style.bottom = e.keyboardHeight;
    //   console.log('Keyboard height is: ' + e.keyboardHeight);
    //   console.log("toolsBar bottom is"+containner.style.bottom);
    // }  
    // window.addEventListener('native.keyboardhide', keyboardHideHandler);
    // function keyboardHideHandler(e) {
    //   //......  
    //   var containner = document.getElementById("toolsBar");
    //   containner.style.bottom = "0";
    // }  
  }

  bgclick() {
     this.hide();
  }
  show(){
    var containner = document.getElementById("chartBarContainer");
    containner.style.display = "block";
    this.input.setFocus();
  }
  hide(){
    var containner = document.getElementById("chartBarContainer");
    containner.style.display = "none";
    if (this.item!=null && this.text!="") {
       this.item = this.text;
    }
    this.text="";
  }
  blurInput(){
    // this.hide();
  }
  showWithItem(item,backBlock){
    this.show();
    this.backBlock=backBlock;
  }

  sendBtnCliked(){
    // if (this.backBlock != null) {
    //   this.backBlock(this.text);
    //   this.backBlock = null;
    // }
    // this.hide();
  }

}
