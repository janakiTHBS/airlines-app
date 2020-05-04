import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Flight } from './flight.model';
import { FlightService } from './flight.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightresolverService  implements Resolve<Flight>{

  constructor(private flightService: FlightService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flight> | Promise<Flight> | Flight {
  return this.flightService.getFlight(+route.paramMap.get('id'));
  }
}
