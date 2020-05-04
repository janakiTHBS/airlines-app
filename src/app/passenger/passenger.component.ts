import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassengerService } from './passenger.service';
import { Passenger } from './passenger.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as flightActions from '../flights/store/flight.actions';
import { Flight } from '../flights/flight.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  flightId: number;
  editFlight: Flight;
  editMode: boolean;
  constructor(
              private matDialogRef: MatDialogRef<PassengerComponent>,
              public passengerService: PassengerService,
              @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute, add: boolean},
              ) {
      data.route.params.subscribe(params => {
        this.flightId = params.id;
      });
      this.editMode = data.add;
     }

  ngOnInit(): void {
    this.passengerService.setEditmode(this.editMode);
  }

  onSave() {
    const passenger = this.passengerService.passengerForm.getRawValue();
    if (!this.editMode){
      this.passengerService.addPassenger(passenger, this.flightId);
    }
    else {
      this.passengerService.updatePassenger(this.flightId, passenger);
    }
    this.passengerService.passengerForm.reset();
    this.matDialogRef.close();
  }
  onCancel() {
    this.passengerService.passengerForm.reset();
    this.matDialogRef.close();
  }


}
