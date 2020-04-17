import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminFlightComponent } from './admin-flight/admin-flight.component';
import { UserFlightComponent } from './user-flight/user-flight.component';
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeatmapComponent } from './seatmap/seatmap.component';
import { MaterialModule } from './material.module';
import * as fromApp from './app.reducer';
import { StoreModule } from '@ngrx/store';
import { FlightDetailsComponent } from './admin-flight/flight-details/flight-details.component';
import { PassengerComponent } from './passenger/passenger.component';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminFlightComponent,
    UserFlightComponent,
    HeaderComponent,
    SeatmapComponent,
    FlightDetailsComponent,
    PassengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    MaterialModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      "angular-auth-firebase"
    ),
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
