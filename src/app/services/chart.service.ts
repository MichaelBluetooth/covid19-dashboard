import { Injectable, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Covid19ApiService } from './covid-19-api.service';
import { Observable, forkJoin } from 'rxjs';
import { TotalCount } from '../models/total-count.model';
import { map, filter, switchMap } from 'rxjs/operators';
import { ChartData } from '../models/chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  numDays = 30;

  constructor(private covid19ApiService: Covid19ApiService) { }

  getConfirmedChart(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<ChartData> {
    const chartData = ChartData.getDefault();
    return this.covid19ApiService.countryTotalsSinceDayOne(countrySlug, status)
      .pipe(map((total: TotalCount[]) => {
        return total.filter(t => t.Province === '').slice(Math.max(total.length - this.numDays));
      }))
      .pipe(map((total: TotalCount[]) => {
        chartData.lineChartLabels = total.map(t => new Date(t.Date).toLocaleDateString("en-US"))
        chartData.lineChartData.push({
          data: total.map(t => t.Cases),
          label: status + ' (last ' + this.numDays + ' days)'
        });

        return chartData;
      }));
  }

  getDeathsVsRecoveryChart(countrySlug: string): Observable<ChartData> {
    const chartData = ChartData.getDefault();

    return this.covid19ApiService.countryTotalsSinceDayOne(countrySlug, 'recovered').pipe(switchMap(recovered => {
      return this.covid19ApiService.countryTotalsSinceDayOne(countrySlug, 'deaths').pipe(map(deaths => {
        const byDate = {};
        deaths.forEach(death => {
          const key = new Date(death.Date).toLocaleDateString('en-US')
          if (!byDate[key]) {
            byDate[key] = {
              recovered: null,
              deaths: null
            }
          }
          byDate[key].deaths = death.Cases;
        });

        recovered.forEach(recovery => {
          const key = new Date(recovery.Date).toLocaleDateString('en-US')
          if (!byDate[key]) {
            byDate[key] = {
              recovered: null,
              deaths: null
            }
          }
          byDate[key].recovered = recovery.Cases;
        });

        chartData.lineChartLabels = Object.keys(byDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        chartData.lineChartData.push({
          label: 'deaths',
          data: Object.keys(byDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map(key => byDate[key].deaths)
        });
        chartData.lineChartData.push({
          label: 'recovered',
          data: Object.keys(byDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map(key => byDate[key].recovered)
        });

        return chartData;
      }));
    }));    
  }
}
