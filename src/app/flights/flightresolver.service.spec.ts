import { TestBed } from '@angular/core/testing';

import { FlightresolverService } from './flightresolver.service';

describe('FlightresolverService', () => {
  let service: FlightresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
