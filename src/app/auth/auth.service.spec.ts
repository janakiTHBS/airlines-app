import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Router, RouterModule, ɵROUTER_PROVIDERS } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        {provide: AngularFireAuth, useClass: AngularFireAuthStub}
      ],

    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class AngularFireAuthStub {

}
