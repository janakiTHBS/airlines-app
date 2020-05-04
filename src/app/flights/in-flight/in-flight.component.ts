import { Component, OnInit } from '@angular/core';
import { SeatmapService } from '../seatmap/seatmap.service';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {Passenger} from '../../passenger/passenger.model';
import { CheckinStatus } from '../enums/CheckinStatus.enum';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FlightCheckInComponent } from './flight-check-in/flight-check-in.component';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.css']
})
export class InFlightComponent implements OnInit {
  flight: Flight;
  flightId: number;
  passengers: Passenger[];
  listPassenger: MatTableDataSource<Passenger>;
  displayPassengerColumns: string[] = [
    'name',
    'passportNumber',
    'axilaryService',
    'mealPreference',
    'shoppingService',
    'action'
  ];
  constructor(private seatMapService: SeatmapService,
              private flightService: FlightService,
              private route: ActivatedRoute,
              private matDialog: MatDialog) { }

  totalSeats: number[] = this.seatMapService.getTotalSeats();
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightId = +params.id;
      this.flight = this.flightService.getFlight(+params.id);
    });
    this.passengers = this.flight.passengers.filter((passenger) => {
      return passenger.checkinStatus === CheckinStatus.AC.toString();
    });
    this.listPassenger = new MatTableDataSource(this.passengers);
  }

  getColorCodes(seatNumber: string){
    return this.flightService.getpaxRequiringSpecialMealsMap().get(seatNumber.toString());
  }

  onAddServices(editpassenger: Passenger){
    const updatepassenger = this.flight.passengers.find((passenger, index) => {
      return editpassenger === passenger;
     });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    dialogConfig.data = {route: this.route, passenger: editpassenger};
    const dialogRef = this.matDialog.open(FlightCheckInComponent, dialogConfig);
  }
}
