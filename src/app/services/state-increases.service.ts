import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StateIncreaseModel } from '../models/state-increase.model';
import { tap, map } from 'rxjs/operators';
import { BarChartModel } from '../models/bar-chart.model';

@Injectable({
  providedIn: 'root'
})
export class StateIncreasesService {

  numDays = 30;
  private _url = 'https://covidtracking.com/api/states/daily';
  private _cache = null;

  constructor(private http: HttpClient) { }

  getData(state: string): Observable<StateIncreaseModel[]> {
    if (this._cache) {
      return of(this._cache).pipe(map(d => d.filter((d: StateIncreaseModel) => d.state === state)));
    } else {
      return this.http.get(this._url)
        .pipe(tap(resp => this._cache = resp))
        .pipe(map(resp => resp as StateIncreaseModel[]))
        .pipe(map(d => d.filter((d: StateIncreaseModel) => d.state === state)));
    }
  }

  getChartData(state: string): Observable<BarChartModel> {
    return this.getData(state)      
    .pipe(map((data: StateIncreaseModel[]) => data.slice(0, this.numDays)))
      .pipe(map((data: StateIncreaseModel[]) => data.reverse()))      
      .pipe(map((data: StateIncreaseModel[]) => {
        const chart = BarChartModel.getDefaut();

        chart.header = `Daily Increases: ${state} (last ${this.numDays} days)`;
        chart.barChartLabels = data.map(d => new Date(d.dateChecked).toLocaleDateString('en-US'));
        // chart.barChartData.push({
        //   label: 'Daily Death Increase',
        //   data: data.map(d => d.deathIncrease)
        // });
        chart.barChartData.push({
          label: 'Daily Test Result Increase',
          data: data.map(d => d.totalTestResultsIncrease),
          hidden: true
        });
        chart.barChartData.push({
          label: 'Daily Confirmed Cases Increase',
          data: data.map(d => d.positiveIncrease),
        });

        return chart;
      }));
  }
}
