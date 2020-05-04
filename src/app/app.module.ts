import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import * as fromApp from './app.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailsComponent } from './flights/flight-details/flight-details.component';
import { PassengerComponent } from './passenger/passenger.component';
import { EffectsModule } from '@ngrx/effects';
import { FlightEffects } from './flights/store/flight.effects';
import * as flightActions from './flights/store/flight.actions';
import { SeatmapComponent } from './flights/seatmap/seatmap.component';
import { SeatcheckinComponent } from './flights/seatmap/seatcheckin/seatcheckin.component';
import { InFlightComponent } from './flights/in-flight/in-flight.component';
import { CheckinComponent } from './flights/checkin/checkin.component';
import { FlightCheckInComponent } from './flights/in-flight/flight-check-in/flight-check-in.component';
import { DatePipe } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlightsComponent,
    LoginComponent,
    FlightDetailsComponent,
    PassengerComponent,
    SeatmapComponent,
    CheckinComponent,
    SeatcheckinComponent,
    InFlightComponent,
    FlightCheckInComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    MaterialModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'angular-auth-firebase'
    ),
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.AppReducer),
    EffectsModule.forRoot([FlightEffects]),
    FlexLayoutModule,

  ],
  entryComponents: [PassengerComponent, SeatcheckinComponent, FlightCheckInComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (store: Store<fromApp.AppState>) => {
      return () => {
        store.dispatch(new flightActions.FetchFlights());
      };
    },
    multi: true,
    deps: [Store]
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
