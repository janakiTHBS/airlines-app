import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightService } from '../flight.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../flight.model';
import { Passenger } from 'src/app/passenger/passenger.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PassengerComponent } from 'src/app/passenger/passenger.component';
import { Location } from '@angular/common';
import { PassengerService } from 'src/app/passenger/passenger.service';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { SeatmapService } from '../seatmap/seatmap.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as FlightActions from '../store/flight.actions';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnDestroy {
  addService = false;
  isAdminLogged: boolean;
  flightId: string;
  flight: Flight;
  listPassenger: MatTableDataSource<Passenger>;
  serviceForm: FormGroup = this.formBuilder.group({
    service: this.formBuilder.control([''])
  });
  displayPassengerColumns: string[] = [
    'name',
    'passportNumber',
    'checkinStatus',
    'passengerType',
    'seatNumber',
    'action'
  ];
  constructor(private route: ActivatedRoute,
              private matDialog: MatDialog,
              private flightService: FlightService,
              private router: Router,
              private passengerService: PassengerService,
              private store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      console.log(authState.isAdmin);
      this.isAdminLogged = authState.isAdmin;
    });
    this.route.params.subscribe(params => {
      this.flightId = params.id;
    });
    this.flight = this.flightService.getFlight(+this.flightId);
    console.log(this.flight.passengers);
    this.listPassenger = new MatTableDataSource(this.flight.passengers);

  }

  onEditPassenger(editpassenger: Passenger) {
   const updatepassenger = this.flight.passengers.find((passenger, index) => {
    return editpassenger === passenger;
   });
   console.log(updatepassenger);
   this.passengerService.populateForm(updatepassenger);
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = false;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '60%';
   dialogConfig.data = {route: this.route, add: true};
   const dialogRef = this.matDialog.open(PassengerComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(() => {
      // this.router.navigate(["flights"]);
        this.flight = this.flightService.getFlight(+this.flightId);
        console.log(this.flight);
        this.listPassenger = new MatTableDataSource(this.flight.passengers);
     });
  }


  onAddPassenger() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {route: this.route, add: false};
    const dialogRef = this.matDialog.open(PassengerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
     // this.router.navigate(["flights"]);
       this.flight = this.flightService.getFlight(+this.flightId);
       this.listPassenger = new MatTableDataSource(this.flight.passengers);
    });
  }

  onCheckIn(){
    this.router.navigate(['checkIn'], {relativeTo: this.route});
  }

  onInFlight(){
    this.router.navigate(['inflight'], {relativeTo: this.route});
  }

  onSubmit(){
    const service = this.serviceForm.get('service').value;
    console.log(this.flightId);
    this.store.dispatch(new FlightActions.AddService({service, index: +this.flightId - 1}));
    this.addService = false;
    this.flight = this.flightService.getFlight(+this.flightId);
     }

  doFilter(value: string){
     this.listPassenger.filter = value.trim().toLocaleLowerCase();
  }

  ngOnDestroy(){

  }
}
