import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as environemnt from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface UserLogInStatus {
  userName: string;
  role: string;
  loginStatus: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private normalUserLoggedIn = false;
  private normalUser: any;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  loginSucessful = new BehaviorSubject<UserLogInStatus>(null);
  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private http: HttpClient) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;

      } else {
        this.userDetails = null;
      }
    });
   }

   fetchUserDetails(username, password){
    this.normalUser = this.http.
    get(environemnt.environment.apiUrl + 'loginDetails?userName=' + username + '&password=' + password)
    .toPromise();
    console.log(this.normalUser);
    if (this.normalUser != null){
     this.normalUserLoggedIn = true;
   }
    return this.normalUser;
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails != null || this.normalUserLoggedIn ) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(['/']));
  }
}
