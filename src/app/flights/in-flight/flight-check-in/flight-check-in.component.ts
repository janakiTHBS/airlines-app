import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Flight } from '../../flight.model';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/passenger/passenger.model';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightService } from '../../flight.service';
import * as fromApp from '../../../app.reducer';
import { Store } from '@ngrx/store';
import * as flightActions from '../../store/flight.actions';
@Component({
  selector: 'app-check-in',
  templateUrl: './flight-check-in.component.html',
  styleUrls: ['./flight-check-in.component.css']
})
export class FlightCheckInComponent implements OnInit {
  flightId: number;
  flight: Flight;
  passenger: Passenger;
  @ViewChild('services') services: string[];
  constructor(
              private flightService: FlightService,
              private matDialogRef: MatDialogRef<FlightCheckInComponent>,
              @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute, passenger: Passenger},
              private store: Store<fromApp.AppState>
    ) {
      data.route.params.subscribe(params => {
        this.flightId = params.id;
      });
      this.passenger = data.passenger;

    }

  ngOnInit(): void {
    this.flight = this.flightService.getFlight(this.flightId);
    const editpassenger = this.flight.passengers.find((passenger, index) => {
      return this.passenger === passenger;
    });
  }

  onClear() {
    this.matDialogRef.close();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.passenger);
    if (form.value.shop){
      const mealPreference: string = (this.passenger.mealPreference) ? this.passenger.mealPreference : '';
      this.flightService.getpaxRequiringSpecialMealsMap().set(this.passenger.seatNumber, mealPreference);
    }
    this.store.dispatch(
      new flightActions.UpdatePassenger({fid: this.flightId - 1,
         pid: this.passenger.passportNumber,
         passenger: this.passenger}));
    this.matDialogRef.close();
  }
}
