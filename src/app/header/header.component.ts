import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import * as AuthActions from '../auth/store/user.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUserName: string;
  userRole: string;
  loggedIn: boolean;
  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.loginSucessful.subscribe(() => {
      this.store.select('auth').subscribe(authuser => {
        console.log(authuser);
        this.loggedIn = authuser.isLoggedIn;
        this.loginUserName = authuser.user;
        this.userRole = authuser.isAdmin ? 'admin' : 'user';
      });

    });

  }

  onLogout(){
  this.store.dispatch(new AuthActions.Logout());
  this.router.navigate(['/']);
  }

}
