import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatcheckinComponent } from './seatcheckin.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FlightService } from '../../flight.service';
import { SeatmapService } from '../seatmap.service';

xdescribe('SeatcheckinComponent', () => {
  let component: SeatcheckinComponent;
  let fixture: ComponentFixture<SeatcheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatcheckinComponent ],
     providers: [{provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatcheckinComponent);
    fixture.debugElement.injector.get(Store);
    fixture.debugElement.injector.get(FlightService);
    fixture.debugElement.injector.get(SeatmapService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
