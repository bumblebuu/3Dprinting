import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  orders$: Observable<any> = this.cs.readData('orders');
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
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['#33ccff', '#db4dff','#ff9999', '#99ffe6','#ffff4d','#a6ff4d','#79d2a6','#ffd24d','#669900','#94b8b8','#ffcc99','#ff80aa','#b8b894','#ff4d4d','#006699'],
  }]

  constructor(private cs: ChartService) {
    this.orders$.subscribe(
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
  ngOnInit() {
  }

}
