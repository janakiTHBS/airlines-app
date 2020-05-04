import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsComponent } from './flights.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlightService } from './flight.service';
import { SeatmapService } from './seatmap/seatmap.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../app.reducer';
import { FormBuilder } from '@angular/forms';
describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  const initialState = {
    auth: null,
    flights: null};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ],
      declarations: [ FlightsComponent ],
      providers: [
        {provide: FlightService, useClass: FlightServiceStub},
        {provide: SeatmapService, useClass: SeatmapServiceStub},
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    fixture.debugElement.injector.get(FlightService);
    fixture.debugElement.injector.get(SeatmapService);
    fixture.debugElement.injector.get(Store);
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

class SeatmapServiceStub {

}
