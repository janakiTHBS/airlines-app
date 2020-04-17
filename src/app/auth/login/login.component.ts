import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as environemnt from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
  private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.required]],
  });
  }

  get f() { return this.registerForm.controls; }

 async onSubmit() {
  this.submitted = true;
  this.user=await this.authService.fetchUserDetails(this.registerForm.get('username').value,this.registerForm.get('password').value);
  if(this.user[0].type=="admin"){
    this.router.navigate(["/admin"]);
  }
  else {
    this.router.navigate(["/user"]);
  }
}
signInWithGoogle() {
  this.authService
    .signInWithGoogle()
    .then(res => {
      this.ngZone.run(() => this.router.navigate(["user"]));
    })
    .catch(err => console.log(err));
}

}
