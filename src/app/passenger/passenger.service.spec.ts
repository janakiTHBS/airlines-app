import { TestBed } from '@angular/core/testing';

import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  let service: PassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PassengerService, useClass: PassengerServiceStub}
      ]
    });
    service = TestBed.inject(PassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class PassengerServiceStub {

}
