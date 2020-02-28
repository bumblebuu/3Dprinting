import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
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
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private cs: ChartService) {
    this.thisYear = new Date().getFullYear();
    this.cs.readData('orders').subscribe(data => {

      this.lineChartData = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2019' }, { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], label: '2020' },];
      data.forEach(item => {
        new Date(item.insdate).getFullYear() === 2019 ? this.lineChartData[0].data[new Date(item.insdate).getMonth()] += parseInt(item.unitprice) : item;
        new Date(item.insdate).getFullYear() === this.thisYear ? this.lineChartData[1].data[new Date(item.insdate).getMonth()] += parseInt(item.unitprice) : item;
      })
    })
  }

  ngOnInit() {
  }

}
