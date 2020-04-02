import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MapCoordinates } from '../models/map-coordinates.model';
import { STATE_COORDINATES } from '../data/state-coordinates';
import { BarChartModel } from '../models/bar-chart.model';
import { STATE_ABBEVIATIONS } from '../data/state-abbreviates';
import { StateIncreasesService } from './state-increases.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  // initial center position for the map (Ithaca NY)
  private _currentLocation: BehaviorSubject<MapCoordinates> = new BehaviorSubject<MapCoordinates>({
    lat: 42.443962,
    lng: -76.501884
  });
  private _dailyIncreases: Subject<BarChartModel> = new Subject<BarChartModel>();

  get currentLocation$(): Observable<MapCoordinates> {
    return this._currentLocation.asObservable();
  }

  get dailyIncreases$(): Observable<BarChartModel> {
    return this._dailyIncreases.asObservable();
  }

  constructor(private dailyIncreasesService: StateIncreasesService) { }

  updateLocation(state: string): void {
    if (STATE_COORDINATES[state]) {
      this._currentLocation.next(STATE_COORDINATES[state]);
    }

    if(STATE_ABBEVIATIONS[state]){
      this.dailyIncreasesService.getChartData(STATE_ABBEVIATIONS[state]).subscribe(d => {
        this._dailyIncreases.next(d);
      });
    }
  }

  updateLocationByCoordinate(lat: number, lng: number): void {
    this._currentLocation.next({ lat: lat, lng: lng });
  }
}
