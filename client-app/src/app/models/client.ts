import { Car } from "./car";

export interface Client { 
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    details: string;  
    cars?: Car[];
}

export class ClientFormValues { 
    id?: string = undefined;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    details: string = '';

    constructor(client?: Client) {
        if(client){
            this.id = client.id;
            this.firstName = client.firstName;
            this.lastName = client.lastName;
            this.email = client.email;
            this.phone = client.phone;
            this.details = client.details;
        }
    }
}