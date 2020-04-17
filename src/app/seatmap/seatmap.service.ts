import { Injectable } from '@angular/core';
import { Seat } from './seat.model';
import { Store } from '@ngrx/store';
import * as fromApp from "../app.reducer";
import { FlightService } from '../flight/flight.service';
@Injectable({
  providedIn: 'root'
})
export class SeatmapService {

  seat: Seat;
  constructor(
    private store: Store<fromApp.appState>,
    private flightService: FlightService
  ) {
    
  }

  selectSeat(seat: Seat, i) {
    this.seat = seat;
    // this.store.dispatch(
    // new SeatActions.SelectSeat({
    // seat: seat.seatno,
    //color: "white",
    //index: i
    //})
    //);
  }
  getSelectedSeat() {
    return this.seat;
  }
}
