import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminFlightComponent } from './admin-flight/admin-flight.component';
import { UserFlightComponent } from './user-flight/user-flight.component';
import { AuthguardService } from './auth/authguard.service';
import { FlightDetailsComponent } from './admin-flight/flight-details/flight-details.component';
import { PassengerComponent } from './passenger/passenger.component';
import { SeatmapComponent } from './seatmap/seatmap.component';


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"admin",component:AdminFlightComponent,canActivate:[AuthguardService]},
  {path:"user",component:UserFlightComponent,canActivate:[AuthguardService]},
  {path:"flights/:id",component:FlightDetailsComponent},
  {path:"flights/:id/passenger",component:PassengerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
