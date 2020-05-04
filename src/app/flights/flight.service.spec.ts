import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight.service';
import { HttpClient } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
describe('FlightService', () => {
  let service: FlightService;
  const initialState = {
  auth: null,
  flights: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    });
    TestBed.inject(Store);
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
