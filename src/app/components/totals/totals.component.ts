import { Component, OnInit, Input } from '@angular/core';
import { Covid19ApiService } from 'src/app/services/covid-19-api.service';
import { SummaryModel } from 'src/app/models/summary.model';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.less']
})
export class TotalsComponent implements OnInit {

  @Input() title: string;
  @Input() field: 'TotalConfirmed' | 'TotalDeaths' | 'TotalRecovered';
  @Input() badgeStyle: 'danger' | 'light' | 'success';

  totals: SummaryModel[] = [];
  total: number = 0;
  

  constructor(private covid19Service: Covid19ApiService) { }

  ngOnInit() {
    this.covid19Service.getSummary().subscribe(resp => {
      this.totals = resp.sort((a, b) => {
        return a[this.field] > b[this.field] ? -1 : 1;
      });

      this.total = this.totals.map(t => t[this.field]).reduce((prev, next) => prev + next);
    });
  }
}
