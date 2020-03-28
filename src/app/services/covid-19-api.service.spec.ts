import { TestBed } from '@angular/core/testing';

import { Covid19ApiService } from './covid-19-api.service';

describe('Covid19ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Covid19ApiService = TestBed.get(Covid19ApiService);
    expect(service).toBeTruthy();
  });
});
