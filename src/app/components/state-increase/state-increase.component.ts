import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarChartModel } from 'src/app/models/bar-chart.model';
import { AppStateService } from 'src/app/services/app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-state-increase',
  templateUrl: './state-increase.component.html',
  styleUrls: ['./state-increase.component.less']
})
export class StateIncreaseComponent implements OnInit, OnDestroy {

  chartData: BarChartModel;
  sub: Subscription;

  constructor(private state: AppStateService) { }

  ngOnInit() {
    this.state.dailyIncreases$.subscribe(d => {
      this.chartData = d;
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
