export class Passenger {
    name: string;
    passportNumber: string;
    checkinStatus: string;
    passengerType: string;
    seatNumber: string;
    address: Address;
    DOB: string;
    ancillaryServicesList:string[];
    mealPreference: string[];
    inFlightShopReqList: string[];

    constructor(name:string,passportNumber:string,
        checkinStatus:string,
        passengerType:string,seatNumber:string,address:Address,DOB:string,
        ancillaryServiceList?:string[],
        mealPreference?:string[],
        inFlightShopReqList?:string[]){
        this.name=name;
        this.passportNumber=passportNumber;
        this.passengerType=passengerType;
        this.seatNumber=seatNumber;
        this.address=address;
        this.DOB=DOB;
        this.ancillaryServicesList=ancillaryServiceList;
        this.mealPreference=mealPreference;
        this.inFlightShopReqList=inFlightShopReqList;    

    }
}
export class Address {
    city: string;
    state: string;
    postalCode: string;

    constructor(city:string,state:string,postalCode:string){
        this.city=city;
        this.state=state;
        this.postalCode=postalCode;
    }
}