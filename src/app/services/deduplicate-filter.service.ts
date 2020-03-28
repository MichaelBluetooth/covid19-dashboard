import { Injectable } from '@angular/core';
import { TotalCount } from '../models/total-count.model';

@Injectable({
  providedIn: 'root'
})
export class DeduplicateFilterService {

  constructor() { }

  dedupe(items: TotalCount[]): TotalCount[] {
    const byProvince = {};
    items.forEach(i => {
      if (!byProvince[i.Province]) {
        byProvince[i.Province] = []
      }

      byProvince[i.Province].push(i);
    });

    const latestTotalsForProvince: TotalCount[] = [];
    Object.keys(byProvince).forEach(province => {
      const latestValueForProvince = byProvince[province].reduce((prev, current) => {
        const prevDate = new Date(prev.Date);
        const curDate = new Date(current.Date);

        return prevDate > curDate ? prev : current;
      });

      latestTotalsForProvince.push(latestValueForProvince);
    });

    return latestTotalsForProvince;
  }
}
