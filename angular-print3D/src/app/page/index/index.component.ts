import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  zoomNum: number = 1;
  products$: BehaviorSubject<any> = this.ds.productList;
  users$: BehaviorSubject<any> = this.ds.userList;
  reviews$: BehaviorSubject<any> = this.ds.reviewList;
  orders$: BehaviorSubject<any> = this.ds.orderList;
  pcOrders$: Observable<any> = this.cs.readData('orders');
  filamentsOrdered = 0;
  printersOrdered = 0;
  scannersOrdered = 0;
  toolsOrdered = 0;
  healthOrdered = 0;
  electronicsOrdered = 0;
  mechanicsOrdered = 0;
  architectureOrdered = 0;
  legosOrdered = 0;
  insideOrdered = 0;
  outsideOrdered = 0;
  jewelleriesOrdered = 0;
  beltsOrdered = 0;
  phonecasesOrdered = 0;
  otherOrdered = 0;
  uniquesOrdered = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Printers', 'Scanners', 'Filaments', 'Tools', 'Health', 'Electronics', 'Mechanics', 'Architecture', 'Lego', 'Inside', 'Outside', 'Jewellery', 'Phone case', 'Other', 'Unique'];
  public pieChartData: SingleDataSet = []
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['#33ccff', '#db4dff', '#ff9999', '#99ffe6', '#ffff4d', '#a6ff4d', '#79d2a6', '#ffd24d', '#669900', '#94b8b8', '#ffcc99', '#ff80aa', '#b8b894', '#ff4d4d', '#006699'],
  }]

  thisYear: number;
  public lineChartData: ChartDataSets[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2019' }, { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2020' }];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  public geoChart = {
    title: 'Geo Chart',
    type: 'GeoChart',
    data: [
      ['Country', 'Users'],
    ],
    options: {
      width: '100%',
      height: 450,
      chartArea: { left: 10, top: 10, bottom: 0, height: "100%" },
      colorAxis: { colors: ['#aec7e8', '#1f77b4'] },
      displayMode: 'regions',
    }
  }

  constructor(private ds: DataService, private cs: ChartService) {
    let userAddress = [];
    let userNumberByAddress = [];
    this.ds.readDocument('products');
    this.ds.readDocument('users')
    this.ds.readDocument('reviews')
    this.ds.readDocument('orders')
    this.thisYear = new Date().getFullYear();
    this.cs.readData('orders').subscribe(data => {

      this.lineChartData = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2019' }, { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2020' },];
      data.forEach(item => {
        new Date(item.insdate).getFullYear() === 2019 ? this.lineChartData[0].data[new Date(item.insdate).getMonth()] += item.unitprice : item;
        new Date(item.insdate).getFullYear() === this.thisYear ? this.lineChartData[1].data[new Date(item.insdate).getMonth()] += item.unitprice : item;
      })
    })
    this.pcOrders$.subscribe(
      data => {
        data.forEach(item => {
          item.product.forEach(product => {
            item.quantity.forEach(quantity => {
              if (product.category === 'filaments' && quantity[product.name] !== undefined) {
                this.filamentsOrdered += quantity[product.name]
              }
              if (product.category === 'printers' && quantity[product.name] !== undefined) {
                this.printersOrdered += quantity[product.name]
              }
              if (product.category === 'scanners' && quantity[product.name] !== undefined) {
                this.scannersOrdered += quantity[product.name]
              }
              if (product.category === 'tools' && quantity[product.name] !== undefined) {
                this.toolsOrdered += quantity[product.name]
              }
              if (product.category === 'health' && quantity[product.name] !== undefined) {
                this.healthOrdered += quantity[product.name]
              }
              if (product.category === 'electronics' && quantity[product.name] !== undefined) {
                this.electronicsOrdered += quantity[product.name]
              }
              if (product.category === 'mechanics' && quantity[product.name] !== undefined) {
                this.mechanicsOrdered += quantity[product.name]
              }
              if (product.category === 'architecture' && quantity[product.name] !== undefined) {
                this.architectureOrdered += quantity[product.name]
              }
              if (product.category === 'lego' && quantity[product.name] !== undefined) {
                this.legosOrdered += quantity[product.name]
              }
              if (product.category === 'inside' && quantity[product.name] !== undefined) {
                this.insideOrdered += quantity[product.name]
              }
              if (product.category === 'outside' && quantity[product.name] !== undefined) {
                this.outsideOrdered += quantity[product.name]
              }
              if (product.category === 'jewellery' && quantity[product.name] !== undefined) {
                this.jewelleriesOrdered += quantity[product.name]
              }
              if (product.category === 'phone cases' && quantity[product.name] !== undefined) {
                this.phonecasesOrdered += quantity[product.name]
              }
              if (product.category === 'other' && quantity[product.name] !== undefined) {
                this.otherOrdered += quantity[product.name]
              }
              if (product.category === 'unique' && quantity[product.name] !== undefined) {
                this.uniquesOrdered += quantity[product.name]
              }
            })
          })
        })
        this.pieChartData.push(this.printersOrdered, this.scannersOrdered, this.filamentsOrdered, this.toolsOrdered, this.healthOrdered, this.electronicsOrdered, this.mechanicsOrdered, this.architectureOrdered, this.legosOrdered, this.insideOrdered, this.outsideOrdered, this.jewelleriesOrdered, this.phonecasesOrdered, this.otherOrdered, this.uniquesOrdered)
      })
    this.cs.readData('users').subscribe(data =>
      data.forEach(user => {
        if (userAddress.indexOf(user.address[0]) === -1) {
          userAddress.push(user.address[0])
          userNumberByAddress.push(1)
        } else {
          let indexNum = userAddress.indexOf(user.address[0])
          userNumberByAddress[indexNum] += 1;
        }
        if (user === data[data.length - 1]) {
          for (let i = 0; i < userAddress.length; i += 1) {
            this.geoChart.data.push([userAddress[i], `${userAddress[i]}: ` + userNumberByAddress[i]])
          }
        }
      }),
    )
  }

  ngOnInit() {
  }

  zoomIn(zoomNum) {
    this.zoomNum = this.zoomNum + 0.1;
    $(".geo").css("zoom", this.zoomNum + 0.1)
  }
  zoomOut(zoomNum) {
    this.zoomNum = this.zoomNum - 0.1;
    $(".geo").css("zoom", this.zoomNum - 0.1)
  }

}
