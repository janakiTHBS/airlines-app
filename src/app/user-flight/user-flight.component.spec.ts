import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFlightComponent } from './user-flight.component';

describe('UserFlightComponent', () => {
  let component: UserFlightComponent;
  let fixture: ComponentFixture<UserFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
