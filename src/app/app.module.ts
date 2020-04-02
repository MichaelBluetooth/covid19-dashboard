import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { TotalsComponent } from './components/totals/totals.component';
import { TotalConfirmedComponent } from './components/total-confirmed/total-confirmed.component';
import { ChartComponent } from './components/chart/chart.component';
import { CountyDetailsComponent } from './components/county-details/county-details.component';
import { StateIncreaseComponent } from './components/state-increase/state-increase.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TotalsComponent,
    TotalConfirmedComponent,
    ChartComponent,
    CountyDetailsComponent,
    StateIncreaseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8aDPJkDo3CE-84n9TEioBFWz5LB696NA'
    }),
    TabsModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
