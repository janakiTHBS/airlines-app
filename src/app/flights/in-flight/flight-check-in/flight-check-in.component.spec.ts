import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightCheckInComponent } from './flight-check-in.component';



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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
