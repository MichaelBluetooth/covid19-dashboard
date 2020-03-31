import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TotalCount } from 'src/app/models/total-count.model';

@Component({
  selector: 'app-county-details',
  templateUrl: './county-details.component.html',
  styleUrls: ['./county-details.component.less']
})
export class CountyDetailsComponent implements OnInit {

  @Input() total: TotalCount;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
