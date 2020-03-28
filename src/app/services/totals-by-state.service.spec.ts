import { TestBed } from '@angular/core/testing';

import { TotalsByStateService } from './totals-by-state.service';

describe('TotalsByStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalsByStateService = TestBed.get(TotalsByStateService);
    expect(service).toBeTruthy();
  });
});
