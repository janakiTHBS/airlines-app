import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightCheckInComponent } from './flight-check-in.component';
import { FlightService } from '../../flight.service';
import { Store } from '@ngrx/store';



describe('CheckInComponent', () => {
  let component: FlightCheckInComponent;
  let fixture: ComponentFixture<FlightCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCheckInComponent);
    fixture.debugElement.injector.get(FlightService);
    fixture.debugElement.injector.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
