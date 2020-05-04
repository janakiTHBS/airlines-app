import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  hide = true;
  signInErr = false;
  registerForm: FormGroup;
  submitted = false;
  user: any;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              public ngZone: NgZone,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
  });
  }

  get f() { return this.registerForm.controls; }

 async onSubmit() {
  this.signInErr = false;
  this.submitted = true;
  this.user = await this.authService.fetchUserDetails(this.registerForm.get('username').value, this.registerForm.get('password').value);
  if (this.user[0] == null){
    console.log('inside signinerror');
    this.signInErr = true;
   }
  if (this.user[0].type === 'admin'){
    this.store.dispatch(new AuthActions.Authenticate(this.user[0].userName));
  } else {
    this.store.dispatch(new AuthActions.UserAuth(this.user[0].userName));
  }
  this.authService.loginSucessful.next(null);
  this.router.navigate(['flights']);

}
signInWithGoogle() {
  this.authService
    .signInWithGoogle()
    .then(res => {
      this.signInErr = false;
      console.log(res);
      this.store.dispatch(new AuthActions.UserAuth(res.user.displayName));
      this.ngZone.run(() => this.router.navigate(['flights']));
    })
    .catch(err => this.signInErr = false);
}

getSignInErrMsg(formField): string {
  const form = this.registerForm;
  let errMsg: string;
  switch (formField) {
    case 'USERNAME': errMsg = form.get('username').hasError('required') ? 'Please enter user name' :
      form.get('userName').hasError('minlength') ? 'User name should have atleast 4 characters' : '';
                     break;
    case 'PASSWORD': errMsg = form.get('password').hasError('required') ? 'Please enter password' :
      form.get('password').hasError('minlength') ? 'Password should have atleast 4 characters' : '';
                     break;
    case 'SIGN_IN': errMsg = 'Invalid user name or password';
                    break;
    default: errMsg = 'Please enter valid data';
             break;
  }
  return errMsg;
}

}
