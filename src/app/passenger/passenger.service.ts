import { Injectable, Inject } from '@angular/core';
import { Passenger } from './passenger.model';
import { HttpClient } from '@angular/common/http';
import { FlightService } from '../flights/flight.service';
import { Flight } from '../flights/flight.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as flightActions from '../flights/store/flight.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  flight: any;
  editMode: boolean;
  disablePassportField: boolean;
  flights: Observable<Flight[]>;
  constructor(
              private flightService: FlightService,
              private store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder,
    ) {

     }
  passengerForm: FormGroup = this.formBuilder.group({
        firstName: ['', [Validators.required,
        Validators.minLength(3), Validators.pattern('^[a-zA-z ]+$')]],
        dob: [''],
        passportNumber: [''],
        address: this.formBuilder.group({
          city: ['', [Validators.pattern('^[a-zA-z]+$')]],
          state: ['', [Validators.pattern('^[a-zA-z]+$')]],
          postalCode: ['', [Validators.maxLength(6), Validators.pattern('^[0-9]+$')]]
        })
      });

setEditmode(edit: boolean){
  this.editMode = edit;
}

populateForm(passenger: Passenger) {
  this.passengerForm.get('passportNumber').disable();
  console.log(passenger);
  const dateOfBirth = new Date(passenger.DOB);
  console.log(dateOfBirth);
  this.passengerForm.patchValue({
    firstName: passenger.name,
    passportNumber: passenger.passportNumber,
    dob: dateOfBirth,
    address: {
      city: passenger.address.city,
      state: passenger.address.state,
      postalCode: passenger.address.postalCode
    }
   });

}

addPassenger(passenger, fid: number){
  if (passenger) {
    const updatedPassenger: Passenger = {
      name: passenger.firstName,
      passportNumber: passenger.passportNumber,
      DOB: passenger.dob,
      address: passenger.address,
      checkinStatus: 'NC',
      passengerType: 'GN',
      seatNumber: '-',
      ancillaryServicesList: [],
      mealPreference: '',
      inFlightShopReqList: []
    };

    this.store.dispatch(
      new flightActions.AddPassenger({
        index: fid - 1,
        passenger: updatedPassenger
      })
    );


}
}

updatePassenger(fid: number, passenger){
  const updateFlight = this.flightService.getFlight(fid);
  const updatePassenger = updateFlight.passengers.find((pass, index) => {
    console.log(pass.passportNumber === passenger.passportNumber);
    return pass.passportNumber === passenger.passportNumber;
  });
  if (fid && passenger){
  const updatedPassenger: Passenger = {
    name: passenger.firstName,
    passportNumber: passenger.passportNumber,
    DOB: passenger.dob,
    address: passenger.address,
    checkinStatus: updatePassenger.checkinStatus,
    passengerType: updatePassenger.passengerType,
    seatNumber: updatePassenger.seatNumber,
    ancillaryServicesList: updatePassenger.ancillaryServicesList,
    mealPreference: updatePassenger.mealPreference,
    inFlightShopReqList: updatePassenger.inFlightShopReqList
  };
  this.store.dispatch(new flightActions.UpdatePassenger(
    {
      fid: fid - 1,
      pid: passenger.passportNumber,
      passenger: updatedPassenger
    }));
  this.passengerForm.get('passportNumber').enable();
}

}


}
