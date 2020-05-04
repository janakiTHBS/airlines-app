import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InFlightComponent } from './in-flight.component';
import { SeatmapService } from '../seatmap/seatmap.service';
import { FlightService } from '../flight.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ],
      declarations: [ InFlightComponent ],
      providers: [
     {provide: FlightService, useClass: FlightServiceStub},
     {provide: SeatmapService, useClass: SeatmapServiceStub},
     {provide: MatDialog, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlightComponent);
    fixture.debugElement.injector.get(SeatmapService);
    fixture.debugElement.injector.get(FlightService);
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
