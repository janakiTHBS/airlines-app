import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from 'src/app/passenger/passenger.model';
import { SeatmapService } from '../seatmap/seatmap.service';
import { CheckinStatus } from '../enums/CheckinStatus.enum';
import { PassengerType } from '../enums/PassengerType.enum';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as flightActions from '../store/flight.actions';
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, OnDestroy {
  enableSeatmap: boolean;
   flightId: number;
   flight: Flight;
   listPassenger: MatTableDataSource<Passenger>;
  displayPassengerColumns: string[] = [
    'name',
    'passportNumber',
    'checkinStatus',
    'passengerType',
    'seatNumber'
  ];
  constructor(private route: ActivatedRoute,
              private flightService: FlightService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
   this.flightId = params.id;
    });
    this.flight = this.flightService.getFlight(this.flightId);
    this.flight.passengers.forEach((passenger) => {
      if (passenger.checkinStatus === CheckinStatus.AC.toString()){
        if (passenger.passengerType === PassengerType.INF.toString()) {
          this.flightService.getcheckedInPassengersMap().set(passenger.seatNumber, PassengerType.INFANT_ASSOCIATED);
      } else if (passenger.passengerType === PassengerType.WC.toString()) {
          this.flightService.getcheckedInPassengersMap().set(passenger.seatNumber, PassengerType.WHEEL_CHAIR);
      } else {
          this.flightService.getcheckedInPassengersMap().set(passenger.seatNumber, PassengerType.CHECKED_IN);
      }
        const mealPreference: string = (passenger.mealPreference) ? passenger.mealPreference : '';
        this.flightService.getpaxRequiringSpecialMealsMap().set(passenger.seatNumber, mealPreference);
      }

    });
    console.log(this.flight);
    this.listPassenger = new MatTableDataSource(this.flight.passengers);
  }
  ngOnDestroy(){

  }
}
