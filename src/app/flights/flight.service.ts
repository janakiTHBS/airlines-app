import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as environment from '../../environments/environment';
import { Flight } from './flight.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { map } from 'rxjs/operators';
import { Passenger } from '../passenger/passenger.model';
import { Seat } from './seatmap/seat.model';
import { CheckinStatus } from './enums/CheckinStatus.enum';
import { PassengerType } from './enums/PassengerType.enum';
import { SeatmapService } from './seatmap/seatmap.service';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flight: Flight;
  private seatsOccupied: Seat[] = [];
  private checkedInPassenegersMap = new Map<string, PassengerType>();
  private seatNumberWithPaxMap = new Map<string, Passenger>();
  private paxRequiringSpecialMealsMap = new Map<string, string>();
  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>,
              private seatService: SeatmapService) {

  }

  fetchFlights() {
  return this.http.get<Flight[]>(environment.environment.apiUrl + 'flightDetailsList').toPromise();
  }

  getFlight(id: number){
    this.store.select('flights').subscribe(flightState => {
       this.flight = flightState.flights.find((flight, index) => {
        return id.toString() === flight.id.toString();
      });
    });
    console.log(this.flight);
    return this.flight;
  }

  getSelectedFlight(){
    return this.flight;
  }

  assignSeat(passenger: Passenger, seatNo: string){
    const occupiedSeatsSatus = this.getSeatsOccupied();
    const totalSeats = this.seatService.getTotalSeats();
    if (this.isNumericValue(passenger.seatNumber) && this.seatService.isSeatAvailable(Number(passenger.seatNumber))) {
    passenger.seatNumber = seatNo.toString();
    const seatStatus: Seat = this.constructSeatStatus(passenger);
    occupiedSeatsSatus.push(seatStatus);
    this.seatService.getseatsAvailable().splice(Number(passenger.seatNumber) - 1, 1, -1);
  }
    else {
      const seats: string[] = occupiedSeatsSatus.map(seat => seat.seatNumber);
      for (const availableSeat of totalSeats) {
          if (!(seats.includes(availableSeat.toString()))) {
              passenger.seatNumber = availableSeat.toString();
              const seatStatus: Seat = this.constructSeatStatus(passenger);
              console.log(seatStatus);
              occupiedSeatsSatus.push(seatStatus);
              this.seatService.getseatsAvailable().splice(availableSeat - 1, 1, -1);
              break;
          }
      }
    }
    this.getseatNumberWithPaxMap().set(passenger.seatNumber, passenger);
  }

  public constructSeatStatus(pax: Passenger, seatNumber?: string, ): Seat {
    const isWheelChairPax: boolean = (pax.passengerType === 'WC') ? true : false;
    const isInfantAssociated: boolean = (pax.passengerType === 'INF') ? true : false;
    if (pax.checkinStatus === CheckinStatus.AC.toString()) {
        if (pax.passengerType === PassengerType.INF.toString()) {
            this.getcheckedInPassengersMap().set(pax.seatNumber, PassengerType.INFANT_ASSOCIATED);
        } else if (pax.passengerType === PassengerType.WC.toString()) {
            this.getcheckedInPassengersMap().set(pax.seatNumber, PassengerType.WHEEL_CHAIR);
        } else {
            this.getcheckedInPassengersMap().set(pax.seatNumber, PassengerType.CHECKED_IN);
        }
        const mealPreference: string = (pax.mealPreference) ? pax.mealPreference : '';
        this.getpaxRequiringSpecialMealsMap().set(pax.seatNumber, mealPreference);
    }
    return new Seat(pax.seatNumber, pax.checkinStatus, isWheelChairPax, isInfantAssociated);
}

removeSeatAllocated(seatNumber: string) {
  const occupiedSeatsSatus = this.getSeatsOccupied();
  occupiedSeatsSatus.forEach((seat, arrIndex) => {
      if (seatNumber === seat.seatNumber) {
          occupiedSeatsSatus.splice(arrIndex, 1);
          this.seatService.getseatsAvailable().splice(Number(seatNumber) - 1, 1, Number(seatNumber));
          this.getcheckedInPassengersMap().delete(seatNumber);
          this.getseatNumberWithPaxMap().delete(seatNumber);
          this.getpaxRequiringSpecialMealsMap().delete(seatNumber);
          return;
      }
  });

}

public getseatNumberWithPaxMap() {
  return this.seatNumberWithPaxMap;
}
getcheckedInPassengersMap(){
return this.checkedInPassenegersMap;
}

clearSeatAllowment(){
  this.seatNumberWithPaxMap.clear();
}
removeCheckedInPassengerMap(){
  this.checkedInPassenegersMap.clear();
}
public isNumericValue(numberParam) {
  const num = Number(numberParam);
  return num === num;
}

public getSeatsOccupied(): Seat[] {
  return this.seatsOccupied;
}

public getpaxRequiringSpecialMealsMap() {
  return this.paxRequiringSpecialMealsMap;
}
}
