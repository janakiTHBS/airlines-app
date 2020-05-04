import { TestBed } from '@angular/core/testing';

import { FlightresolverService } from './flightresolver.service';
import { FlightService } from './flight.service';

describe('FlightresolverService', () => {
  let service: FlightresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: FlightService, useClass: FlightServiceStub}]
    });
    service = TestBed.inject(FlightresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


class FlightServiceStub {

}
