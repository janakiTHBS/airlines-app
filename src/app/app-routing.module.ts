import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {FlightDetailsComponent} from './flights/flight-details/flight-details.component';
import { AuthguardService } from './auth/authguard.service';
import { FlightsComponent } from './flights/flights.component';
import { FlightresolverService } from './flights/flightresolver.service';
import { SeatmapComponent } from './flights/seatmap/seatmap.component';
import { CheckinComponent } from './flights/checkin/checkin.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"flights",component:FlightsComponent,canActivate:[AuthguardService]},
  {path:"flights/:id",component:FlightDetailsComponent},
  {path:"seats",component:SeatmapComponent},
  {path:"flights/:id/checkIn",component:CheckinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
