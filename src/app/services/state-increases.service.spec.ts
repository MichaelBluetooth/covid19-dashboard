import { TestBed } from '@angular/core/testing';

import { StateIncreasesService } from './state-increases.service';

describe('StateIncreasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateIncreasesService = TestBed.get(StateIncreasesService);
    expect(service).toBeTruthy();
  });
});
