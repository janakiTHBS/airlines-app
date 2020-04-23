import { ActionReducerMap } from "@ngrx/store";
import * as Auth from './auth/store/user.reducer';
import * as Flight from './flights/store/flight.reducer';
export interface appState {
 auth:Auth.AuthState,
 flights:Flight.State,
}
export const appReducer: ActionReducerMap<appState> = {
  auth:Auth.AuthReducer,
  flights:Flight.FlightState
};
