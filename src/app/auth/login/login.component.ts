import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as environemnt from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as AuthActions from '../store/user.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user:any;
  constructor(private formBuilder:FormBuilder,
  private authService:AuthService,
  public ngZone: NgZone,
  private router: Router,
  private store:Store<fromApp.appState>) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
  });
  }

  get f() { return this.registerForm.controls; }

 async onSubmit() {
  this.submitted = true;
  this.user=await this.authService.fetchUserDetails(this.registerForm.get('username').value,this.registerForm.get('password').value);
  console.log(this.user[0].type=="admin");
  if(this.user[0].type=="admin"){
    this.store.dispatch(new AuthActions.Authenticate(this.user[0].userName));
  } else {
    this.store.dispatch(new AuthActions.UserAuth(this.user[0].userName));
  }
   this.authService.loginSucessful.next(null);
  this.router.navigate(["flights"]);

}
signInWithGoogle() {
  this.authService
    .signInWithGoogle()
    .then(res => {
      console.log(res);
      this.store.dispatch(new AuthActions.UserAuth(res.user.displayName));
      this.ngZone.run(() => this.router.navigate(["flights"]));
    })
    .catch(err => console.log(err));
}

}
