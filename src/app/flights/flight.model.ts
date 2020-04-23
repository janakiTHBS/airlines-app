import { Passenger } from '../passenger/passenger.model';


export interface Flight {
    id:number,
    flightNo:string,
    airline:string,
    departureStation:string,
    arrivalStation:string,
    departureDate:Date,
    arrivalDate:Date,
    specialMeals:[],
    flightInShopReq:[],
    axilaryService:[],
    passengers:Passenger[];

}