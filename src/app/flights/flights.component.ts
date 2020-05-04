import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Flight } from './flight.model';
import { MatTableDataSource} from '@angular/material/table';
import { FlightService } from './flight.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as fromApp from '../app.reducer';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as FlightActions from '../flights/store/flight.actions';
import { SeatmapService } from './seatmap/seatmap.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, AfterViewInit, OnDestroy {
  isAdminLogged: boolean;
  isLoading: boolean;
  noResults: boolean;
  submitted: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  flightSearchForm: FormGroup;
  flights: Flight[];
  listFlight: MatTableDataSource<Flight>;
  displayFlightColumns = [
    'Airline',
    'From',
    'To',
    'Departure time',
    'Arrival time',
  ];

  displayFlightColumnsForUser = [
    'FlightNo',
    'Airline',
    'From',
    'To',
    'Departure time',
    'Arrival time',
    'action'
  ];
  constructor(private flightService: FlightService,
              private seatService: SeatmapService,
              private store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
    }

  ngOnInit(): void {
    this.initSearch();
    this.store.select('auth').subscribe(authState => {
     this.isAdminLogged = authState.isAdmin;
   });
    this.fetchFlights();

  }


  fetchFlights(){
    this.store.select('flights').subscribe(flightState => {
      this.listFlight = new MatTableDataSource<Flight>(flightState.flights);
     });
  }

  initSearch(){
    this.flightSearchForm = this.formBuilder.group({
      departureStation: [''],
      arrivalStation: [''],
      departureDate: ['']
    });
  }

  get f() {
    return this.flightSearchForm.controls;
  }

  onSearch() {
    console.log(this.submitted);
    this.submitted = true;
    console.log(this.submitted);
    console.log(this.flightSearchForm.get('departureDate').value);
    let flightsList: Flight[];
    this.isLoading = true;
    this.noResults = false;
    this.flightService.fetchFlights().then(flights => {
     flightsList = this.filterFlights(flights);
     this.noResults = true;
     this.isLoading = false;
     this.listFlight = new MatTableDataSource(flightsList);
     this.flightSearchForm.reset();
    });
  }

  filterFlights(flights: Flight[]): Flight[] {
   const searchResults: Flight[] = [];
   const departureStation: string = this.flightSearchForm.get('departureStation').value;
   const arrivalStation: string = this.flightSearchForm.get('arrivalStation').value;
   const departureDate: Date
    = this.flightSearchForm.get('departureDate').value;
   const formatdate = this.datePipe.transform(departureDate, 'yyyy-MM-dd');
   console.log(departureDate);
   if (flights.length > 0){
     flights.forEach(flight => {
       if (flight.departureStation.toUpperCase() === departureStation.toUpperCase()
       && flight.arrivalStation.toUpperCase() === arrivalStation.toUpperCase()
       && flight.departureDate.toString().split('T')[0] === formatdate
       ){
         console.log(flight.departureDate.toString().split('T')[0] === formatdate);
         searchResults.push(flight);
       }
     });
   }
   console.log(searchResults);
   return searchResults;
  }
  displayFlightDetails(id){
    this.router.navigate([id + 1], {relativeTo: this.route});
  }

  showOptions(event){
    return event;
  }

  displayUserFlightDetails(flightid){
    console.log(flightid);
    this.router.navigate([flightid], {relativeTo: this.route});
  }

  ngAfterViewInit() {
    this.listFlight.paginator = this.paginator;
    this.listFlight.sort = this.sort;
}

ngOnDestroy(){
  this.flightService.removeCheckedInPassengerMap();
  this.flightService.getpaxRequiringSpecialMealsMap().clear();
  this.flightService.clearSeatAllowment();
  this.seatService.clearSeatAlloment();
}
}
