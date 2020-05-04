import { ActionReducerMap } from '@ngrx/store';
import * as Auth from './auth/store/user.reducer';
import * as Flight from './flights/store/flight.reducer';
export interface AppState {
 auth: Auth.AuthState;
 flights: Flight.State;
}
export const AppReducer: ActionReducerMap<AppState> = {
  auth: Auth.AuthReducer,
  flights: Flight.FlightState
};
