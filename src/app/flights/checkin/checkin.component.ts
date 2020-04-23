import { Component, OnInit } from '@angular/core';
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
export class CheckinComponent implements OnInit {
  enableSeatmap:boolean;
   flightId:number;
   flight:Flight;
   listPassenger: MatTableDataSource<Passenger>;
  displayPassengerColumns: string[] = [
    "name",
    "passportNumber",
    "checkinStatus",
    "passengerType",
    "seatNumber",
    "action"
  ];
  constructor(private route:ActivatedRoute,
    private flightService:FlightService,
    private seatService:SeatmapService,
    private store:Store<fromApp.appState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
   this.flightId=params["id"];
    });
    this.flight=this.flightService.getFlight(this.flightId);
    console.log(this.flight);
    this.flightService.clearSeatAllowment();
    this.seatService.clearSeatAlloment();
   this.listPassenger=new MatTableDataSource(this.flight.passengers);
  }

  onOffloadPassenger(passenger){
    if(passenger){
      passenger.checkinStatus='NC';
      this.flightService.removeSeatAllocated(passenger.seatNumber);
      passenger.seatNumber = '-';
     this.store.dispatch(new flightActions.UpdatePassenger({
      fid:this.flightId-1,
      pid:passenger.passportNumber,
      passenger:passenger
    }))
    }
  
  }
}
