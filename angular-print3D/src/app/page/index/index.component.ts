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
  productByQuantity = {};
  sortedProducts = [];
  topThreeOrders = [];
  topThreeProducts = [];
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

  public barChartLabels: Label[] = ['★★★★★', '★★★★', '★★★', '★★', '★'];
  public barChartData: ChartDataSets[] = [{ borderSkipped: 'top', data: [], label: 'rated' }];
  public barChartType: ChartType = 'horizontalBar';
  public barChartPlugins = [];
  public barChartColors = ['#ffd24d'];
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }]
    }
  };

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
    // this.cs.readProducstOrderesByCategory().subscribe(data => console.log(data))
    this.drawLineChart();
    this.drawPieChart();
    this.getTopThree();
    this.drawBarChart();
    this.drawGeoChart();
    this.ds.readDocument('products');
    this.ds.readDocument('users');
    this.ds.readDocument('reviews');
    this.ds.readDocument('orders');
  }

  ngOnInit() {
    let geo = null;
    let x_img_ele = 0;
    let y_img_ele = 0;


    function start_drag(event: MouseEvent) {
      geo = this;
      x_img_ele = event.clientX - document.getElementById('geo').offsetLeft;
      y_img_ele = event.clientY - document.getElementById('geo').offsetTop;

    }

    function stop_drag() {
      geo = null;
    }

    function while_drag(event: MouseEvent) {
      if (geo !== null) {
        geo.style.left = (event.clientX - x_img_ele) + 'px';
        geo.style.top = (event.clientY - y_img_ele) + 'px';
      }
    }

    document.getElementById('geo').addEventListener('mousedown', start_drag);
    document.getElementById('container').addEventListener('mousemove', while_drag);
    document.getElementById('container').addEventListener('mouseup', stop_drag);
  }

  drawLineChart() {
    this.thisYear = new Date().getFullYear();
    this.cs.readData('orders').subscribe(data => {

      this.lineChartData = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2019' }, { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2020' },];
      data.forEach(item => {
        new Date(item.insdate).getFullYear() === 2019 ? this.lineChartData[0].data[new Date(item.insdate).getMonth()] += parseInt(item.unitprice) : item;
        new Date(item.insdate).getFullYear() === this.thisYear ? this.lineChartData[1].data[new Date(item.insdate).getMonth()] += parseInt(item.unitprice) : item;
      })
    })
  }

  drawPieChart() {
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
  }

  getTopThree() {
    let topSeo = '';
    this.cs.readData('orders').subscribe(
      data => {
        data.forEach(item => {
          item.quantity.forEach(q => {
            if (this.productByQuantity[Object.keys(q)[0]] === undefined) {
              this.productByQuantity[Object.keys(q)[0]] = Object.values(q)[0];
            } else {
              this.productByQuantity[Object.keys(q)[0]] += Object.values(q)[0]
            }
          })
        })
        for (let prod in this.productByQuantity) {
          this.sortedProducts.push([prod, this.productByQuantity[prod]])
        }
        this.sortedProducts.sort((a, b) => { return a[1] - b[1] })

        while (this.topThreeOrders.length < 3) {
          this.topThreeOrders.push(this.sortedProducts.pop())
        }
        this.topThreeOrders.forEach(top => {
          topSeo = top[0].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/&/g, '-and-').replace(/[^a-z0-9\-]/g, '').replace(/-+/g, '-').replace(/^-*/, '').replace(/-*$/, '');
          this.cs.readData('products', topSeo).subscribe(data => {
            this.topThreeProducts.push(data)
          })

        })
      })
  }
  drawBarChart() {
    let stars = {
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0
    }
    this.cs.readData('reviews').subscribe(data => {
      data.forEach(review => {
        switch (review.rate) {
          case 5:
            stars.five += 1;
            break;
          case 4:
            stars.four += 1;
            break;
          case 3:
            stars.three += 1;
            break;
          case 2:
            stars.two += 1;
            break;
          case 1:
            stars.one += 1;
            break;
        }
      })
      this.barChartData[0].data.push(stars.five, stars.four, stars.three, stars.two, stars.one)
      console.log(stars);
    })
  }

  drawGeoChart() {
    let userAddress = [];
    let userNumberByAddress = [];
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

  zoomIn() {
    this.zoomNum = this.zoomNum + 0.1;
    $(".geo").css("zoom", this.zoomNum + 0.1)
  }
  zoomOut() {
    this.zoomNum = this.zoomNum - 0.1;
    $(".geo").css("zoom", this.zoomNum - 0.1)
  }

}
