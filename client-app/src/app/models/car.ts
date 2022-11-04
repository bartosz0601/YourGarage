import { StringifyOptions } from "querystring";
import { Client } from "./client";
import { Service } from "./service";

export interface Car { 
    id: string;
    brand: string;
    model: string;
    year: number;
    vin: string;
    clientId: string;
    client?: Client;
    services?: Service[];
}

export class CarFormValues {
    id?: string = undefined;
    brand: string = '';
    model: string = '';
    year: number = 2000;
    vin: string = '';
    clientId: string = '';

    constructor(car?: CarFormValues) {
        if (car) {
            this.id = car.id;
            this.brand = car.brand;
            this.model = car.model;
            this.year = car.year;
            this.vin = car.vin;
            this.clientId = car.clientId;
        }
    }
}