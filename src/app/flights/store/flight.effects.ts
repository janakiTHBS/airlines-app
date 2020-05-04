import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as FlightActions from '../store/flight.actions';
import { switchMap, map } from 'rxjs/operators';
import * as environment from '../../../environments/environment';
import { Flight } from '../flight.model';
@Injectable()
export class FlightEffects {

    constructor(private actions$: Actions, private http: HttpClient){}
    @Effect()
    fetchFlights = this.actions$.pipe(ofType(FlightActions.FETCH_FLIGHTS),
    switchMap(() => {
        return this.http.get<Flight[]>(environment.environment.apiUrl + 'flightDetailsList').toPromise().then(flights => {
            return new FlightActions.SetFlights(flights);
        });
    }));

}
