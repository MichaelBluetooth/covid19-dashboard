import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TotalCount } from '../models/total-count.model';
import { CountryModel } from '../models/country.model';
import { SummaryModel, SummaryResponse } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class Covid19ApiService {

  constructor(private http: HttpClient) { }

  totalsSinceDayOne(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    return this.http.get(`https://api.covid19api.com/country/${countrySlug}/status/${status}`).pipe(map(resp => {                              
      return resp as TotalCount[];
    }));
  }

  countryTotalsSinceDayOne(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]> {
    return this.http.get(`https://api.covid19api.com/total/dayone/country/${countrySlug}/status/${status}`).pipe(map(resp => {                  
      return resp as TotalCount[];
    }));
  }


  totalsByCountry(countrySlug: string, status: 'confirmed' | 'recovered' | 'deaths'): Observable<TotalCount[]>{
    return this.http.get(`https://api.covid19api.com/country/${countrySlug}/status/${status}`).pipe(map(resp => {
      return resp as TotalCount[];
    }));
  }

  getCountries(): Observable<CountryModel[]> {
    return this.http.get(`https://api.covid19api.com/countries`).pipe(map((resp) => {
      return resp as CountryModel[];
    }));
  }

  getSummary(): Observable<SummaryModel[]> {
    return this.http.get(`https://api.covid19api.com/summary`).pipe(map((resp: SummaryResponse) => {
      return resp.Countries as SummaryModel[];
    }));
  }
}
