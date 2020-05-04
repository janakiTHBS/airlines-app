import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromApp from '../app.reducer';
import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const initialState = {
    auth: null,
    flights: null};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       RouterTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.debugElement.injector.get(Store);
    fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class AuthServiceStub {

}
