import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../flight.service';
import { PassengerType } from '../../enums/PassengerType.enum';
import { CheckinStatus } from '../../enums/CheckinStatus.enum';
import { Passenger } from 'src/app/passenger/passenger.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as flightActions from '../../store/flight.actions';
import { Flight } from '../../flight.model';
import { SeatmapService } from '../seatmap.service';
@Component({
  selector: 'app-seatcheckin',
  templateUrl: './seatcheckin.component.html',
  styleUrls: ['./seatcheckin.component.css']
})
export class SeatcheckinComponent implements OnInit {
  flightId: number;
  seatNo: string;
  flight: Flight;
  passengers: Passenger[];
  isCheckedInPaxMode = false;
  constructor(private matDialogRef: MatDialogRef<SeatcheckinComponent>,
              @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute, seatNumber: string},
              private flightService: FlightService,
              private seatService: SeatmapService,
              private store: Store<fromApp.AppState>) {
     data.route.params.subscribe(params => {
        this.flightId = params.id;
      });
     this.seatNo = data.seatNumber;
    }

  ngOnInit(): void {
    this.flight = this.flightService.getFlight(this.flightId);
    if (this.flightService.isNumericValue(this.seatNo) && !this.seatService.isSeatAvailable(+this.seatNo)){
      this.isCheckedInPaxMode = true;
      this.passengers = this.flight.passengers.filter((passenger) => {
        return passenger.seatNumber === this.seatNo.toString();
      });
    }
    else {
      this.passengers = this.flight.passengers.filter((passenger) => {
        return passenger.checkinStatus === CheckinStatus.NC.toString();
      });
    }
  }

  onCheckin(passenger){
    if (!this.isCheckedInPaxMode){
      const updatepassenger = this.flightService.getFlight(this.flightId).passengers.find((psgr, index) => {
        return passenger.passportNumber === psgr.passportNumber;
       });
      updatepassenger.seatNumber = this.seatNo;
      updatepassenger.checkinStatus = CheckinStatus.AC;
      this.flightService.assignSeat(updatepassenger, this.seatNo);
      this.store.dispatch(new flightActions.UpdatePassenger(
         {
           fid: this.flightId - 1,
           pid: passenger.passportNumber,
           passenger: updatepassenger
         }));

     } else {
      if (passenger){
        passenger.checkinStatus = 'NC';
        this.flightService.removeSeatAllocated(passenger.seatNumber);
        passenger.seatNumber = '-';
        this.store.dispatch(new flightActions.UpdatePassenger({
        fid: this.flightId - 1,
        pid: passenger.passportNumber,
        passenger
      }));
      }
     }
    this.matDialogRef.close();
    }


}
