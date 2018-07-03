import { Component, ViewChild} from '@angular/core';
import {  TextInput, Platform } from 'ionic-angular';

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

  constructor(public platform:Platform) {
    console.log('Hello ChartBarComponent Component');
    if (this.platform.is("android")){
      window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
      window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
    }
  
  }

  bgclick() {
     this.hide();
  }
  show(hint?:string){
    var containner = document.getElementById("chartBarContainer");
    containner.style.display = "block";
    this.input.setFocus();
    if (hint){
      this.input.placeholder = hint;
    }
  }
  hide(){
    var containner = document.getElementById("chartBarContainer");
    containner.style.display = "none";
    if (this.item!=null && this.text!="") {
       this.item = this.text;
    }
    this.input.placeholder = "";
    this.text="";
  }
  blurInput(){
    // this.hide();
  }
  showWithItem(item,backBlock){
    if (item && item.user){
      let hint:string = '回复'+item.user.userName+':'
      this.show(hint);
    }else {
      this.show();
    }
    
    this.backBlock=backBlock;
  }

  sendBtnCliked(){
    if (this.backBlock != null) {
      this.backBlock(this.text);
      this.backBlock = null;
    }
    this.hide();
  }

  keyboardShowHandler(e) {
    //e.keyboardHeight 这个可以直接获取软键盘的高度  
    var containner = document.getElementById("toolsBar");
    containner.style.bottom = e.keyboardHeight + 'px';
    console.log('Keyboard height is: ' + e.keyboardHeight);
    console.log("toolsBar bottom is"+containner.style.bottom);
  }  
  
  keyboardHideHandler(e) {
    //......  
    var containner = document.getElementById("toolsBar");
    containner.style.bottom = "0px";
  }

}
