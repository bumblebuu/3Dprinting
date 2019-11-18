import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Printers', 'Scanners', 'Filaments', 'Tools', 'Health', 'Electronics', 'Mechanics', 'Architecture', 'Lego', 'Plant Holder', 'Jewellery', 'Belt', 'Phonecase', 'Unique'];
  public pieChartData: SingleDataSet = [100, 30, 156, 21, 77, 99, 80, 22, 110, 31, 4, 1, 46, 53];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
