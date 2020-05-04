import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
describe('LoginComponent', () => {
let login = LoginComponent;
const initialState = {
  auth: null,
  flights: null};
beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule,
      RouterTestingModule,
     ],
      providers: [
       {provide: AuthService, useClass: AuthServiceStud},
       provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

it('should create the login', () => {
   const fixture = TestBed.createComponent(LoginComponent);
   fixture.debugElement.injector.get(Store);
   login = fixture.debugElement.componentInstance;
   expect(login).toBeTruthy();
  });
});

class AuthServiceStud {
  isLoggedIn() {
  return true;
  }

  fetchUserDetails(username, password){
    return new User('janaki', 'jnkrm@gmail.com');
  }

}


class User {
  name: string;
  email: string;
  constructor(name: string, email: string){
    this.name = name;
    this.email = email;
  }

}
