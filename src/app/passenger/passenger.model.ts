export class Passenger {
    name: string;
    passportNumber: string;
    checkinStatus: string;
    passengerType: string;
    seatNumber: string;
    address: Address;
    DOB: string;
    ancillaryServicesList: string[];
    mealPreference: string;
    inFlightShopReqList: string[];
}
export class Address {
    city: string;
    state: string;
    postalCode: string;

    constructor(city: string, state: string, postalCode: string){
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }
}
