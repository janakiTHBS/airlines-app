import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Passenger } from './passenger.model';
import { Flight } from '../flight/flight.model';
import { Seat } from '../seatmap/seat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../flight/flight.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../app.reducer";
import { PassengerService } from './passenger.service';
import { SeatmapService } from '../seatmap/seatmap.service';
import * as SeatActions from '../seatmap/store/seat.actions';
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  seatno: string;
  flightId: number;
  passengerId: string;
  editmode: boolean = false;
  passenger: Passenger;
  updateFlight: Flight;
  updatedFlight: Flight;
  services: string[] = [];
  seats: Seat[];
  constructor(
    private store: Store<fromApp.appState>,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    //private dialogRef: MatDialogRef<PassengerComponent>,
    public passengerService: PassengerService,
    //private notificationService: NotificationService,
    //private dialog: MatDialog,
    private seatService: SeatmapService
  ) {}

  //passengerForm: FormGroup;
  ngOnInit(): void {
    console.log("passenger nginit called...");
    //this.seatno = this.seatService.getSelectedSeat();
    //console.log(this.seatno);
    //this.route.params.subscribe(params => {
    // this.flightId = params["id"];
    //console.log(this.flightId);
    //});
    this.updatedFlight = this.flightService.getUpdatedFlight();
    this.passengerService.flight = this.updatedFlight;
    console.log(this.updatedFlight);
    this.route.queryParams.subscribe(queryParams => {
      this.passengerId = queryParams["pid"];
      this.editmode = queryParams["pid"] != null;
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.position = { right: "0px" };
    dialogConfig.panelClass = "custom-dialog-container";
    // this.dialog.open(SeatMapComponent, dialogConfig);
    this.router.navigate(["seats"], { relativeTo: this.route });

    //console.log(this.passengerId);

    this.store
      .select("seats")
      .pipe(
        map(seatState => {
          return seatState.seats;
        })
      )
      .subscribe(seats => {
        this.seats = seats;
      });
    //this.fecthFlights();

    // this.formInit();

    this.updatedFlight.passengers.forEach(passenger => {
      console.log(passenger.service.trim().toLowerCase() === "infants");
      console.log(passenger.service.trim().toLowerCase() === "wheelchair");
      if (passenger.service.trim().toLowerCase() === "infants") {
        console.log(passenger.seatNumber);
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "orange",
            index: this.seats.indexOf(passenger.seatNumber)
          })
        );
      } else if (passenger.service.trim().toLowerCase() === "wheelchair") {
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "yellow",
            index: this.seats.indexOf(passenger.seatNumber) + 1
          })
        );
      } else {
        this.store.dispatch(
          new SeatActions.SelectSeat({
            seat: passenger.seatNumber.seatno,
            color: "red",
            index: this.seats.indexOf(passenger.seatNumber)
          })
        );
      }
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    console.log(this.passengerService.passengerForm.value);
    if (!this.passengerService.passengerForm.get("$key").value) {
      this.passengerService.insertPassenger(
        this.passengerService.passengerForm.value
      );
    } else {
      this.passengerService.updatePassenger(
        this.updatedFlight.id,
        this.passengerService.passengerForm.get("id").value,
        this.passengerService.passengerForm.value
      );
    }

    this.passengerService.passengerForm.reset();
    this.passengerService.initializeFormGroup();
    //this.notificationService.success("::Submitted successfully");
    //this.dialogRef.close();

    this.router.navigate(["flights", this.updatedFlight.id]);
  }

  onClear() {
    this.passengerService.passengerForm.reset();
  }

  OnRouteToSeatMap() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.position = { right: "0px" };
    dialogConfig.panelClass = "custom-dialog-container";
    // this.dialog.open(SeatMapComponent, dialogConfig);
    this.router.navigate(["seats"], { relativeTo: this.route });
  }

  seatSelected(value) {
    console.log(value);
  }

}
