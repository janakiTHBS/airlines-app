import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatmapComponent } from './seatmap.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { SeatmapService } from './seatmap.service';
import { MockStore } from '@ngrx/store/testing';

xdescribe('SeatmapComponent', () => {
  let component: SeatmapComponent;
  let fixture: ComponentFixture<SeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatmapComponent);
    fixture.debugElement.injector.get(ActivatedRoute);
    fixture.debugElement.injector.get(FlightService);
    fixture.debugElement.injector.get(SeatmapService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
