import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapCoordinates } from '../models/map-coordinates.model';
import { STATE_COORDINATES } from '../data/state-coordinates';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  // initial center position for the map (Ithaca NY)
  private _currentLocation: BehaviorSubject<MapCoordinates> = new BehaviorSubject<MapCoordinates>({
    lat: 42.443962,
    lng: -76.501884
  });

  get currentLocation$(): Observable<MapCoordinates> {
    return this._currentLocation.asObservable();
  }

  constructor() { }

  updateLocation(state: string): void {
    if (STATE_COORDINATES[state]) {
      this._currentLocation.next(STATE_COORDINATES[state]);
    }
  }

  updateLocationByCoordinate(lat: number, lng: number): void {
    this._currentLocation.next({ lat: lat, lng: lng });
  }
}
