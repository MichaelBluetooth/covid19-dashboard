import { Injectable } from '@angular/core';
import { Covid19ApiService } from './covid-19-api.service';
import { Observable } from 'rxjs';
import { TotalCount } from '../models/total-count.model';
import { map } from 'rxjs/operators';
import { DeduplicateFilterService } from './deduplicate-filter.service';
import { ALL_US_STATES } from '../data/states';

@Injectable({
  providedIn: 'root'
})
export class TotalsByStateService {

  constructor(private covid19ApiService: Covid19ApiService, private dedupeService: DeduplicateFilterService) { }

  getStateTotals(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    return this.covid19ApiService.totalsByCountry(countrySlug, status).pipe(map((raw: TotalCount[]) => {
      return this.dedupeService.dedupe(raw.filter(i => ALL_US_STATES.includes(i.Province))).sort((a, b) => {
        return a.Cases > b.Cases ? -1 : 1;
      });
    }));
  }
}
