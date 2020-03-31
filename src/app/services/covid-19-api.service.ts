import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, repeat } from 'rxjs/operators';
import { TotalCount } from '../models/total-count.model';
import { CountryModel } from '../models/country.model';
import { SummaryModel, SummaryResponse } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19ApiService {

  cache = {};

  constructor(private http: HttpClient) { }

  totalsSinceDayOne(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    const url = `https://api.covid19api.com/country/${countrySlug}/status/${status}`;
    return this.getOrLoadFromCache(url);
  }

  countryTotalsSinceDayOne(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    const url = `https://api.covid19api.com/total/dayone/country/${countrySlug}/status/${status}`;
    return this.getOrLoadFromCache(url);
  }


  totalsByCountry(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    const url = `https://api.covid19api.com/country/${countrySlug}/status/${status}`;
    return this.getOrLoadFromCache(url);
  }

  getCountries(): Observable<CountryModel[]> {
    const url = `https://api.covid19api.com/countries`;
    return this.getOrLoadFromCache(url);
  }

  getSummary(): Observable<SummaryModel[]> {
    const url = `https://api.covid19api.com/summary`;
    return this.getOrLoadFromCache(url).pipe(map(resp => resp.Countries));
  }

  private getOrLoadFromCache(url): Observable<any> {
    if (this.cache[url]) {
      return of(this.cache[url] as TotalCount[]);
    } else {
      return this.http.get(url).pipe(map(resp => {
        this.cache[url] = resp;
        return resp;
      }));
    }
  }
}
