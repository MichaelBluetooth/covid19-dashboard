import { TestBed } from '@angular/core/testing';

import { DeduplicateFilterService } from './deduplicate-filter.service';

fdescribe('DeduplicateFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeduplicateFilterService = TestBed.get(DeduplicateFilterService);
    expect(service).toBeTruthy();
  });

  it('should de-dupe the filter by taking the greatest value', () => {
    const testCase = [
      {
        Province: "New York, Tompkins",
        Date: "2020-03-21T00:00:00Z",
        Cases: 16,
      },
      {
        Province: "New York, Tompkins",
        Date: "2020-03-22T00:00:00Z",
        Cases: 22,
      },
      {
        Province: "New York, Tompkins",
        Date: "2020-04-24T00:00:00Z",
        Cases: 10,
      },
      {
        Province: "New York, Another",
        Date: "2020-03-22T00:00:00Z",
        Cases: 2,
      },
      {
        Province: "New York, Another",
        Date: "2020-04-24T00:00:00Z",
        Cases: 4,
      }
    ];

    const service: DeduplicateFilterService = TestBed.get(DeduplicateFilterService);
    const results = service.dedupe(testCase);
    expect(results.length).toBe(2);
    expect(results.find(i => i.Province === "New York, Tompkins").Cases).toBe(10);
    expect(results.find(i => i.Province === "New York, Another").Cases).toBe(4);
  });
});
