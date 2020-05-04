import {Action} from '@ngrx/store';
import { Flight } from '../flight.model';
import { Passenger } from 'src/app/passenger/passenger.model';

export const FETCH_FLIGHTS = 'FETCH_FLIGHTS';
export const SET_FLIGHTS = 'SET_FLIGHTS';
export const ADD_PASSENGER = 'ADD_PASSENGER';
export const UPDATE_PASSENGER = 'UPDATE_PASSENGER';
export const ADD_SERVICE = 'ADD-SERVICE';

export class AddService implements Action {
    readonly type = ADD_SERVICE;
    constructor(public payload: {service: string, index: number}){}
}

export class SetFlights implements Action {
    readonly type = SET_FLIGHTS;
    constructor(public payload: Flight[]){

    }
}
export class FetchFlights implements Action {
readonly type = FETCH_FLIGHTS;
constructor(){

}
}

export class AddPassenger implements Action {
    readonly type = ADD_PASSENGER;
    constructor(public payload: {index: number, passenger: Passenger}){}
 }

export class UpdatePassenger implements Action {
    readonly type = UPDATE_PASSENGER;
    constructor(public payload: {fid: number, pid: string, passenger: Passenger}){}

}
export type FlightActions= SetFlights |
FetchFlights | AddPassenger | UpdatePassenger | AddService;
