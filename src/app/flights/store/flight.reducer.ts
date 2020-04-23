import { Flight } from "../flight.model";
import * as FlightActions from "../store/flight.actions";
import { Passenger } from 'src/app/passenger/passenger.model';
export interface State {
  flights: Flight[];
}

const initialState: State = {
  flights:null, 
};
export function FlightState(
  state = initialState,
  action: FlightActions.FlightActions
) {
  switch (action.type) {
     case FlightActions.SET_FLIGHTS:
       console.log(action.payload)
       return {
         ...state,
         flights:[...action.payload]
       };
     case FlightActions.ADD_PASSENGER:
       const flight=state.flights[action.payload.index];
       const updatedFlight={
         ...flight,
         passengers:[...flight.passengers,action.payload.passenger]
       }
       const updatedFlights=[...state.flights];
       updatedFlights[0]=updatedFlight;
       return {
        ...state,
        flights:updatedFlights
       };
       
      case FlightActions.UPDATE_PASSENGER:
      let passengers: Passenger[] = [];
      const updateFlight = state.flights[action.payload.fid];
      state.flights[action.payload.fid].passengers.forEach(passenger => {
        if (passenger.passportNumber == action.payload.pid) {
          passengers.push(action.payload.passenger);
        } else {
          passengers.push(passenger);
        }
      });
      console.log(passengers);

      const updatedPsgInFlight = {
        ...updateFlight,
        passengers: [...passengers]
      };

      console.log(updatedPsgInFlight);
      const finalUpdatedFlights = [...state.flights];
      finalUpdatedFlights[action.payload.fid] = updatedPsgInFlight;
      console.log(finalUpdatedFlights);
      return {
        ...state,
        flights: finalUpdatedFlights
      };
    default:
      return state;
  }
}
