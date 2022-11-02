import { Car } from "./car";

export interface Client { 
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    details: string;  
    cars: Car[];
}