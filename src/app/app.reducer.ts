import { ActionReducerMap } from "@ngrx/store";
import * as FlightReducer from "./flight/store/flight.reducer";
import * as SeatReducer from "./seatmap/store/seat.reducer";
export interface appState {
  flights: FlightReducer.State;
  seats: SeatReducer.State;
}
export const appReducer: ActionReducerMap<appState> = {
  flights: FlightReducer.FlightState,
  seats: SeatReducer.SeatState
};
