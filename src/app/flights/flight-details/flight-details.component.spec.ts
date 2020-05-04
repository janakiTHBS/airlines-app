import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { PassengerService } from 'src/app/passenger/passenger.service';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../../app.reducer';
describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;
  const initialState = {
  auth: null,
  flights: null};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ FlightDetailsComponent ],
      providers: [
        provideMockStore({initialState}),
        {provide: FlightService, useClass: FlightServiceStub},
        {provide: PassengerService, useClass: PassengerServiceStub},
        {provide: MatDialog, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    fixture.debugElement.injector.get(FlightService);
    fixture.debugElement.injector.get(PassengerService);
    fixture.debugElement.injector.get(Store);
    fixture.debugElement.injector.get(MatDialog);
    fixture.debugElement.injector.get(FormBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class FlightServiceStub {

}

class PassengerServiceStub {

}
