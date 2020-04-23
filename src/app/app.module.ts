import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import * as fromApp from './app.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailsComponent } from './flights/flight-details/flight-details.component';
import { PassengerComponent } from './passenger/passenger.component';
import { EffectsModule } from '@ngrx/effects';
import { FlightEffects } from './flights/store/flight.effects';
import * as flightActions from './flights/store/flight.actions';
import { SeatmapComponent } from './flights/seatmap/seatmap.component';
import { CheckinComponent } from './flights/checkin/checkin.component';
import { SeatcheckinComponent } from './flights/seatmap/seatcheckin/seatcheckin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FlightsComponent,
    FlightDetailsComponent,
    PassengerComponent,
    SeatmapComponent,
    CheckinComponent,
    SeatcheckinComponent,
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
    EffectsModule.forRoot([FlightEffects]),
    FlexLayoutModule,
  ],
  entryComponents:[PassengerComponent,SeatcheckinComponent],
  providers: [{
    provide:APP_INITIALIZER,
    useFactory:(store:Store<fromApp.appState>)=>{
      return ()=>{
        store.dispatch(new flightActions.FetchFlights())
      }
    },
    multi:true,
    deps:[Store]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
