import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatcheckinComponent } from './seatcheckin.component';

describe('SeatcheckinComponent', () => {
  let component: SeatcheckinComponent;
  let fixture: ComponentFixture<SeatcheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatcheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatcheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
