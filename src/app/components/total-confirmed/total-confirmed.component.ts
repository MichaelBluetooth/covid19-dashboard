import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SummaryModel } from 'src/app/models/summary.model';
import { TotalsByStateService } from 'src/app/services/totals-by-state.service';
import { TotalCount } from 'src/app/models/total-count.model';
import { Covid19ApiService } from 'src/app/services/covid-19-api.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-total-confirmed',
  templateUrl: './total-confirmed.component.html',
  styleUrls: ['./total-confirmed.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TotalConfirmedComponent implements OnInit {

  title = 'Total Confirmed';
  badgeStyle = 'danger';
  selectedTab = 'state';

  statesTotal = 0;
  worldTotal = 0;
  stateTotals: TotalCount[] = [];
  worldTotals: SummaryModel[] = [];

  constructor(private totalsByStateService: TotalsByStateService,
    private covid19ApiService: Covid19ApiService,
    private appState: AppStateService) { }

  ngOnInit() {
    this.totalsByStateService.getStateTotals('US', 'confirmed').subscribe(data => {
      this.stateTotals = data;
      this.statesTotal = this.stateTotals.map(t => t.Cases).reduce((prev, next) => prev + next);
    });

    this.covid19ApiService.getSummary().subscribe(resp => {
      this.worldTotals = resp.sort((a, b) => {
        return a.TotalConfirmed > b.TotalConfirmed ? -1 : 1;
      });

      this.worldTotal = this.worldTotals.map(t => t.TotalConfirmed).reduce((prev, next) => prev + next);
    });
  }

  updateSelectedTab(tab: string) {
    this.selectedTab = tab;
  }

  zoomToState(state: string): void {
    this.appState.updateLocation(state);
  }
}
