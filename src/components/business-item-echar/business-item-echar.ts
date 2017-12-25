import { Component ,ViewChild, ElementRef,Input} from '@angular/core';
declare var echarts;
/**
 * Generated class for the BusinessItemEcharComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'business-item-echar',
  templateUrl: 'business-item-echar.html'
})
export class BusinessItemEcharComponent {
  
  itemValue: any;

  chart: any=null;
  @ViewChild('container') container: ElementRef; 
  
  @Input()
  get item(){
    return this.itemValue;
  }
  set item(val){
    this.itemValue = val;
    this.itemValue.callback=()=>{
      
      if (val!=null && val.title=="本月销售收入（元）") {
        if (this.chart == null) {
          this.reloadLine();
        }
      }else{
        if (this.chart == null) {
          this.reloadBarChart();
        }
      }
    }
    if (val.isFirst == true) {
      this.reloadBarChart();
    }
    
  }
  constructor() {
    console.log('Hello BusinessItemEcharComponent Component');
    
  
  }
  reloadBarChart(){

      let ctx = this.container.nativeElement;
      
          this.chart = echarts.init(ctx);
          
          let option = {
              color: ['#3398DB'],
              tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              grid: {
                  left: '16px',
                  right: '16px',
                  bottom: '0%',
                  containLabel: false
              },
              xAxis : [
                  {
                      show:true,
                      type : 'category',
                      data : [],
                      
                  }
              ],
              yAxis : [
                  {
                      axisTick: {
                          show:false,
                          alignWithLabel: false
                      },
                      axisLabel:{
                          show:false,
                      },
                      axisLine:{
                          show:false
                      },
                      type : 'value'
                  }
              ],
              series : [
                  {
                      name:'直接访问',
                      type:'bar',
                      barWidth: '60%',
                      data:[{value:70,itemStyle:{normal:{color:"#E6E6E6"}}},{value:100,itemStyle:{normal:{color:"#E6E6E6"}}},{value:100,itemStyle:{normal:{color:"#CD1C5D"}}},{value:40,itemStyle:{normal:{color:"#CD1C5D"}}},{value:100,itemStyle:{normal:{color:"#E6E6E6"}}}, {value:100,itemStyle:{normal:{color:"#E6E6E6"}}}, {value:100,itemStyle:{normal:{color:"#E6E6E6"}}}, {value:100,itemStyle:{normal:{color:"#E6E6E6"}}}, {value:20,itemStyle:{normal:{color:"#CD1C5D"}}}, {value:100,itemStyle:{normal:{color:"#E6E6E6"}}}, {value:100,itemStyle:{normal:{color:"#E6E6E6"}}}]
                  }
              ]
          };
          
          this.chart.setOption(option);
  }
  reloadLine(){
    let ctx = this.container.nativeElement;
    
        this.chart = echarts.init(ctx);
   let option = {
      color: ['#CD1C5D'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
        left: '16px',
        right: '16px',
        bottom: '0px',
        containLabel: false
    },
      xAxis : [
          {
              show:true,
              type : 'category',
              data : [],
              
              
              
          }
      ],
      yAxis : [
          {
              axisTick: {
                  show:false,
                  alignWithLabel: false
              },
              axisLabel:{
                  show:false,
              },
              axisLine:{
                  show:false
              },
              type : 'value'
          }
      ],
      series : [
          {
              name:'直接访问',
              type:'line',
              barWidth: '60%',
              data:[0,90,70,80,100,70,20,30]
          }
      ]
    };
    this.chart.setOption(option);
  }
}
