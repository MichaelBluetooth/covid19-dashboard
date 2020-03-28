import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { ChartData } from 'src/app/models/chart-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {

  confirmedData: ChartData;
  deathVsRecoveryData: ChartData;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.getConfirmedChart('US', 'confirmed').subscribe(data => {
      this.confirmedData = data;
    });

    // the covid-19 api _sometimes_ results in a CORs issue if you call it too fast...setting a delay seems to resolve it...
    setTimeout(() => {
      this.chartService.getDeathsVsRecoveryChart('US').subscribe(data => {
        this.deathVsRecoveryData = data;
      });
    }, 1000);
  }
}
