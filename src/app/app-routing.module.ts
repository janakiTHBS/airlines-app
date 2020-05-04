import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {FlightDetailsComponent} from './flights/flight-details/flight-details.component';
import { AuthguardService } from './auth/authguard.service';
import { FlightsComponent } from './flights/flights.component';
import { FlightresolverService } from './flights/flightresolver.service';
import { SeatmapComponent } from './flights/seatmap/seatmap.component';
import { CheckinComponent } from './flights/checkin/checkin.component';
import { InFlightComponent } from './flights/in-flight/in-flight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {path: 'auth', component: LoginComponent},
  {path: 'flights', component: FlightsComponent, canActivate: [AuthguardService]},
  {path: 'flights/:id', component: FlightDetailsComponent, canActivate: [AuthguardService]},
  {path: 'flights/:id/checkIn', component: CheckinComponent, canActivate: [AuthguardService]},
  {path: 'flights/:id/inflight', component: InFlightComponent, canActivate: [AuthguardService]},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
