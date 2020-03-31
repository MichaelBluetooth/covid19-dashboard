import { Component } from '@angular/core';
import { DeduplicateFilterService } from 'src/app/services/deduplicate-filter.service';
import { ALL_US_STATES } from 'src/app/data/states';
import { Covid19ApiService } from 'src/app/services/covid-19-api.service';
import { AppStateService } from 'src/app/services/app-state.service';
import { TotalCount } from 'src/app/models/total-count.model';

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

//For help: https://stackblitz.com/edit/angular-google-maps-demo

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent {

  selectedCounty = null;

  data: any[] = [];
  zoom: number = 7;
  currentLocation$ = this.appState.currentLocation$;

  constructor(private covid19ApiService: Covid19ApiService, private deduplicateService: DeduplicateFilterService, private appState: AppStateService) { }

  ngOnInit() {
    this.covid19ApiService.totalsByCountry('US', 'confirmed').subscribe(raw => {
      this.data = this.deduplicateService.dedupe(raw).filter(dp => this.include(dp.Province)).map(dp => {
        let radius = Math.log(dp.Cases) * 100 * (1 / this.zoom * 120);
        return {
          lat: dp.Lat,
          lng: dp.Lon,
          radius: radius,
          label: dp.Province,
          data: dp
        }
      });
    });
  }

  update() {
    this.ngOnInit();
  }

  include(province: string) {
    return province !== '' && !ALL_US_STATES.includes(province);
    // return province.indexOf('New York') > -1 ||
    //   province.indexOf('New Jersey') > -1 ||
    //   province.indexOf('Pennsylvania') > -1 ||
    //   province.indexOf('Massachusetts') > -1
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  circleClicked(dataPoint: any) {
    this.appState.updateLocationByCoordinate(dataPoint.data.Lat, dataPoint.data.Lng);
    this.selectedCounty = dataPoint.data;
  }

  clearSelected(){
    this.selectedCounty = null;
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event['coords'].lat,
    //   lng: $event['coords'].lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}
