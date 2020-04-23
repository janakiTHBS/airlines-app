import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  isAdminLogged:boolean;
  isLoading:boolean;
  noResults:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  flightSearchForm: FormGroup;
  flights:Flight[];
  listFlight: MatTableDataSource<Flight>;
  displayFlightColumns = [
    "Airline",
    "From",
    "To",
    "Departure time",
    "Arrival time",
  ];

  displayFlightColumnsForUser = [
    "FlightNo",
    "Airline",
    "From",
    "To",
    "Departure time",
    "Arrival time",
    "action"
  ];
  constructor(private flightService:FlightService,
    private store:Store<fromApp.appState>,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute) { 
      
    }

  ngOnInit(): void {
    this.initSearch();
   // this.store.dispatch(new FlightActions.FetchFlights());
   this.store.select('auth').subscribe(authState=>{
     console.log(authState.isAdmin);
     this.isAdminLogged=authState.isAdmin;
   })
   
   this.fetchFlights();
  
   /** this.flightService.fetchFlights().then(flights=>{
      this.flights=flights;
      console.log(this.flights);
      this.listFlight=new MatTableDataSource<Flight>(this.flights);
      this.listFlight.paginator=this.paginator;
      this.listFlight.sort=this.sort;
     
    }).catch(e=>{
      alert("no data found")
    });**/
    
  }


  fetchFlights(){
    this.store.select('flights').subscribe(flightState=>{
      this.listFlight=new MatTableDataSource<Flight>(flightState.flights);
      this.listFlight.paginator=this.paginator;
      this.listFlight.sort=this.sort;
     });
  }
  initSearch(){
    this.flightSearchForm=this.formBuilder.group({
      departureStation: ['',[Validators.required]],
      arrivalStation: ['',[Validators.required]],
      departureDate: ['',[Validators.required]]
    })
  }

  get f() {
    return this.flightSearchForm.controls;
  }

  onSearch() {
   let flightsList:Flight[];
    this.isLoading=true;
    this.noResults=false;
    this.flightService.fetchFlights().then(flights=>{
     flightsList=this.filterFlights(flights);
     this.listFlight=new MatTableDataSource(flightsList);
     this.isLoading=false;
     this.noResults=true;
    })
  }

  filterFlights(flights:Flight[]) :Flight[] {
   const searchResults:Flight[]=[];
   const departureStation: string = this.flightSearchForm.get('departureStation').value;
   const arrivalStation: string = this.flightSearchForm.get('arrivalStation').value;
   const departureDate: string = this.flightSearchForm.get('departureDate').value.toDateString();
   
   if(flights.length>0){
     flights.forEach(flight=>{
       if(flight.departureStation.toUpperCase()===departureStation.toUpperCase()
       && flight.arrivalStation.toUpperCase()===arrivalStation.toUpperCase()
       ){
        searchResults.push(flight);
       }
     })
   }
   console.log(searchResults);
  return searchResults;
  }
  displayFlightDetails(id){
    this.router.navigate([id+1],{relativeTo:this.route})
  }

  showOptions(event){
    return event;
  }

  displayUserFlightDetails(flightid){
    console.log(flightid);
    this.router.navigate([flightid],{relativeTo:this.route})
  }
}
