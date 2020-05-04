import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinComponent } from './checkin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../flight.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CheckinComponent', () => {
  let component: CheckinComponent;
  let fixture: ComponentFixture<CheckinComponent>;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule],
      declarations: [ CheckinComponent ],
      providers: [
        {provide: FlightService, useClass: FlightServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinComponent);
    fixture.debugElement.injector.get(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class FlightServiceStub {

}
