import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight/flight.model';
import { map} from "rxjs/operators";
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css']
})
export class AdminFlightComponent implements OnInit {

  flights: Flight[];
  listFlight: MatTableDataSource<Flight>;
  displayFlightColumns = [
    "Operator",
    "To",
    "From",
    "Departure time",
    "Arrival time"
  ];
  constructor(
    private store: Store<fromApp.appState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select("flights")
      .pipe(
        map(flightState => {
          console.log(flightState);
          return flightState.flights;
        })
      )
      .subscribe(flights => {
        this.flights = flights;
        this.listFlight = new MatTableDataSource(flights);
        console.log(flights);
      });
  }
  
  displayFlightDetails(index: number) {
    console.log(this.flights[index]);
    this.flights[index];
    this.router.navigate(["/flights", index]);
  }
}
